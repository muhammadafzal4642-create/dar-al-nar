import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { GALLERY_ITEMS } from '../../data/initialData';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { t, language } = useRestaurant();
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveImageIdx(index);
  };

  const closeLightbox = () => {
    setActiveImageIdx(null);
  };

  const prevImage = () => {
    if (activeImageIdx !== null) {
      setActiveImageIdx((activeImageIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const nextImage = () => {
    if (activeImageIdx !== null) {
      setActiveImageIdx((activeImageIdx + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#0a0a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.gallery.kicker}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t.gallery.headline}
          </h2>

          <div className="w-16 h-0.5 bg-[#c5a059]/60 mx-auto my-4" />

          <p className="text-sm sm:text-base text-[#a89f8f] font-light leading-relaxed">
            {t.gallery.subheadline}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[240px]">
          {GALLERY_ITEMS.map((item, idx) => {
            const title = language === 'ar' ? item.titleAr : item.titleEn;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#141418] border border-white/5 hover:border-[#c5a059]/40 transition-all duration-300 shadow-lg ${item.span}`}
              >
                <img
                  src={item.image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-0.5 group-hover:text-[#e8dfc8]">
                      {title}
                    </h3>
                  </div>

                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#c5a059] text-white group-hover:text-black transition-colors shrink-0">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeImageIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 rtl:right-auto rtl:left-6 z-20 p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevImage}
            className="absolute left-6 rtl:left-auto rtl:right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 rtl:right-auto rtl:left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Container */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={GALLERY_ITEMS[activeImageIdx].image}
              alt={language === 'ar' ? GALLERY_ITEMS[activeImageIdx].titleAr : GALLERY_ITEMS[activeImageIdx].titleEn}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-white/10 shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-widest text-[#c5a059]">
                {GALLERY_ITEMS[activeImageIdx].category}
              </span>
              <p className="text-base font-semibold text-white mt-1">
                {language === 'ar' ? GALLERY_ITEMS[activeImageIdx].titleAr : GALLERY_ITEMS[activeImageIdx].titleEn}
              </p>
              <p className="text-xs text-[#8d8474] mt-1 font-mono">
                {activeImageIdx + 1} / {GALLERY_ITEMS.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
