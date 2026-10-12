import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Menu as MenuIcon, X, CalendarCheck, Globe, MessageSquare, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t, openReservationModal, setAppView } = useRestaurant();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.menu, href: '#menu' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.privateDining, href: '#private-dining' },
    { label: t.nav.contact, href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0e0e10]/95 backdrop-blur-md border-b border-[#c5a059]/20 shadow-xl py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#home"
              className="flex flex-col group text-left rtl:text-right"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-heading tracking-[0.25em] text-lg sm:text-2xl font-bold text-white group-hover:text-[#c5a059] transition-colors">
                  DAR AL NAR
                </span>
                <span className="text-[#c5a059] opacity-40 font-serif text-sm">|</span>
                <span className="font-heading text-lg sm:text-2xl font-bold text-[#c5a059] group-hover:text-amber-200 transition-colors">
                  دار النار
                </span>
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#a29a8a] mt-0.5">
                {language === 'ar' ? 'نكهة عُمانية برؤية عصرية' : 'A Taste of Oman, Reimagined.'}
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-sm tracking-wider uppercase text-[#d6cdbd] hover:text-[#c5a059] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a059] hover:after:w-full after:transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions: Switcher, WhatsApp, Reserve CTA, Admin Portal */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#d6cdbd] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                title={language === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
              >
                <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>

              {/* WhatsApp Quick CTA */}
              <a
                href="https://wa.me/96891234567?text=Hello%20Dar%20Al%20Nar,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 rounded-full text-[#d6cdbd] hover:text-[#25D366] hover:bg-[#25D366]/10 border border-white/10 transition-all"
                title="WhatsApp Concierge"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {/* Reserve Button */}
              <button
                onClick={() => openReservationModal()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#c5a059] hover:bg-[#d8b56f] text-[#0e0e10] shadow-lg shadow-[#c5a059]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{t.nav.reserveTable}</span>
              </button>

              {/* Admin Dashboard Switcher */}
              <button
                onClick={() => setAppView('admin')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] text-[#a09787] hover:text-[#c5a059] hover:bg-white/5 transition-all"
                title="Management System Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{t.nav.adminPortal}</span>
              </button>
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded text-xs font-medium text-[#d6cdbd] bg-white/5 border border-white/10"
              >
                {language === 'en' ? 'عربي' : 'EN'}
              </button>

              <button
                onClick={() => openReservationModal()}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#c5a059] text-[#0e0e10]"
              >
                {t.nav.reserveTable}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#d6cdbd] hover:text-white rounded-md bg-white/5"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#0e0e10]/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white tracking-widest">DAR AL NAR · دار النار</p>
                <p className="text-xs text-[#a29a8a]">{t.brand.tagline}</p>
              </div>
            </div>

            <nav className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-lg font-medium text-[#e8dfc8] hover:text-[#c5a059] py-2 border-b border-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openReservationModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold tracking-wider uppercase bg-[#c5a059] text-black shadow-lg"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t.nav.reserveTable}</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="https://wa.me/96891234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium text-[#d6cdbd] bg-white/5 border border-white/10"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAppView('admin');
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium text-[#d6cdbd] bg-white/5 border border-white/10"
              >
                <LayoutDashboard className="w-4 h-4 text-[#c5a059]" />
                <span>{t.nav.adminPortal}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
