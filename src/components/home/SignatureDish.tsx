import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Flame, Clock, Award, Sparkles, X, CalendarCheck } from 'lucide-react';

export const SignatureDish: React.FC = () => {
  const { t, language, openReservationModal, menuItems } = useRestaurant();
  const [showShuwaModal, setShowShuwaModal] = useState(false);

  const shuwaItem = menuItems.find(m => m.id === 'dish-1') || menuItems[0];

  return (
    <section className="py-24 sm:py-32 bg-[#0e0e11] relative overflow-hidden border-y border-[#c5a059]/15">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#8a252c]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#c5a059]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Large food imagery on one side (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#c5a059]/30 shadow-2xl bg-[#141418] group">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85"
                alt="Dar Al Nar Signature Shuwa"
                className="w-full h-[450px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              {/* Omani Heritage Watermark Emblem */}
              <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6 bg-black/70 backdrop-blur-md border border-[#c5a059]/40 px-4 py-2 rounded-xl flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#c5a059]" />
                <span className="text-xs uppercase tracking-widest text-[#e8dfc8] font-semibold">
                  {language === 'ar' ? 'درة المطبخ العُماني' : "Oman's Culinary Crown"}
                </span>
              </div>

              {/* Price & Serving badge on image */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-[#e8dfc8]">
                <div>
                  <p className="text-sm font-bold text-white">
                    {language === 'ar' ? 'لحم ضأن مطهو ببطء ٢٤ ساعة' : '24-Hour Tannoor Slow Pit Braised'}
                  </p>
                  <p className="text-[#a29a8a] text-xs">
                    {language === 'ar' ? 'يُقدم مع أرز البسمتي بالزعفران واللومي' : 'Served with Saffron Basmati & Muscat Loomie'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-heading text-2xl font-bold text-[#c5a059]">
                    OMR 8.500
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content on the other side (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a059]">
              <Award className="w-4 h-4" />
              <span>{t.signature.kicker}</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {t.signature.title}
            </h2>

            <p className="font-heading italic text-lg sm:text-xl text-[#d4af37]">
              &ldquo;{t.signature.tagline}&rdquo;
            </p>

            <div className="w-16 h-0.5 bg-[#c5a059]/60" />

            <p className="text-sm sm:text-base text-[#bfb6a5] leading-relaxed font-light">
              {t.signature.story1}
            </p>

            <p className="text-sm text-[#9b9282] leading-relaxed">
              {t.signature.story2}
            </p>

            {/* 3 Heritage Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#e8dfc8]">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>{t.signature.feature1}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#e8dfc8]">
                <Flame className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>{t.signature.feature2}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#e8dfc8]">
                <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>{t.signature.feature3}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowShuwaModal(true)}
                className="px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#c5a059] hover:bg-[#d8b56f] text-black transition-all shadow-lg shadow-[#c5a059]/20 cursor-pointer"
              >
                {t.signature.discoverCta}
              </button>

              <button
                onClick={() => openReservationModal(shuwaItem)}
                className="px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all cursor-pointer"
              >
                {language === 'ar' ? 'احجز طاولة لتذوق الشواء' : 'Book Table For Shuwa'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Discover Shuwa Ritual Modal */}
      {showShuwaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#15151a] border border-[#c5a059]/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl text-[#e8dfc8] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowShuwaModal(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-[#9a9181] hover:text-white rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Close ritual details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#c5a059] mb-2">
              <Flame className="w-4 h-4" />
              <span>{language === 'ar' ? 'طقوس الشواء العُماني التراثي' : 'The Sacred Shuwa Ritual'}</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
              {language === 'ar' ? 'من حفرة التنور إلى أرقى الموائد' : 'From the Ancient Earth Pit to the Royal Table'}
            </h3>

            <div className="space-y-4 text-sm text-[#c8bfb0] leading-relaxed">
              <p>
                {language === 'ar'
                  ? 'الشواء العُماني ليس مجرد طريقة طهي، بل هو احتفال وطني متوارث عبر القرون. تبدأ العملية بتدليك لحم الضأن الفاخر بخلطة "التتبيلة" المكونة من الفلفل الأحمر والكزبرة والكمون والهيل والكركم والخل والثوم والملح.'
                  : 'In Omani culture, Shuwa is an ancient communal rite of hospitality. Preparing it begins with marinating choice cuts of whole tender lamb in a proprietary Baharat spice paste consisting of crushed red chilies, coriander seeds, cumin, green cardamom, turmeric, wild garlic, and aged date vinegar.'}
              </p>
              <p>
                {language === 'ar'
                  ? 'يُلف اللحم بعناية فائقة في أوراق الموز الخضراء ثم يُوضع داخل "الخصفة" المصنوعة من سعف النخيل، ليُدفن تحت جمر خشب السمر لساعات طويلة حتى يكتسب نكهة التدخين العميقة ويصبح في غاية الطراوة.'
                  : 'The meat is wrapped tightly in layers of fresh banana leaves and encased in a woven date-palm leaf sack (Khasfa). It is then lowered into the sealed underground Tannoor pit over glowing Samar wood coals, where it slow-smokes for a full 24 hours until the collagen dissolves completely.'}
              </p>
              <p>
                {language === 'ar'
                  ? 'في دار النار، قمنا بتطويع هذه التقنية العريقة داخل مطبخنا المعاصر لنضمن تقديم الشواء يومياً بنفس المذاق التراثي الغني دون أي تنازل عن أصالة الوصفة.'
                  : 'At Dar Al Nar, Executive Chef has perfected this ritual within a modern culinary framework, allowing our guests to experience Eid-level festive Shuwa every single evening, paired with saffron-tinted long grain basmati rice, crispy shallots, and house-made date chutney.'}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-sm">
                <span className="text-[#a29a8a]">{language === 'ar' ? 'السعر للشخص:' : 'Price:'} </span>
                <span className="font-bold text-[#c5a059]">OMR 8.500</span>
              </div>
              <button
                onClick={() => {
                  setShowShuwaModal(false);
                  openReservationModal(shuwaItem);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d8b56f]"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{language === 'ar' ? 'احجز الآن لتجربة الشواء' : 'Reserve for Shuwa'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
