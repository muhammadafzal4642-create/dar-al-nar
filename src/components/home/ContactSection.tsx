import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, ExternalLink, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t, language, settings, addInquiry, addToast } = useRestaurant();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await addInquiry({
        name: formData.name,
        phone: formData.phone || '+968 (Not provided)',
        email: formData.email,
        eventType: 'General Dining Inquiry',
        guests: 2,
        preferredDate: new Date().toISOString().split('T')[0],
        message: formData.message
      });

      setIsSent(true);
      addToast('success', language === 'ar' ? 'تم استلام الرسالة' : 'Message Received', t.contact.sentSuccess);
    } catch (error) {
      addToast('error', language === 'ar' ? 'تعذر إرسال الرسالة' : 'Message not sent',
        error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0c0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a059] mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.contact.kicker}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t.contact.headline}
          </h2>

          <div className="w-16 h-0.5 bg-[#c5a059]/60 mx-auto my-4" />

          <p className="text-sm sm:text-base text-[#a89f8f] font-light leading-relaxed">
            {t.contact.subheadline}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Address */}
          <div className="p-6 rounded-2xl bg-[#141418] border border-white/5 hover:border-[#c5a059]/30 transition-all">
            <div className="p-3 rounded-xl bg-white/5 text-[#c5a059] w-fit mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              {t.contact.addressTitle}
            </h3>
            <p className="text-xs text-[#b8afa0] leading-relaxed">
              {language === 'ar' ? settings.addressAr : settings.addressEn}
            </p>
          </div>

          {/* Phone */}
          <div className="p-6 rounded-2xl bg-[#141418] border border-white/5 hover:border-[#c5a059]/30 transition-all">
            <div className="p-3 rounded-xl bg-white/5 text-[#c5a059] w-fit mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              {t.contact.phoneTitle}
            </h3>
            <p className="text-xs text-[#b8afa0] leading-relaxed font-mono">
              {settings.phone}
            </p>
            <p className="text-[11px] text-[#7a7263] mt-1">
              {language === 'ar' ? 'يومياً من ١١:٠٠ صباحاً' : 'Daily from 11:00 AM'}
            </p>
          </div>

          {/* Email */}
          <div className="p-6 rounded-2xl bg-[#141418] border border-white/5 hover:border-[#c5a059]/30 transition-all">
            <div className="p-3 rounded-xl bg-white/5 text-[#c5a059] w-fit mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              {t.contact.emailTitle}
            </h3>
            <p className="text-xs text-[#b8afa0] leading-relaxed font-mono">
              {settings.email}
            </p>
            <p className="text-[11px] text-[#7a7263] mt-1">
              events@daralnar.om
            </p>
          </div>

          {/* Opening Hours */}
          <div className="p-6 rounded-2xl bg-[#141418] border border-white/5 hover:border-[#c5a059]/30 transition-all">
            <div className="p-3 rounded-xl bg-white/5 text-[#c5a059] w-fit mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              {t.contact.hoursTitle}
            </h3>
            <p className="text-xs text-[#b8afa0] leading-relaxed">
              {language === 'ar' ? settings.openingHoursSatThuAr : `Sat–Thu: ${settings.openingHoursSatThu}`}
            </p>
            <p className="text-xs text-[#b8afa0] leading-relaxed mt-1">
              {language === 'ar' ? settings.openingHoursFriAr : `Fri: ${settings.openingHoursFri}`}
            </p>
          </div>
        </div>

        {/* 2-Column: Map Preview & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Google Map Preview (6 cols) */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 bg-[#131317] flex flex-col justify-between relative shadow-2xl">
            {/* Map Imagery Simulation with Muscat Landmarks */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#1a1a22]">
              <img
                src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80"
                alt="Muscat Coast and Qurum Beach"
                className="w-full h-full object-cover filter contrast-125 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-[#131317]/40 to-transparent" />
              
              {/* Map Marker Indicator Card */}
              <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6 bg-black/85 backdrop-blur-md border border-[#c5a059]/40 p-4 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c5a059] text-black flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wider uppercase">
                      DAR AL NAR · دار النار
                    </h4>
                    <p className="text-[11px] text-[#b8afa0] mt-0.5">
                      {language === 'ar' ? 'ممشى شاطئ القرم، مسقط' : 'Beach Promenade, Shatti Al Qurum'}
                    </p>
                    <p className="text-[10px] text-[#c5a059] mt-1 font-medium">
                      {language === 'ar' ? 'دقيقتان من دار الأوبرا السلطانية' : '2 mins from Royal Opera House'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Map Details & Action */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
              <div>
                <p className="text-xs font-semibold text-white uppercase tracking-wider">
                  {language === 'ar' ? 'خدمة صف السيارات المجانية متوفرة' : 'Complimentary Valet Parking'}
                </p>
                <p className="text-xs text-[#8c8373] mt-0.5">
                  {language === 'ar' ? 'مدخل خاص لضيوف المجلس والشرفة' : 'Dedicated entrance for Majlis & Terrace guests'}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                >
                  <span>{t.contact.directions}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Chat With Us on WhatsApp button (Requirement 19) */}
                <a
                  href="https://wa.me/96891234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#25D366] hover:bg-[#20ba59] text-black transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              {t.contact.sendMessage}
            </h3>
            <p className="text-xs text-[#9a9181] mb-6">
              {language === 'ar' ? 'يسرنا استقبال آرائكم واستفساراتكم بشأن زيارتكم القادمة.' : 'We welcome your feedback and special culinary inquiries.'}
            </p>

            {isSent ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">
                  {language === 'ar' ? 'شكراً لتواصلكم' : 'Message Sent Successfully'}
                </h4>
                <p className="text-xs text-[#b8afa0]">
                  {t.contact.sentSuccess}
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormData({ name: '', phone: '', email: '', message: '' });
                  }}
                  className="mt-4 px-5 py-2 rounded-full text-xs font-semibold uppercase bg-white/10 text-white"
                >
                  {language === 'ar' ? 'إرسال رسالة جديدة' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                    {t.contact.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                      {t.contact.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+968 9XXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                      {t.contact.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                    {t.contact.message} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-widest bg-[#c5a059] hover:bg-[#d8b56f] text-black shadow-lg shadow-[#c5a059]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t.contact.sendBtn}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
