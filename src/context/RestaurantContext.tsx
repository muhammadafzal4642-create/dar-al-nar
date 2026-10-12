import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  AppView, 
  AdminTab, 
  MenuItem, 
  Reservation, 
  CustomerInquiry, 
  RestaurantSettings, 
  ToastMessage,
  ReservationStatus,
  InquiryStatus
} from '../types';
import { 
  INITIAL_MENU_ITEMS, 
  INITIAL_RESERVATIONS, 
  INITIAL_INQUIRIES, 
  INITIAL_SETTINGS 
} from '../data/initialData';
import { translations } from '../translations';
import { localAdminAvailable, supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface RestaurantContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.en;
  appView: AppView;
  setAppView: (view: AppView) => void;
  isAdminAuthenticated: boolean;
  isAuthLoading: boolean;
  signInAdmin: (email: string, password: string) => Promise<string | null>;
  signOutAdmin: () => Promise<void>;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  menuItems: MenuItem[];
  reservations: Reservation[];
  inquiries: CustomerInquiry[];
  settings: RestaurantSettings;
  isReservationModalOpen: boolean;
  openReservationModal: (dish?: MenuItem) => void;
  closeReservationModal: () => void;
  selectedDishForModal: MenuItem | null;
  setSelectedDishForModal: (dish: MenuItem | null) => void;
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
  addReservation: (resData: Omit<Reservation, 'id' | 'referenceNo' | 'createdAt' | 'status'>) => Promise<Reservation>;
  updateReservationStatus: (id: string, status: ReservationStatus) => void;
  updateReservationTable: (id: string, tableNumber: string) => void;
  deleteReservation: (id: string) => void;
  addMenuItem: (itemData: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, itemData: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleMenuItemAvailability: (id: string) => void;
  toggleMenuItemSpecial: (id: string) => void;
  addInquiry: (inquiryData: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => Promise<CustomerInquiry>;
  updateInquiryStatus: (id: string, status: InquiryStatus, notes?: string) => void;
  updateSettings: (newSettings: Partial<RestaurantSettings>) => void;
  resetToDemoData: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('dar_al_nar_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  // 2. View state
  const [appView, setAppView] = useState<AppView>('website');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      if (localAdminAvailable) {
        fetch('/api/admin/session', { credentials: 'same-origin' })
          .then(response => response.json())
          .then(data => setIsAdminAuthenticated(data.authenticated === true))
          .catch(() => setIsAdminAuthenticated(false))
          .finally(() => setIsAuthLoading(false));
        return;
      }
      setIsAuthLoading(false);
      return;
    }

    let isMounted = true;
    const applySession = (session: Session | null) => {
      if (isMounted) setIsAdminAuthenticated(session?.user.app_metadata?.role === 'admin');
    };

    supabase.auth.getSession().then(({ data }) => applySession(data.session)).finally(() => {
      if (isMounted) setIsAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInAdmin = async (email: string, password: string): Promise<string | null> => {
    if (!supabase) {
      if (!localAdminAvailable) return 'Admin authentication is not configured.';
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      const result = await response.json();
      if (!response.ok) return result.error || 'Sign in failed.';
      setIsAdminAuthenticated(true);
      return null;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    if (data.user.app_metadata?.role !== 'admin') {
      await supabase.auth.signOut();
      return 'This account is not authorized to access the admin dashboard.';
    }
    setIsAdminAuthenticated(true);
    return null;
  };

  const signOutAdmin = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    } else if (localAdminAvailable) {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' });
    }
    setIsAdminAuthenticated(false);
    setAppView('website');
  };

  // 3. Modals & selection
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedDishForModal, setSelectedDishForModal] = useState<MenuItem | null>(null);

  // 4. Data states with localStorage persistence
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    if (supabase) return INITIAL_MENU_ITEMS;
    try {
      const saved = localStorage.getItem('dar_al_nar_menu');
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    if (supabase) return [];
    try {
      const saved = localStorage.getItem('dar_al_nar_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    if (supabase) return [];
    try {
      const saved = localStorage.getItem('dar_al_nar_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [settings, setSettings] = useState<RestaurantSettings>(() => {
    if (supabase) return INITIAL_SETTINGS;
    try {
      const saved = localStorage.getItem('dar_al_nar_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Update HTML tag dir and lang whenever language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('dar_al_nar_lang', language);
  }, [language]);

  // Sync state to local storage
  useEffect(() => {
    if (supabase) return;
    localStorage.setItem('dar_al_nar_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    if (supabase) return;
    localStorage.setItem('dar_al_nar_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    if (supabase) return;
    localStorage.setItem('dar_al_nar_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    if (supabase) return;
    localStorage.setItem('dar_al_nar_settings', JSON.stringify(settings));
  }, [settings]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'ar' : 'en');
  };

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const saveRecord = async <T extends { id: string }>(kind: string, data: T) => {
    if (!supabase) return true;
    const { error } = await supabase.from('restaurant_records').upsert({ id: data.id, kind, data });
    if (error) {
      addToast('error', language === 'ar' ? 'تعذر الحفظ' : 'Save failed', error.message);
      return false;
    }
    return true;
  };

  const deleteRecord = async (id: string) => {
    if (!supabase) return true;
    const { error } = await supabase.from('restaurant_records').delete().eq('id', id);
    if (error) {
      addToast('error', language === 'ar' ? 'تعذر الحذف' : 'Delete failed', error.message);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const client = supabase;
    if (!client || isAuthLoading) return;

    let isMounted = true;
    const loadRecords = async () => {
      const { data, error } = await client
        .from('restaurant_records')
        .select('id, kind, data');

      if (error) {
        addToast('error', 'Database connection failed', error.message);
        return;
      }

      let records = data || [];
      const isInitialized = records.some(record => record.id === 'system-initialized');
      if (isAdminAuthenticated && !isInitialized) {
        const initialRecords = [
          ...INITIAL_MENU_ITEMS.map(item => ({ id: item.id, kind: 'menu', data: item })),
          { id: 'restaurant-settings', kind: 'settings', data: INITIAL_SETTINGS },
          { id: 'system-initialized', kind: 'system', data: { initialized: true } }
        ];
        const { error: seedError } = await client.from('restaurant_records').upsert(initialRecords);
        if (seedError) {
          addToast('error', 'Database initialization failed', seedError.message);
          return;
        }
        records = [...records, ...initialRecords];
      }

      if (!isMounted) return;
      const menuRecords = records.filter(record => record.kind === 'menu').map(record => record.data as unknown as MenuItem);
      const reservationRecords = records.filter(record => record.kind === 'reservation').map(record => record.data as unknown as Reservation);
      const inquiryRecords = records.filter(record => record.kind === 'inquiry').map(record => record.data as unknown as CustomerInquiry);
      const settingsRecord = records.find(record => record.id === 'restaurant-settings');
      setMenuItems(menuRecords.length ? menuRecords : INITIAL_MENU_ITEMS);
      setReservations(reservationRecords);
      setInquiries(inquiryRecords);
      setSettings(settingsRecord ? settingsRecord.data as unknown as RestaurantSettings : INITIAL_SETTINGS);
    };

    void loadRecords();
    return () => {
      isMounted = false;
    };
  }, [isAdminAuthenticated, isAuthLoading]);

  const openReservationModal = (dish?: MenuItem) => {
    if (dish) {
      setSelectedDishForModal(dish);
    }
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
  };

  // Reservation actions
  const addReservation = async (resData: Omit<Reservation, 'id' | 'referenceNo' | 'createdAt' | 'status'>): Promise<Reservation> => {
    // Generate authentic Omani reference number: DAN-YYYY-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newReservation: Reservation = {
      ...resData,
      id: `res-${Date.now()}`,
      referenceNo: `DAN-2026-${randomSuffix}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    if (!(await saveRecord('reservation', newReservation))) {
      throw new Error('Reservation could not be saved. Please try again.');
    }
    setReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = async (id: string, status: ReservationStatus) => {
    const reservation = reservations.find(item => item.id === id);
    if (!reservation) return;
    const updatedReservation = { ...reservation, status };
    if (!(await saveRecord('reservation', updatedReservation))) return;
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addToast('success', language === 'ar' ? 'تم تحديث حالة الحجز' : 'Reservation Updated', 
      language === 'ar' ? `الحجز الآن بحالة: ${translations.ar.admin.status[status]}` : `Status changed to ${status}`);
  };

  const updateReservationTable = async (id: string, tableNumber: string) => {
    const reservation = reservations.find(item => item.id === id);
    if (!reservation || !(await saveRecord('reservation', { ...reservation, tableNumber }))) return;
    setReservations(prev => prev.map(r => r.id === id ? { ...r, tableNumber } : r));
    addToast('info', language === 'ar' ? 'تم تعيين الطاولة' : 'Table Assigned', 
      language === 'ar' ? `تم تخصيص الطاولة ${tableNumber}` : `Assigned table ${tableNumber}`);
  };

  const deleteReservation = async (id: string) => {
    if (!(await deleteRecord(id))) return;
    setReservations(prev => prev.filter(r => r.id !== id));
    addToast('warning', language === 'ar' ? 'تم حذف الحجز' : 'Reservation Removed', 
      language === 'ar' ? 'تم حذف سجل الحجز من النظام' : 'Reservation entry has been removed');
  };

  // Menu actions
  const addMenuItem = async (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `dish-${Date.now()}`
    };
    if (!(await saveRecord('menu', newItem))) return;
    setMenuItems(prev => [newItem, ...prev]);
    addToast('success', language === 'ar' ? 'تمت إضافة طبق جديد' : 'New Dish Added', 
      language === 'ar' ? `تمت إضافة ${newItem.nameAr} إلى قائمة الطعام` : `Added ${newItem.nameEn} to menu`);
  };

  const updateMenuItem = async (id: string, itemData: Partial<MenuItem>) => {
    const existingItem = menuItems.find(item => item.id === id);
    if (!existingItem) return;
    const updatedItem = { ...existingItem, ...itemData };
    if (!(await saveRecord('menu', updatedItem))) return;
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...itemData } : item));
    addToast('success', language === 'ar' ? 'تم تعديل الطبق' : 'Menu Item Updated', 
      language === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Changes saved successfully');
  };

  const deleteMenuItem = async (id: string) => {
    if (!(await deleteRecord(id))) return;
    setMenuItems(prev => prev.filter(item => item.id !== id));
    addToast('warning', language === 'ar' ? 'تم حذف الطبق' : 'Item Deleted', 
      language === 'ar' ? 'تم حذف الطبق من قائمة الطعام' : 'Dish removed from the menu');
  };

  const toggleMenuItemAvailability = async (id: string) => {
    const item = menuItems.find(menuItem => menuItem.id === id);
    if (!item) return;
    const nextAvail = !item.isAvailable;
    if (!(await saveRecord('menu', { ...item, isAvailable: nextAvail }))) return;
    setMenuItems(prev => prev.map(menuItem => menuItem.id === id ? { ...menuItem, isAvailable: nextAvail } : menuItem));
    addToast('info', language === 'ar' ? 'حالة التوفر' : 'Availability Changed',
      language === 'ar' ? `الطبق الآن ${nextAvail ? 'متاح' : 'غير متوفر'}` : `Dish is now ${nextAvail ? 'available' : 'unavailable'}`);
  };

  const toggleMenuItemSpecial = async (id: string) => {
    const item = menuItems.find(menuItem => menuItem.id === id);
    if (!item || !(await saveRecord('menu', { ...item, isChefsSpecial: !item.isChefsSpecial }))) return;
    setMenuItems(prev => prev.map(menuItem => menuItem.id === id ? { ...menuItem, isChefsSpecial: !menuItem.isChefsSpecial } : menuItem));
  };

  // Inquiry actions
  const addInquiry = async (inquiryData: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>): Promise<CustomerInquiry> => {
    const newInq: CustomerInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    if (!(await saveRecord('inquiry', newInq))) {
      throw new Error('Inquiry could not be submitted. Please try again.');
    }
    setInquiries(prev => [newInq, ...prev]);
    return newInq;
  };

  const updateInquiryStatus = async (id: string, status: InquiryStatus, notes?: string) => {
    const inquiry = inquiries.find(item => item.id === id);
    if (!inquiry) return;
    const updatedInquiry = { ...inquiry, status, notes: notes !== undefined ? notes : inquiry.notes };
    if (!(await saveRecord('inquiry', updatedInquiry))) return;
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return {
          ...inq,
          status,
          notes: notes !== undefined ? notes : inq.notes
        };
      }
      return inq;
    }));
    addToast('success', language === 'ar' ? 'تم تحديث طلب الفعالية' : 'Inquiry Updated', 
      language === 'ar' ? 'تم تعديل حالة الاستفسار' : `Inquiry marked as ${status}`);
  };

  // Settings
  const updateSettings = async (newSettings: Partial<RestaurantSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    if (!(await saveRecord('settings', { id: 'restaurant-settings', ...updatedSettings }))) return;
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast('success', language === 'ar' ? 'تم حفظ الإعدادات' : 'Settings Saved', 
      language === 'ar' ? 'تم تحديث إعدادات المطعم بنجاح' : 'Restaurant settings updated');
  };

  const resetToDemoData = async () => {
    if (supabase) {
      const { error } = await supabase.from('restaurant_records').delete().neq('kind', 'system');
      if (error) {
        addToast('error', 'Reset failed', error.message);
        return;
      }
      const seedRecords = [
        ...INITIAL_MENU_ITEMS.map(item => ({ id: item.id, kind: 'menu', data: item })),
        { id: 'restaurant-settings', kind: 'settings', data: INITIAL_SETTINGS }
      ];
      const { error: seedError } = await supabase.from('restaurant_records').upsert(seedRecords);
      if (seedError) {
        addToast('error', 'Reset failed', seedError.message);
        return;
      }
    }
    setMenuItems(INITIAL_MENU_ITEMS);
    setReservations(supabase ? [] : INITIAL_RESERVATIONS);
    setInquiries(supabase ? [] : INITIAL_INQUIRIES);
    setSettings(INITIAL_SETTINGS);
    addToast('info', 'Demo Data Reset', 'Reset to initial Omani culinary demo dataset');
  };

  const t = translations[language];

  return (
    <RestaurantContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      t,
      appView,
      setAppView,
      isAdminAuthenticated,
      isAuthLoading,
      signInAdmin,
      signOutAdmin,
      adminTab,
      setAdminTab,
      menuItems,
      reservations,
      inquiries,
      settings,
      isReservationModalOpen,
      openReservationModal,
      closeReservationModal,
      selectedDishForModal,
      setSelectedDishForModal,
      toasts,
      addToast,
      removeToast,
      addReservation,
      updateReservationStatus,
      updateReservationTable,
      deleteReservation,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      toggleMenuItemAvailability,
      toggleMenuItemSpecial,
      addInquiry,
      updateInquiryStatus,
      updateSettings,
      resetToDemoData
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
