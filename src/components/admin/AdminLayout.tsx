import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { AdminTab, MenuItem, Reservation } from '../../types';
import { AdminOverview } from './AdminOverview';
import { AdminReservations } from './AdminReservations';
import { AdminCalendar } from './AdminCalendar';
import { AdminMenu } from './AdminMenu';
import { AdminInquiries } from './AdminInquiries';
import { AdminSettings } from './AdminSettings';
import { ReservationDrawer } from './ReservationDrawer';
import { DishModal } from './DishModal';
import { ManualBookingModal } from './ManualBookingModal';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Calendar, 
  UtensilsCrossed, 
  MessageSquare, 
  Settings, 
  Globe, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  UserCheck,
  LogOut
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { 
    adminTab, 
    setAdminTab, 
    setAppView, 
    language, 
    toggleLanguage, 
    t, 
    reservations, 
    inquiries,
    signOutAdmin
  } = useRestaurant();

  // Active modal and drawer states
  const [inspectedReservation, setInspectedReservation] = useState<Reservation | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [dishToEdit, setDishToEdit] = useState<MenuItem | null>(null);
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);

  // Muscat live time
  const [muscatTime, setMuscatTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Oman is GST UTC+4
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Muscat',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setMuscatTime(now.toLocaleTimeString(language === 'ar' ? 'ar-OM' : 'en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const pendingCount = reservations.filter(r => r.status === 'pending').length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'overview', label: t.admin.overview, icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: 'reservations', label: t.admin.reservations, icon: <CalendarDays className="w-4 h-4" />, badge: pendingCount },
    { key: 'calendar', label: t.admin.calendarTab, icon: <Calendar className="w-4 h-4" /> },
    { key: 'menu', label: t.admin.menu, icon: <UtensilsCrossed className="w-4 h-4" /> },
    { key: 'inquiries', label: t.admin.inquiries, icon: <MessageSquare className="w-4 h-4" />, badge: newInquiriesCount },
    { key: 'settings', label: t.admin.settingsTab, icon: <Settings className="w-4 h-4" /> }
  ];

  const handleOpenDishModal = (dish?: MenuItem) => {
    setDishToEdit(dish || null);
    setIsDishModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#e8dfc8] flex flex-col font-body">
      
      {/* Top Header / Management Bar */}
      <header className="sticky top-0 z-40 bg-[#121217]/95 backdrop-blur-md border-b border-[#c5a059]/20 px-4 sm:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#8a252c] flex items-center justify-center text-black font-bold text-base shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-white text-base tracking-wider">
                  DAR AL NAR
                </span>
                <span className="text-[#c5a059] text-xs font-semibold">| دار النار</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/30">
                  {language === 'ar' ? 'إدارة المطعم' : 'Restaurant Operations'}
                </span>
              </div>
              <p className="text-[11px] text-[#8e8574] leading-none mt-0.5">
                {t.admin.title}
              </p>
            </div>
          </div>

          {/* Center Info: Muscat Time & Host Profile */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-[#a29a8a]">
            {/* Muscat Time */}
            <div className="flex items-center gap-1.5 font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="text-white">{muscatTime}</span>
              <span className="text-[10px] text-[#7a7263]">GST (Muscat)</span>
            </div>

            {/* Active Host badge */}
            <div className="flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'ar' ? 'مدير المطعم: الشيف / طارق' : 'Host Account: General Manager'}</span>
            </div>
          </div>

          {/* Action Buttons: Language Switch & Back to Website */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            <button
              onClick={() => setAppView('website')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#c5a059] hover:bg-[#d8b56f] text-black shadow-md transition-all cursor-pointer"
            >
              <span>{t.nav.backToSite}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              aria-label={language === 'ar' ? 'تسجيل الخروج' : 'Sign out'}
              onClick={() => void signOutAdmin()}
              title={language === 'ar' ? 'تسجيل الخروج' : 'Sign out'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#b5ab99] transition-colors hover:border-rose-400/40 hover:text-rose-300"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = adminTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setAdminTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c5a059] text-black font-bold shadow-lg shadow-[#c5a059]/20'
                    : 'bg-[#141419] text-[#9c9383] hover:text-white hover:bg-[#1a1a22]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-black text-[#c5a059]' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Admin View */}
        <main>
          {adminTab === 'overview' && (
            <AdminOverview
              onSelectReservation={(r) => setInspectedReservation(r)}
              onOpenManualBooking={() => setIsManualBookingOpen(true)}
              onOpenDishModal={() => handleOpenDishModal()}
            />
          )}

          {adminTab === 'reservations' && (
            <AdminReservations
              onSelectReservation={(r) => setInspectedReservation(r)}
              onOpenManualBooking={() => setIsManualBookingOpen(true)}
            />
          )}

          {adminTab === 'calendar' && (
            <AdminCalendar
              onSelectReservation={(r) => setInspectedReservation(r)}
            />
          )}

          {adminTab === 'menu' && (
            <AdminMenu
              onOpenDishModal={(dish) => handleOpenDishModal(dish)}
            />
          )}

          {adminTab === 'inquiries' && (
            <AdminInquiries />
          )}

          {adminTab === 'settings' && (
            <AdminSettings />
          )}
        </main>

      </div>

      {/* Reservation Inspection Drawer */}
      <ReservationDrawer
        reservation={inspectedReservation}
        onClose={() => setInspectedReservation(null)}
      />

      {/* Dish Add/Edit Modal */}
      <DishModal
        dish={dishToEdit}
        isOpen={isDishModalOpen}
        onClose={() => {
          setIsDishModalOpen(false);
          setDishToEdit(null);
        }}
      />

      {/* Manual Booking Modal */}
      <ManualBookingModal
        isOpen={isManualBookingOpen}
        onClose={() => setIsManualBookingOpen(false)}
      />

    </div>
  );
};
