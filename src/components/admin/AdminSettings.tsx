import React, { useEffect, useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Save, Store, Clock, CalendarCheck, Share2, RotateCcw } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetToDemoData, language, t } = useRestaurant();

  const [formData, setFormData] = useState({ ...settings });

  useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void updateSettings(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Restaurant Information */}
      <div className="bg-[#141419] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <div className="p-2.5 rounded-xl bg-[#c5a059]/10 text-[#c5a059]">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              {t.admin.settings.restaurantInfo}
            </h3>
            <p className="text-xs text-[#8e8574]">
              {language === 'ar' ? 'العنوان الرسمي وبيانات الاتصال والخرائط' : 'Official venue identity, contact lines and location link'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {language === 'ar' ? 'اسم المطعم (بالإنجليزية)' : 'Restaurant Name (English)'}
            </label>
            <input
              type="text"
              value={formData.nameEn}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {language === 'ar' ? 'اسم المطعم (بالعربية)' : 'Restaurant Name (Arabic)'}
            </label>
            <input
              type="text"
              value={formData.nameAr}
              onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {language === 'ar' ? 'هاتف الاستقبال والحجوزات' : 'Phone Number'}
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {language === 'ar' ? 'البريد الإلكتروني للحجوزات' : 'Email Address'}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {language === 'ar' ? 'العنوان التفصيلي (بالإنجليزية)' : 'Detailed Address (English)'}
            </label>
            <input
              type="text"
              value={formData.addressEn}
              onChange={(e) => setFormData({ ...formData, addressEn: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {language === 'ar' ? 'العنوان التفصيلي (بالعربية)' : 'Detailed Address (Arabic)'}
            </label>
            <input
              type="text"
              value={formData.addressAr}
              onChange={(e) => setFormData({ ...formData, addressAr: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              Google Maps URL
            </label>
            <input
              type="url"
              value={formData.googleMapsUrl}
              onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>
      </div>

      {/* 2. Opening Hours */}
      <div className="bg-[#141419] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <div className="p-2.5 rounded-xl bg-[#c5a059]/10 text-[#c5a059]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              {language === 'ar' ? 'ساعات العمل وأوقات الاستقبال' : 'Opening Hours'}
            </h3>
            <p className="text-xs text-[#8e8574]">
              {language === 'ar' ? 'تحديد أوقات فتح وإغلاق المطعم' : 'Saturday–Thursday and Friday hospitality schedules'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              Saturday – Thursday (English)
            </label>
            <input
              type="text"
              value={formData.openingHoursSatThu}
              onChange={(e) => setFormData({ ...formData, openingHoursSatThu: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              السبت – الخميس (بالعربية)
            </label>
            <input
              type="text"
              value={formData.openingHoursSatThuAr}
              onChange={(e) => setFormData({ ...formData, openingHoursSatThuAr: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              Friday (English)
            </label>
            <input
              type="text"
              value={formData.openingHoursFri}
              onChange={(e) => setFormData({ ...formData, openingHoursFri: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              الجمعة (بالعربية)
            </label>
            <input
              type="text"
              value={formData.openingHoursFriAr}
              onChange={(e) => setFormData({ ...formData, openingHoursFriAr: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>
      </div>

      {/* 3. Reservation Rules */}
      <div className="bg-[#141419] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <div className="p-2.5 rounded-xl bg-[#c5a059]/10 text-[#c5a059]">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              {t.admin.settings.reservationRules}
            </h3>
            <p className="text-xs text-[#8e8574]">
              {language === 'ar' ? 'الحد الأقصى للضيوف وفترة الحجز' : 'Max guest party, table holding duration, and advance window'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {language === 'ar' ? 'الحد الأقصى للضيوف للحجز الفوري' : 'Maximum Guests per Booking'}
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={formData.maxGuestsPerReservation}
              onChange={(e) => setFormData({ ...formData, maxGuestsPerReservation: parseInt(e.target.value) || 14 })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {language === 'ar' ? 'مدة الجلسة (بالدقائق)' : 'Reservation Duration (Mins)'}
            </label>
            <input
              type="number"
              min="30"
              max="240"
              value={formData.reservationDurationMinutes}
              onChange={(e) => setFormData({ ...formData, reservationDurationMinutes: parseInt(e.target.value) || 120 })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {language === 'ar' ? 'أقصى فترة للحجز المسبق (أيام)' : 'Max Advance Booking (Days)'}
            </label>
            <input
              type="number"
              min="1"
              max="90"
              value={formData.advanceBookingDaysMax}
              onChange={(e) => setFormData({ ...formData, advanceBookingDaysMax: parseInt(e.target.value) || 30 })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>
      </div>

      {/* 4. Social & Messaging */}
      <div className="bg-[#141419] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <div className="p-2.5 rounded-xl bg-[#c5a059]/10 text-[#c5a059]">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              {t.admin.settings.socialAndContact}
            </h3>
            <p className="text-xs text-[#8e8574]">
              {language === 'ar' ? 'حسابات إنستغرام، واتساب وفيسبوك' : 'WhatsApp number, Instagram handle, and Facebook URL'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              WhatsApp (+968)
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              Instagram Handle
            </label>
            <input
              type="text"
              value={formData.instagramHandle}
              onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              Facebook URL
            </label>
            <input
              type="text"
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>
      </div>

      {/* Save Button Row & Reset Demo Data */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={resetToDemoData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-[#8e8574] hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'إعادة تعيين البيانات النموذجية' : 'Reset Initial Demo Dataset'}</span>
        </button>

        <button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#c5a059] hover:bg-[#d8b56f] text-black shadow-lg shadow-[#c5a059]/20 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{t.admin.actions.saveChanges}</span>
        </button>
      </div>

    </form>
  );
};
