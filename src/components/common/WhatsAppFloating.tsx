import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const { language, t } = useRestaurant();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const defaultMsg = language === 'ar' 
    ? 'مرحباً مطعم دار النار، أود الاستفسار عن حجز طاولة خاصة لتناول العشاء.' 
    : 'Hello Dar Al Nar, I would like to inquire about reserving a private table for dinner.';

  const handleSendWhatsApp = (msgToSend: string) => {
    const text = encodeURIComponent(msgToSend || defaultMsg);
    window.open(`https://wa.me/96891234567?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 rtl:left-auto rtl:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl shadow-[#25D366]/30 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
          aria-label={t.whatsapp.floatingTooltip}
        >
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-300 rounded-full border-2 border-[#0e0e10] animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0e0e10]" />
        </button>
      </div>

      {/* Floating Chat Modal / Dialogue */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 rtl:left-auto rtl:right-6 z-40 max-w-sm w-[90vw] bg-[#141418] border border-[#c5a059]/30 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200 text-[#e8dfc8]">
          {/* WhatsApp Header */}
          <div className="bg-[#0f241a] border-b border-[#25D366]/20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                <MessageSquare className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{t.whatsapp.chatHeader}</span>
                  <Sparkles className="w-3 h-3 text-[#c5a059]" />
                </h4>
                <p className="text-[11px] text-[#25D366] font-medium">{t.whatsapp.chatSubheader}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-[#8c8373] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#101014] space-y-3 max-h-72 overflow-y-auto text-xs">
            {/* Host Greeting Message */}
            <div className="bg-[#1c1c24] border border-white/5 p-3 rounded-xl rounded-tl-none rtl:rounded-tl-xl rtl:rounded-tr-none text-[#d6cdbd] leading-relaxed">
              <p className="font-semibold text-[#c5a059] mb-1">DAR AL NAR · Concierge</p>
              <p>{t.whatsapp.chatPrompt}</p>
              <span className="block text-[10px] text-[#787163] text-right mt-1 font-mono">Muscat · +968 9123 4567</span>
            </div>

            {/* Quick Prompt Chips */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase tracking-wider text-[#7e7667]">
                {language === 'ar' ? 'رسائل سريعة مقترحة:' : 'Quick Message Ideas:'}
              </p>
              <button
                onClick={() => handleSendWhatsApp(language === 'ar' ? 'أود حجز طاولة لشخصين مساء اليوم على الشرفة الملكية.' : 'I would like to book a table for 2 tonight on the Royal Terrace.')}
                className="w-full text-left rtl:text-right p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-[#c9c1b0] transition-colors"
              >
                {language === 'ar' ? '• حجز طاولة لشخصين هذا المساء' : '• Table for 2 tonight on Royal Terrace'}
              </button>
              <button
                onClick={() => handleSendWhatsApp(language === 'ar' ? 'أود الاستفسار عن حجز المجلس الخاص لمناسبة عائلية.' : 'Inquiring about private Majlis booking for a family gathering.')}
                className="w-full text-left rtl:text-right p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-[#c9c1b0] transition-colors"
              >
                {language === 'ar' ? '• استفسار عن حجز المجلس الخاص' : '• Private Majlis for family banquet'}
              </button>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-[#15151b] border-t border-white/5 flex items-center gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendWhatsApp(customMsg)}
              placeholder={language === 'ar' ? 'اكتب رسالتك لواتساب...' : 'Type message for WhatsApp...'}
              className="flex-1 px-3 py-2 rounded-lg bg-[#0e0e11] border border-white/10 text-white text-xs focus:outline-none focus:border-[#25D366]"
            />
            <button
              onClick={() => handleSendWhatsApp(customMsg)}
              className="p-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
