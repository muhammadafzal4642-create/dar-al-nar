import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { MenuItem, MenuCategory } from '../../types';
import { Plus, Edit2, Trash2, Star, Eye, EyeOff, Search } from 'lucide-react';

interface AdminMenuProps {
  onOpenDishModal: (dish?: MenuItem) => void;
}

export const AdminMenu: React.FC<AdminMenuProps> = ({ onOpenDishModal }) => {
  const { 
    menuItems, 
    deleteMenuItem, 
    toggleMenuItemAvailability, 
    toggleMenuItemSpecial, 
    language, 
    t 
  } = useRestaurant();

  const [categoryFilter, setCategoryFilter] = useState<MenuCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchEn = item.nameEn.toLowerCase().includes(q);
      const matchAr = item.nameAr.toLowerCase().includes(q);
      return matchEn || matchAr;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8a8171] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'البحث عن طبق بالاسم...' : 'Search dish by name...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl bg-[#141419] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
          />
        </div>

        {/* Add Dish Action */}
        <button
          onClick={() => onOpenDishModal()}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#c5a059] hover:bg-[#d8b56f] text-black transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{t.admin.actions.addNewDish}</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#141419] border border-white/10 rounded-xl">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            categoryFilter === 'all'
              ? 'bg-[#c5a059] text-black font-bold'
              : 'text-[#9a9181] hover:text-white'
          }`}
        >
          {t.admin.actions.all}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              categoryFilter === c
                ? 'bg-[#c5a059] text-black font-bold'
                : 'text-[#9a9181] hover:text-white'
            }`}
          >
            {t.menu.categories[c]}
          </button>
        ))}
      </div>

      {/* Menu Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((dish) => {
          const name = language === 'ar' ? dish.nameAr : dish.nameEn;
          const desc = language === 'ar' ? dish.descriptionAr : dish.descriptionEn;

          return (
            <div
              key={dish.id}
              className={`bg-[#141419] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                dish.isAvailable ? 'border-white/5 hover:border-[#c5a059]/30' : 'border-rose-900/40 opacity-70'
              }`}
            >
              {/* Image & Quick Badges */}
              <div className="relative h-44 bg-black/40 overflow-hidden">
                <img
                  src={dish.image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[#c5a059] text-[11px] font-medium">
                    {t.menu.categories[dish.category]}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {dish.isChefsSpecial && (
                      <span className="bg-[#c5a059] text-black px-2 py-0.5 rounded text-[10px] font-bold">
                        ★ {t.menu.chefsSpecial}
                      </span>
                    )}
                    {!dish.isAvailable && (
                      <span className="bg-rose-900/80 text-rose-200 px-2 py-0.5 rounded text-[10px] font-bold">
                        {t.menu.unavailable}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-heading text-lg font-bold text-white leading-snug">
                      {name}
                    </h3>
                    <span className="font-heading text-base font-bold text-[#c5a059] shrink-0">
                      OMR {dish.price.toFixed(3)}
                    </span>
                  </div>

                  <p className="text-xs text-[#a29a8a] line-clamp-2 leading-relaxed">
                    {desc}
                  </p>
                </div>

                {/* Management Toggles & Actions */}
                <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#8e8574]">
                    {/* Toggle Availability */}
                    <button
                      onClick={() => toggleMenuItemAvailability(dish.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors ${
                        dish.isAvailable
                          ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/20 hover:bg-emerald-900/40'
                          : 'bg-rose-950/30 text-rose-300 border-rose-500/20 hover:bg-rose-900/40'
                      }`}
                    >
                      {dish.isAvailable ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{dish.isAvailable ? t.admin.actions.makeUnavailable : t.admin.actions.makeAvailable}</span>
                    </button>

                    {/* Toggle Chef Special */}
                    <button
                      onClick={() => toggleMenuItemSpecial(dish.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        dish.isChefsSpecial
                          ? 'bg-[#c5a059]/20 text-[#c5a059] border-[#c5a059]/40'
                          : 'bg-white/5 text-[#8e8574] border-white/5 hover:text-white'
                      }`}
                      title={t.admin.actions.toggleSpecial}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Edit / Delete Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => onOpenDishModal(dish)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{t.admin.actions.edit}</span>
                    </button>

                    <button
                      onClick={() => deleteMenuItem(dish.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-900/40 text-[#8e8574] hover:text-rose-300 transition-colors"
                      title={t.admin.actions.delete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
