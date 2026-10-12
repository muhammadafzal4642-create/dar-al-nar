import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { MenuItem, MenuCategory } from '../../types';
import { X, Save, Image, Sparkles } from 'lucide-react';

interface DishModalProps {
  dish: MenuItem | null; // null for new, MenuItem for edit
  isOpen: boolean;
  onClose: () => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, isOpen, onClose }) => {
  const { addMenuItem, updateMenuItem, language, t } = useRestaurant();

  const categories: MenuCategory[] = [
    'Omani Classics',
    'Starters',
    'Mains',
    'Seafood',
    'Grills',
    'Desserts',
    'Drinks'
  ];

  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    price: 6.500,
    category: 'Omani Classics' as MenuCategory,
    isChefsSpecial: false,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
  });

  useEffect(() => {
    if (dish) {
      setFormData({
        nameEn: dish.nameEn,
        nameAr: dish.nameAr,
        descriptionEn: dish.descriptionEn,
        descriptionAr: dish.descriptionAr,
        price: dish.price,
        category: dish.category,
        isChefsSpecial: dish.isChefsSpecial,
        isAvailable: dish.isAvailable,
        image: dish.image
      });
    } else {
      setFormData({
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        price: 7.000,
        category: 'Omani Classics',
        isChefsSpecial: false,
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
      });
    }
  }, [dish, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameEn || !formData.nameAr || formData.price <= 0) return;

    if (dish) {
      updateMenuItem(dish.id, formData);
    } else {
      addMenuItem(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#15151b] border border-[#c5a059]/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl text-[#e8dfc8] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 text-[#9a9181] hover:text-white rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">
            {language === 'ar' ? 'إدارة قائمة الطعام' : 'Menu Catalog'}
          </span>
          <h3 className="font-heading text-2xl font-bold text-white mt-0.5">
            {dish ? t.admin.menuModal.editTitle : t.admin.menuModal.addTitle}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                {t.admin.menuModal.nameEn} *
              </label>
              <input
                type="text"
                required
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="e.g. Traditional Majboos Laham"
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                {t.admin.menuModal.nameAr} *
              </label>
              <input
                type="text"
                required
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                placeholder="مثال: مجبوس لحم عُماني أصيل"
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                {t.admin.menuModal.price} *
              </label>
              <input
                type="number"
                step="0.100"
                min="0.1"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                {t.admin.menuModal.category}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuCategory })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {t.menu.categories[c]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {t.admin.menuModal.imageUrl}
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {t.admin.menuModal.descEn}
            </label>
            <textarea
              rows={2}
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {t.admin.menuModal.descAr}
            </label>
            <textarea
              rows={2}
              value={formData.descriptionAr}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          {/* Checkbox Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0f0f12] border border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isChefsSpecial}
                onChange={(e) => setFormData({ ...formData, isChefsSpecial: e.target.checked })}
                className="w-4 h-4 accent-[#c5a059] rounded"
              />
              <span className="text-xs text-white">{t.admin.menuModal.isSpecial}</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0f0f12] border border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4 accent-[#c5a059] rounded"
              />
              <span className="text-xs text-white">{t.admin.menuModal.isAvailable}</span>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-[#a29a8a] hover:text-white"
            >
              {t.admin.actions.close}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#c5a059] hover:bg-[#d8b56f] text-black transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{t.admin.menuModal.save}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
