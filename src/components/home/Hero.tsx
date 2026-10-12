import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { CalendarCheck, UtensilsCrossed, ChevronDown, Sparkles, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, openReservationModal, language } = useRestaurant();

  const handleScrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuEl = document.querySelector('#menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    const aboutEl = document.querySelector('#about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2400&q=85"
          alt="Dar Al Nar Omani Dining Ambiance"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        {/* Layered gradients: dark vignette, warm ember glow, mashrabiya subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/75 to-[#0e0e10]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-omani-ornament opacity-25 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subhead / Location Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#c5a059]/30 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
          <span className="text-xs tracking-widest uppercase text-[#e8dfc8] font-medium">
            {t.hero.locationBadge}
          </span>
          <span className="text-[#c5a059] opacity-60">·</span>
          <span className="text-xs text-[#c5a059] font-medium">
            {language === 'ar' ? 'مطعم عُماني معاصر' : 'Modern Omani Gastronomy'}
          </span>
        </div>

        {/* Grand Typography Brand Name */}
        <div className="mb-4 space-y-1">
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] uppercase text-white drop-shadow-2xl">
            DAR AL NAR
          </h1>
          <p className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#c5a059] drop-shadow-md">
            دار النار
          </p>
        </div>

        {/* Tagline & Descriptive Copy */}
        <p className="font-heading italic text-xl sm:text-2xl md:text-3xl text-[#f3eedf] tracking-wide max-w-2xl mt-2 mb-4">
          &ldquo;{t.hero.headline}&rdquo;
        </p>
        <p className="text-sm sm:text-base md:text-lg text-[#b8afa0] max-w-2xl mx-auto font-light leading-relaxed mb-10">
          {t.hero.subheadline}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => openReservationModal()}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase bg-[#c5a059] hover:bg-[#d4af37] text-[#0e0e10] shadow-xl shadow-[#c5a059]/25 hover:shadow-[#c5a059]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-[#0e0e10]" />
            <span>{t.hero.reserveCta}</span>
          </button>

          <a
            href="#menu"
            onClick={handleScrollToMenu}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase bg-white/5 hover:bg-white/10 text-[#e8dfc8] hover:text-white border border-white/20 hover:border-[#c5a059]/50 backdrop-blur-md transition-all cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#c5a059]" />
            <span>{t.hero.menuCta}</span>
          </a>
        </div>

        {/* Omani Cultural Signature Detail */}
        <div className="mt-14 flex items-center gap-6 text-[#9a9181] text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{language === 'ar' ? 'طهي على جمر خشب السمر' : 'Samar Wood Tannoor Fire'}</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{language === 'ar' ? 'لبان حوجري ظفاري فاخر' : 'Pure Dhofari Hojari Frankincense'}</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#9a9181] hover:text-[#c5a059] transition-colors cursor-pointer group"
        aria-label="Scroll to introduction"
      >
        <span className="text-[11px] uppercase tracking-widest opacity-80 group-hover:opacity-100">
          {t.hero.scrollDown}
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#c5a059]" />
      </button>
    </section>
  );
};
