import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { MenuCategory, MenuItem } from '../../types';
import { Sparkles, CalendarCheck, X, Eye } from 'lucide-react';

export const FeaturedMenu: React.FC = () => {
  const { menuItems, language, t, openReservationModal } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'All'>('All');
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [inspectedDish, setInspectedDish] = useState<MenuItem | null>(null);

  const categories: MenuCategory[] = [
    'Omani Classics',
    'Starters',
    'Mains',
    'Seafood',
    'Grills',
    'Desserts',
    'Drinks'
  ];

  const filteredItems = menuItems.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  // If not full menu, show first 6 items or all of selected category
  const displayedItems = showFullMenu 
    ? filteredItems 
    : (selectedCategory === 'All' ? filteredItems.slice(0, 6) : filteredItems);

  return (
    <section id="menu" className="py-24 sm:py-32 bg-[#0c0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.menu.kicker}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t.menu.headline}
          </h2>

          <div className="w-16 h-0.5 bg-[#c5a059]/60 mx-auto my-4" />

          <p className="text-sm sm:text-base text-[#a89f8f] font-light leading-relaxed">
            {t.menu.subheadline}
          </p>

          {/* Interactive Category Filter Tabs (Zero-Pill Discipline: clean segmented bar with button elements) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#17171c] border border-white/10 rounded-xl max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#c5a059] text-[#0e0e10] font-semibold shadow-md'
                  : 'text-[#bbb19f] hover:text-white hover:bg-white/5'
              }`}
            >
              {t.menu.filterAll}
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#c5a059] text-[#0e0e10] font-semibold shadow-md'
                    : 'text-[#bbb19f] hover:text-white hover:bg-white/5'
                }`}
              >
                {t.menu.categories[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedItems.map((dish) => {
            const name = language === 'ar' ? dish.nameAr : dish.nameEn;
            const desc = language === 'ar' ? dish.descriptionAr : dish.descriptionEn;
            const tags = language === 'ar' ? dish.dietaryTagsAr : dish.dietaryTagsEn;

            return (
              <div
                key={dish.id}
                className="group flex flex-col justify-between bg-[#141418] hover:bg-[#18181e] border border-white/5 hover:border-[#c5a059]/30 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {/* Image Header */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-black/40">
                  <img
                    src={dish.image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30" />

                  {/* Clean unboxed indicators on photo */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                    {dish.isChefsSpecial ? (
                      <span className="text-[#c5a059] font-medium tracking-wider text-[11px] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded">
                        ★ {t.menu.chefsSpecial}
                      </span>
                    ) : <span />}

                    {!dish.isAvailable && (
                      <span className="text-rose-300 font-medium text-[11px] bg-black/80 backdrop-blur-md px-2.5 py-1 rounded">
                        {t.menu.unavailable}
                      </span>
                    )}
                  </div>

                  {/* Quick Inspect Button */}
                  <button
                    onClick={() => setInspectedDish(dish)}
                    className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 p-2 rounded-full bg-black/70 hover:bg-[#c5a059] text-white hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    title={t.menu.dishDetails}
                    aria-label={`View details for ${name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata with separators (Anti-Slop rule compliant) */}
                    <div className="flex items-center gap-2 text-xs text-[#8f8574] mb-2 font-medium">
                      <span>{t.menu.categories[dish.category]}</span>
                      {tags && tags.length > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{tags[0]}</span>
                        </>
                      )}
                    </div>

                    {/* Dish Name & Price Row */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#c5a059] transition-colors leading-snug">
                        {name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="font-heading text-base sm:text-lg font-bold text-[#c5a059]">
                          OMR {dish.price.toFixed(3)}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#b2a99a] line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => setInspectedDish(dish)}
                      className="text-xs text-[#a29a8a] hover:text-[#c5a059] underline underline-offset-4 cursor-pointer"
                    >
                      {t.menu.dishDetails}
                    </button>

                    <button
                      onClick={() => openReservationModal(dish)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#c5a059] hover:text-amber-200 cursor-pointer"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'طلب مع حجز' : 'Reserve Table'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Menu Toggle */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setShowFullMenu(!showFullMenu)}
            className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase text-white bg-white/5 hover:bg-white/10 border border-[#c5a059]/40 hover:border-[#c5a059] transition-all cursor-pointer"
          >
            {showFullMenu ? t.menu.closeMenu : t.menu.viewFullMenu}
          </button>
        </div>

      </div>

      {/* Dish Inspection Detail Modal */}
      {inspectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#15151a] border border-[#c5a059]/30 rounded-2xl max-w-lg w-full overflow-hidden relative shadow-2xl text-[#e8dfc8]">
            <button
              onClick={() => setInspectedDish(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 p-2 text-white bg-black/60 rounded-full hover:bg-black/90 transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 relative bg-black/50">
              <img
                src={inspectedDish.image}
                alt={language === 'ar' ? inspectedDish.nameAr : inspectedDish.nameEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15151a] via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs text-[#a29a8a] tracking-wider uppercase">
                  {t.menu.categories[inspectedDish.category]}
                </span>
                <span className="font-heading text-xl font-bold text-[#c5a059]">
                  OMR {inspectedDish.price.toFixed(3)}
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white mb-3">
                {language === 'ar' ? inspectedDish.nameAr : inspectedDish.nameEn}
              </h3>

              <p className="text-sm text-[#b8afa0] leading-relaxed mb-6">
                {language === 'ar' ? inspectedDish.descriptionAr : inspectedDish.descriptionEn}
              </p>

              {/* Dietary Tags if present */}
              {((language === 'ar' ? inspectedDish.dietaryTagsAr : inspectedDish.dietaryTagsEn) || []).length > 0 && (
                <div className="mb-6 flex items-center gap-2 text-xs text-[#8e8574]">
                  <span>{language === 'ar' ? 'الملاحظات:' : 'Characteristics:'}</span>
                  {(language === 'ar' ? inspectedDish.dietaryTagsAr : inspectedDish.dietaryTagsEn)?.map((tag, idx) => (
                    <span key={idx}>
                      {idx > 0 && ' · '}
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setInspectedDish(null)}
                  className="px-5 py-2.5 rounded-lg text-xs font-medium text-[#b2a99a] hover:text-white"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>

                <button
                  onClick={() => {
                    const dishToReserve = inspectedDish;
                    setInspectedDish(null);
                    openReservationModal(dishToReserve);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d8b56f]"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{t.menu.orderOrReserve}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
