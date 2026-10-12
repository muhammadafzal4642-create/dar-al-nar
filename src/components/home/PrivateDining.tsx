import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Sparkles, Calendar, Users, Send, CheckCircle2, Crown, Briefcase, Heart, Building2, Star } from 'lucide-react';

export const PrivateDining: React.FC = () => {
  const { t, language, addInquiry, addToast } = useRestaurant();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Family Celebration',
    guests: 20,
    preferredDate: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const eventTypes = [
    { en: 'Family Celebration', ar: 'احتفال عائلي', icon: <Heart className="w-4 h-4 text-[#c5a059]" /> },
    { en: 'Corporate Dinner', ar: 'عشاء عمل للشركات', icon: <Briefcase className="w-4 h-4 text-[#c5a059]" /> },
    { en: 'Wedding & Reception', ar: 'حفل زفاف واستقبال', icon: <Crown className="w-4 h-4 text-[#c5a059]" /> },
    { en: 'Business Meeting', ar: 'اجتماع أعمال تنفيذي', icon: <Building2 className="w-4 h-4 text-[#c5a059]" /> },
    { en: 'VIP State / Diplomatic Event', ar: 'مناسبة رسمية ودبلوماسية', icon: <Star className="w-4 h-4 text-[#c5a059]" /> }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.preferredDate) {
      addToast('error', language === 'ar' ? 'بيانات ناقصة' : 'Missing Information', 
        language === 'ar' ? 'يرجى استكمال الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await addInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        eventType: formData.eventType,
        guests: Number(formData.guests),
        preferredDate: formData.preferredDate,
        message: formData.message
      });

      setIsSubmitted(true);
      addToast('success', language === 'ar' ? 'تم استلام طلب الفعالية' : 'Inquiry Submitted', 
        language === 'ar' ? 'سيتواصل معكم مدير الفعاليات قريباً' : 'Event director will contact you shortly');
    } catch (error) {
      addToast('error', language === 'ar' ? 'تعذر إرسال الطلب' : 'Inquiry not submitted',
        error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="private-dining" className="py-24 sm:py-32 bg-[#121216] relative overflow-hidden">
      {/* Subtle Omani architectural mashrabiya background */}
      <div className="absolute inset-0 bg-omani-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a059] mb-3">
            <Crown className="w-4 h-4" />
            <span>{t.privateDining.kicker}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t.privateDining.headline}
          </h2>

          <div className="w-16 h-0.5 bg-[#c5a059]/60 mx-auto my-4" />

          <p className="text-sm sm:text-base text-[#a89f8f] font-light leading-relaxed">
            {t.privateDining.subheadline}
          </p>
        </div>

        {/* Main Grid: Left Event Offerings, Right Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols) - Event Types Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-heading text-2xl font-bold text-white mb-6">
              {language === 'ar' ? 'خيارات الفعاليات والمجالس' : 'Bespoke Event Experiences'}
            </h3>

            <div className="space-y-3.5">
              {t.privateDining.events.map((event, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#17171d] border border-white/5 hover:border-[#c5a059]/30 transition-all flex items-start gap-4 group"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-[#c5a059]/10 text-[#c5a059] shrink-0 transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#c5a059] transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-xs text-[#a29a8a] mt-1 leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct concierge note */}
            <div className="p-5 rounded-2xl bg-[#16161b] border border-[#c5a059]/20 mt-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white uppercase tracking-wider">
                  {language === 'ar' ? 'المدير التنفيذي للفعاليات' : 'Dedicated Event Concierge'}
                </p>
                <p className="text-xs text-[#9a9181] mt-0.5">+968 2490 8822 · events@daralnar.om</p>
              </div>
              <span className="text-xs text-[#c5a059] font-medium">Muscat, Oman</span>
            </div>
          </div>

          {/* Right Column (7 cols) - Form Container */}
          <div className="lg:col-span-7">
            <div className="bg-[#17171e] border border-[#c5a059]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <div className="mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#c5a059]">
                  {language === 'ar' ? 'حجز مباشر' : 'Tailored Hospitality'}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                  {t.privateDining.formTitle}
                </h3>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold text-white">
                    {language === 'ar' ? 'تم استلام طلبكم بنجاح' : 'Inquiry Successfully Received'}
                  </h4>
                  <p className="text-sm text-[#b8afa0] max-w-md mx-auto leading-relaxed">
                    {t.privateDining.successMessage}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        eventType: 'Family Celebration',
                        guests: 20,
                        preferredDate: '',
                        message: ''
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    {language === 'ar' ? 'إرسال طلب آخر' : 'Submit Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#b5ab99] mb-1.5">
                        {t.privateDining.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'ar' ? 'سالم البلوشي' : 'e.g. Salim Al-Balushi'}
                        className="w-full px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 focus:border-[#c5a059] text-white text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#b5ab99] mb-1.5">
                        {t.privateDining.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+968 9XXXXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 focus:border-[#c5a059] text-white text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#b5ab99] mb-1.5">
                        {t.privateDining.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="salim@example.om"
                        className="w-full px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 focus:border-[#c5a059] text-white text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#b5ab99] mb-1.5">
                        {t.privateDining.eventType}
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 focus:border-[#c5a059] text-white text-sm focus:outline-none transition-colors"
                      >
                        {eventTypes.map((et, i) => (
                          <option key={i} value={et.en}>
                            {language === 'ar' ? et.ar : et.en}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#b5ab99] mb-1.5">
                        {t.privateDining.guests} *
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-[#8a8171] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="number"
                          min="4"
                          max="150"
                          required
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 10 })}
                          className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-3 rounded-xl bg-[#0f0f12] border border-white/10 focus:border-[#c5a059] text-white text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#b5ab99] mb-1.5">
                        {t.privateDining.preferredDate} *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#8a8171] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          required
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-3 rounded-xl bg-[#0f0f12] border border-white/10 focus:border-[#c5a059] text-white text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#b5ab99] mb-1.5">
                      {t.privateDining.message}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === 'ar' ? 'أخبرنا عن تفاصيل القائمة المطلوبة أو أي ترتيبات خاصة...' : 'Tell us about your culinary preferences, timing, or decor requirements...'}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 focus:border-[#c5a059] text-white text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-semibold uppercase tracking-widest bg-[#c5a059] hover:bg-[#d8b56f] text-black shadow-lg shadow-[#c5a059]/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t.privateDining.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
