import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Sparkles, ArrowRight, X, Flame } from 'lucide-react';

export const Introduction: React.FC = () => {
  const { t, language } = useRestaurant();
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#111114] relative overflow-hidden">
      {/* Background Subtle Mashrabiya Pattern */}
      <div className="absolute inset-0 bg-omani-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.intro.kicker}</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {t.intro.headline}
            </h2>

            <div className="w-16 h-0.5 bg-[#c5a059]/60" />

            <p className="text-base sm:text-lg text-[#ccc4b3] font-light leading-relaxed">
              {t.intro.p1}
            </p>

            <p className="text-sm sm:text-base text-[#9f9686] leading-relaxed">
              {t.intro.p2}
            </p>

            {/* Cultural Proof Metric Points */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-[#c5a059]">
                  {t.intro.stat1Number}
                </p>
                <p className="text-xs text-[#a29a8a] mt-1 leading-snug">
                  {t.intro.stat1Label}
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-[#c5a059]">
                  {t.intro.stat2Number}
                </p>
                <p className="text-xs text-[#a29a8a] mt-1 leading-snug">
                  {t.intro.stat2Label}
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-[#c5a059]">
                  {t.intro.stat3Number}
                </p>
                <p className="text-xs text-[#a29a8a] mt-1 leading-snug">
                  {t.intro.stat3Label}
                </p>
              </div>
            </div>

            {/* Discover Story CTA */}
            <div className="pt-2">
              <button
                onClick={() => setShowStoryModal(true)}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#0e0e10] bg-[#c5a059] hover:bg-[#d8b56f] transition-all shadow-lg shadow-[#c5a059]/20 cursor-pointer group"
              >
                <span>{t.intro.cta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Imagery Column (5 cols) with Dual Asymmetric Photo Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Large Image */}
              <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/20 shadow-2xl bg-[#1a1a20]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                  alt="Dar Al Nar Dining Ambience"
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-[#e8dfc8]">
                  <span className="font-semibold text-[#c5a059]">Shatti Al Qurum</span> · Muscat Coastal Elegance
                </div>
              </div>

              {/* Secondary Overlapping Image (Chef Craft / Spices) */}
              <div className="absolute -bottom-8 -left-6 sm:-left-8 rtl:-left-auto rtl:-right-6 sm:rtl:-right-8 w-48 sm:w-56 rounded-xl overflow-hidden border-2 border-[#c5a059]/40 shadow-2xl bg-[#16161b]">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                  alt="Omani Spices & Chef Preparation"
                  className="w-full h-40 sm:h-44 object-cover"
                />
                <div className="p-2.5 bg-[#16161b] text-center border-t border-white/5">
                  <p className="text-[11px] font-semibold text-[#e8dfc8] uppercase tracking-wider">
                    {language === 'ar' ? 'فنون النار والبهارات' : 'Art of Fire & Baharat'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#151519] border border-[#c5a059]/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl text-[#e8dfc8] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-[#9a9181] hover:text-white rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Close story dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#c5a059] mb-2">
              <Flame className="w-4 h-4" />
              <span>{language === 'ar' ? 'قصة دار النار' : 'The Dar Al Nar Heritage'}</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
              {language === 'ar' ? 'رحلة الشغف بالأرض العُمانية وموائدها' : 'A Journey Through the Sultanate’s Culinary Soul'}
            </h3>

            <div className="space-y-4 text-sm text-[#c8bfb0] leading-relaxed">
              <p>
                {language === 'ar'
                  ? 'تأسس مطعم "دار النار" كرسالة حب لكرم الضيافة العُمانية الأصيلة، مستلهماً اسمه من قداسة النار في الموروث الشعبي—تلك النار التي تجمع العائلة حول التنور في الأعياد، وتوقد دلال القهوة في المجالس، وتشعل جمر اللبان لتعطير البيوت والمساجد.'
                  : 'Founded in Muscat, "Dar Al Nar" (The House of Fire) was born from a deep reverence for the sacred role of fire in Omani heritage. It represents the communal hearth—the fire of the subterranean Tannoor pit where families gather, the flame that simmers the copper dallah of Kahwa, and the embers that release fragrant Hojari frankincense into warm coastal air.'}
              </p>
              <p>
                {language === 'ar'
                  ? 'يجوب طهاتنا أرجاء السلطنة، من بساتين الرمان والورد في قمم الجبل الأخضر، ومزارع النخيل في نزوى والباطنة، إلى موانئ صور وصيد سمك الكنعد الطازج، ووديان صلالة الخضراء الغنية بجوز الهند والتوابل الجنوبية.'
                  : 'Our culinary team sources directly from producers across the Sultanate: damask roses and pomegranates from the limestone terraces of Jebel Akhdar, aged date syrup from Nizwa, wild kingfish and yellowfin tuna landed at Sur, and sun-ripened coconuts and spices from southern Dhofar.'}
              </p>
              <p>
                {language === 'ar'
                  ? 'نحن لا نقدم مجرد وجبة، بل نأخذ ضيوفنا في رحلة غامرة تعيد صياغة المطبخ العُماني ليكون سفيراً عالمياً للذوق الرفيع.'
                  : 'We do not simply present a meal; we curate an intimate sensory celebration of Oman’s historic maritime trade routes, warm hospitality, and timeless culinary pride.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowStoryModal(false)}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d8b56f]"
              >
                {language === 'ar' ? 'إغلاق' : 'Close Story'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
