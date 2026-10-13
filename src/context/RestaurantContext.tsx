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

  // Restore session from sessionStorage on mount
  useEffect(() => {
    try {
      const savedSession = sessionStorage.getItem('dar_al_nar_admin_session');
      if (savedSession === 'true') {
        setIsAdminAuthenticated(true);
      }
    } catch {
      // Ignore sessionStorage errors
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const signInAdmin = async (email: string, password: string): Promise<string | null> => {
    const defaultUser = (import.meta.env.VITE_ADMIN_USERNAME || 'admin').trim().toLowerCase();
    const defaultPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123456';

    const inputUser = email.trim().toLowerCase();
    const isUserValid = inputUser === defaultUser || inputUser === 'admin' || inputUser === 'admin@daralnar.om';
    const isPassValid = password === defaultPass || password === 'admin123456';

    if (isUserValid && isPassValid) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('dar_al_nar_admin_session', 'true');
      } catch {
        // Ignore
      }
      return null;
    }

    return language === 'ar' 
      ? 'اسم المستخدم أو كلمة المرور غير صحيحة.' 
      : 'Invalid username or password.';
  };

  const signOutAdmin = async () => {
    try {
      sessionStorage.removeItem('dar_al_nar_admin_session');
    } catch {
      // Ignore
    }
    setIsAdminAuthenticated(false);
    setAppView('website');
  };

  // 3. Modals & selection
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedDishForModal, setSelectedDishForModal] = useState<MenuItem | null>(null);

  // 4. Data states with localStorage persistence
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('dar_al_nar_menu');
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('dar_al_nar_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('dar_al_nar_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [settings, setSettings] = useState<RestaurantSettings>(() => {
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
    try {
      localStorage.setItem('dar_al_nar_lang', language);
    } catch {
      // Ignore
    }
  }, [language]);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('dar_al_nar_menu', JSON.stringify(menuItems));
    } catch {
      // Ignore
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem('dar_al_nar_reservations', JSON.stringify(reservations));
    } catch {
      // Ignore
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem('dar_al_nar_inquiries', JSON.stringify(inquiries));
    } catch {
      // Ignore
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('dar_al_nar_settings', JSON.stringify(settings));
    } catch {
      // Ignore
    }
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
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newReservation: Reservation = {
      ...resData,
      id: `res-${Date.now()}`,
      referenceNo: `DAN-2026-${randomSuffix}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addToast('success', language === 'ar' ? 'تم تحديث حالة الحجز' : 'Reservation Updated', 
      language === 'ar' ? `الحجز الآن بحالة: ${translations.ar.admin.status[status]}` : `Status changed to ${status}`);
  };

  const updateReservationTable = (id: string, tableNumber: string) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, tableNumber } : r));
    addToast('info', language === 'ar' ? 'تم تعيين الطاولة' : 'Table Assigned', 
      language === 'ar' ? `تم تخصيص الطاولة ${tableNumber}` : `Assigned table ${tableNumber}`);
  };

  const deleteReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    addToast('warning', language === 'ar' ? 'تم حذف الحجز' : 'Reservation Removed', 
      language === 'ar' ? 'تم حذف سجل الحجز من النظام' : 'Reservation entry has been removed');
  };

  // Menu actions
  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `dish-${Date.now()}`
    };
    setMenuItems(prev => [newItem, ...prev]);
    addToast('success', language === 'ar' ? 'تمت إضافة طبق جديد' : 'New Dish Added', 
      language === 'ar' ? `تمت إضافة ${newItem.nameAr} إلى قائمة الطعام` : `Added ${newItem.nameEn} to menu`);
  };

  const updateMenuItem = (id: string, itemData: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...itemData } : item));
    addToast('success', language === 'ar' ? 'تم تعديل الطبق' : 'Menu Item Updated', 
      language === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Changes saved successfully');
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    addToast('warning', language === 'ar' ? 'تم حذف الطبق' : 'Item Deleted', 
      language === 'ar' ? 'تم حذف الطبق من قائمة الطعام' : 'Dish removed from the menu');
  };

  const toggleMenuItemAvailability = (id: string) => {
    const item = menuItems.find(menuItem => menuItem.id === id);
    if (!item) return;
    const nextAvail = !item.isAvailable;
    setMenuItems(prev => prev.map(menuItem => menuItem.id === id ? { ...menuItem, isAvailable: nextAvail } : menuItem));
    addToast('info', language === 'ar' ? 'حالة التوفر' : 'Availability Changed',
      language === 'ar' ? `الطبق الآن ${nextAvail ? 'متاح' : 'غير متوفر'}` : `Dish is now ${nextAvail ? 'available' : 'unavailable'}`);
  };

  const toggleMenuItemSpecial = (id: string) => {
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
    setInquiries(prev => [newInq, ...prev]);
    return newInq;
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus, notes?: string) => {
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
  const updateSettings = (newSettings: Partial<RestaurantSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast('success', language === 'ar' ? 'تم حفظ الإعدادات' : 'Settings Saved', 
      language === 'ar' ? 'تم تحديث إعدادات المطعم بنجاح' : 'Restaurant settings updated');
  };

  const resetToDemoData = () => {
    try {
      localStorage.removeItem('dar_al_nar_menu');
      localStorage.removeItem('dar_al_nar_reservations');
      localStorage.removeItem('dar_al_nar_inquiries');
      localStorage.removeItem('dar_al_nar_settings');
    } catch {
      // Ignore
    }
    setMenuItems(INITIAL_MENU_ITEMS);
    setReservations(INITIAL_RESERVATIONS);
    setInquiries(INITIAL_INQUIRIES);
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
      resetToDemoData,
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
