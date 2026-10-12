import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { CustomerInquiry, InquiryStatus } from '../../types';
import { MessageSquare, Phone, Mail, Calendar, Users, CheckCircle2, Clock, Check, X } from 'lucide-react';

export const AdminInquiries: React.FC = () => {
  const { inquiries, updateInquiryStatus, language, t } = useRestaurant();
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all');

  const filteredInquiries = inquiries.filter(inq => {
    if (filter === 'all') return true;
    return inq.status === filter;
  });

  const handleOpenInquiry = (inq: CustomerInquiry) => {
    setSelectedInquiry(inq);
    setNotesInput(inq.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedInquiry) {
      updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, notesInput);
      setSelectedInquiry(prev => prev ? { ...prev, notes: notesInput } : null);
    }
  };

  const statusStyles: Record<InquiryStatus, { bg: string; text: string; border: string }> = {
    new: { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/30' },
    contacted: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30' },
    resolved: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30' }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 bg-[#141419] border border-white/10 rounded-xl">
          {(['all', 'new', 'contacted', 'resolved'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === st
                  ? 'bg-[#c5a059] text-black font-bold'
                  : 'text-[#9a9181] hover:text-white'
              }`}
            >
              {st === 'all' ? t.admin.actions.all : t.admin.status[st]}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#8e8574] font-mono">
          {filteredInquiries.length} {language === 'ar' ? 'طلبات' : 'Inquiries'}
        </span>
      </div>

      {/* Inquiries Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInquiries.map((inq) => {
          const style = statusStyles[inq.status];
          return (
            <div
              key={inq.id}
              className="bg-[#141419] border border-white/5 hover:border-[#c5a059]/30 rounded-2xl p-6 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#c5a059]">
                      {inq.eventType}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-white mt-0.5">
                      {inq.name}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}>
                    {t.admin.status[inq.status]}
                  </span>
                </div>

                {/* Contact and Booking details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-[#9a9181] mb-4 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>{inq.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span className="truncate">{inq.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>{inq.preferredDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>{inq.guests} {language === 'ar' ? 'ضيوف' : 'Guests'}</span>
                  </div>
                </div>

                {/* Message text */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-[#d8cfbe] leading-relaxed mb-4">
                  "{inq.message}"
                </div>

                {/* Existing staff notes if any */}
                {inq.notes && (
                  <div className="text-[11px] text-[#c5a059] bg-[#c5a059]/10 p-2.5 rounded-lg border border-[#c5a059]/20 mb-4">
                    <span className="font-semibold block">{language === 'ar' ? 'ملاحظات الإدارة:' : 'Staff Notes:'}</span>
                    {inq.notes}
                  </div>
                )}
              </div>

              {/* Status Update Actions */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateInquiryStatus(inq.id, 'contacted')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      inq.status === 'contacted'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold'
                        : 'bg-white/5 text-[#8e8574] hover:text-white border-white/5'
                    }`}
                  >
                    {t.admin.status.contacted}
                  </button>

                  <button
                    onClick={() => updateInquiryStatus(inq.id, 'resolved')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      inq.status === 'resolved'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold'
                        : 'bg-white/5 text-[#8e8574] hover:text-white border-white/5'
                    }`}
                  >
                    {t.admin.status.resolved}
                  </button>
                </div>

                <button
                  onClick={() => handleOpenInquiry(inq)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white"
                >
                  {language === 'ar' ? 'إضافة ملاحظة' : 'Add Note'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note Edit Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#15151b] border border-[#c5a059]/30 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl text-[#e8dfc8]">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-[#9a9181] hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-xl font-bold text-white mb-2">
              {language === 'ar' ? 'ملاحظات طلب الفعالية' : 'Internal Inquiry Notes'}
            </h3>
            <p className="text-xs text-[#8e8574] mb-4">
              {selectedInquiry.name} · {selectedInquiry.eventType}
            </p>

            <textarea
              rows={4}
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder={language === 'ar' ? 'اكتب ملاحظات التواصل وتفاصيل الاتفاق مع العميل...' : 'Record customer calls, menu quote sent, or table reservation holds...'}
              className="w-full px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059] mb-4"
            />

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#8e8574] hover:text-white"
              >
                {t.admin.actions.close}
              </button>
              <button
                onClick={() => {
                  handleSaveNotes();
                  setSelectedInquiry(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#c5a059] text-black hover:bg-[#d8b56f]"
              >
                {t.admin.actions.saveChanges}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
