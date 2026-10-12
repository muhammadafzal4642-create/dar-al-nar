import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { Introduction } from './components/home/Introduction';
import { FeaturedMenu } from './components/home/FeaturedMenu';
import { SignatureDish } from './components/home/SignatureDish';
import { DiningExperience } from './components/home/DiningExperience';
import { Gallery } from './components/home/Gallery';
import { PrivateDining } from './components/home/PrivateDining';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloating } from './components/common/WhatsAppFloating';
import { ReservationModal } from './components/reservation/ReservationModal';
import { ToastContainer } from './components/common/ToastContainer';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { LayoutDashboard, Globe, Sparkles } from 'lucide-react';

const MainApp: React.FC = () => {
  const { appView, setAppView, language, toggleLanguage, t, isAdminAuthenticated, isAuthLoading } = useRestaurant();

  if (appView === 'admin') {
    if (isAuthLoading) {
      return <div className="min-h-screen bg-[#0d0d10]" aria-busy="true" />;
    }
    if (!isAdminAuthenticated) return <AdminLogin />;
    return (
      <>
        <AdminLayout />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#e8dfc8] relative font-body selection:bg-[#c5a059] selection:text-black">
      
      {/* Top Demo Outreach Bar for Restaurant Pitch Presentation */}
      <aside aria-label="Demo Portal Switcher" className="bg-[#17171e] text-[#c7bead] border-b border-[#c5a059]/20 text-[11px] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
            <span className="font-semibold text-white tracking-wider">
              {language === 'ar' ? 'مسقط، سلطنة عُمان' : 'Muscat, Sultanate of Oman'}
            </span>
            <span className="hidden sm:inline text-[#766f62]">·</span>
            <span className="hidden sm:inline text-[#9e9482]">
              {language === 'ar' ? 'عرض تجريبي متكامل لموقع المطعم ولوحة الإدارة' : 'Premium Restaurant Website & Live Management Platform'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Admin Toggle */}
            <button
              onClick={() => setAppView('admin')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#c5a059]/15 hover:bg-[#c5a059]/25 text-[#c5a059] border border-[#c5a059]/30 font-medium transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'لوحة تحكم الإدارة (الخلفية)' : 'Open Admin Portal'}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[#d6cdbd] hover:text-white bg-white/5 border border-white/10 transition-colors cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#c5a059]" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Public Website Layout */}
      <Navbar />
      
      <main>
        <Hero />
        <Introduction />
        <FeaturedMenu />
        <SignatureDish />
        <DiningExperience />
        <Gallery />
        <PrivateDining />
        <ContactSection />
      </main>

      <Footer />

      {/* Interactive Global Overlays */}
      <ReservationModal />
      <WhatsAppFloating />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <RestaurantProvider>
      <MainApp />
    </RestaurantProvider>
  );
}
