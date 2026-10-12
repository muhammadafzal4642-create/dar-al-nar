import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Globe, MessageSquare, Instagram, Facebook, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language, toggleLanguage, setAppView, settings } = useRestaurant();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.menu, href: '#menu' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.privateDining, href: '#private-dining' },
    { label: t.nav.contact, href: '#contact' }
  ];

  return (
    <footer className="bg-[#09090b] text-[#c5bcad] border-t border-[#c5a059]/20 relative pt-20 pb-12 overflow-hidden">
      {/* Subtle top arabesque glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand & Concept (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-heading tracking-[0.25em] text-2xl font-bold text-white">
                DAR AL NAR
              </span>
              <span className="text-[#c5a059] opacity-40 font-serif">|</span>
              <span className="font-heading text-2xl font-bold text-[#c5a059]">
                دار النار
              </span>
            </div>

            <p className="font-heading italic text-[#f0ebd9] text-sm">
              &ldquo;{t.brand.tagline}&rdquo;
            </p>

            <p className="text-xs text-[#8f8676] leading-relaxed max-w-sm">
              {t.brand.shortDesc}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#c5a059]/20 hover:text-[#c5a059] text-white flex items-center justify-center border border-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/96891234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366]/20 hover:text-[#25D366] text-white flex items-center justify-center border border-white/10 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#c5a059] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              {t.footer.openingHours}
            </h4>
            <div className="space-y-2 text-xs text-[#9a9181]">
              <p className="text-white font-medium">
                {language === 'ar' ? 'السبت – الخميس:' : 'Saturday – Thursday:'}
              </p>
              <p>{settings.openingHoursSatThu}</p>
              
              <p className="text-white font-medium pt-1">
                {language === 'ar' ? 'الجمعة:' : 'Friday:'}
              </p>
              <p>{settings.openingHoursFri}</p>

              <div className="pt-2 text-[11px] text-[#787163]">
                <p>• {t.footer.dressCode}</p>
                <p>• {t.footer.valetAvailable}</p>
              </div>
            </div>
          </div>

          {/* Language & Management Portal Switcher (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              {language === 'ar' ? 'اللغة والإدارة' : 'Settings'}
            </h4>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{language === 'en' ? 'العربية (RTL)' : 'English (LTR)'}</span>
            </button>

            {/* Admin Management Dashboard Link */}
            <button
              onClick={() => setAppView('admin')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#c5a059]/10 hover:bg-[#c5a059]/20 border border-[#c5a059]/30 text-xs font-medium text-[#c5a059] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.nav.adminPortal}</span>
            </button>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-1.5 text-[11px] text-[#7e7667] hover:text-white pt-2 cursor-pointer"
            >
              <ArrowUp className="w-3 h-3" />
              <span>{language === 'ar' ? 'العودة للأعلى' : 'Back to top'}</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7e7565]">
          <p>© 2026 DAR AL NAR · دار النار. {t.footer.rights}</p>
          <p className="flex items-center gap-1">
            <span>Shatti Al Qurum · Muscat · Sultanate of Oman</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
