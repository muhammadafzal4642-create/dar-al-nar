import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Reservation, ReservationStatus } from '../../types';
import { X, CheckCircle2, XCircle, Clock, Users, Calendar, Phone, Mail, MessageSquare, MapPin } from 'lucide-react';

interface ReservationDrawerProps {
  reservation: Reservation | null;
  onClose: () => void;
}

export const ReservationDrawer: React.FC<ReservationDrawerProps> = ({ reservation, onClose }) => {
  const { updateReservationStatus, updateReservationTable, language, t } = useRestaurant();
  const [tableInput, setTableInput] = useState(reservation?.tableNumber || '');

  if (!reservation) return null;

  const handleTableSave = () => {
    updateReservationTable(reservation.id, tableInput);
  };

  const statusColors: Record<ReservationStatus, { bg: string; text: string; border: string }> = {
    pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    confirmed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    cancelled: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
    completed: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' }
  };

  const currentStyle = statusColors[reservation.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg h-full bg-[#131317] border-l rtl:border-l-0 rtl:border-r border-[#c5a059]/20 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-[#e8dfc8] shadow-2xl animate-in slide-in-from-right duration-300"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#c5a059]">
                {reservation.referenceNo}
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-0.5">
                {t.admin.reservationDrawer.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#9a9181] hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Status Pill with status switcher buttons */}
          <div className="my-6 p-4 rounded-2xl bg-[#191921] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#a29a8a]">{t.admin.reservationDrawer.changeStatus}:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}>
                {t.admin.status[reservation.status]}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => updateReservationStatus(reservation.id, st)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border transition-all ${
                    reservation.status === st
                      ? 'bg-white/15 border-white text-white font-bold'
                      : 'bg-black/30 border-white/5 text-[#a29a8a] hover:text-white'
                  }`}
                >
                  {t.admin.status[st]}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Information */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">
              {t.admin.reservationDrawer.customerInfo}
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-[#8e8574]">{language === 'ar' ? 'اسم الضيف' : 'Customer Name'}</span>
                <span className="font-semibold text-white text-sm">{reservation.customerName}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-[#8e8574]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'الهاتف' : 'Phone'}</span>
                </div>
                <a href={`tel:${reservation.phone}`} className="font-mono text-[#c5a059] hover:underline">
                  {reservation.phone}
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-[#8e8574]">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</span>
                </div>
                <a href={`mailto:${reservation.email}`} className="text-white hover:underline">
                  {reservation.email}
                </a>
              </div>
            </div>
          </div>

          {/* Booking Parameters */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">
              {t.admin.reservationDrawer.bookingInfo}
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-1.5 text-[#8e8574] mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{language === 'ar' ? 'التاريخ' : 'Date'}</span>
                </div>
                <span className="font-semibold text-white text-sm">{reservation.date}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-1.5 text-[#8e8574] mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{language === 'ar' ? 'الوقت' : 'Time'}</span>
                </div>
                <span className="font-semibold text-white text-sm">{reservation.time}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-1.5 text-[#8e8574] mb-1">
                  <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{language === 'ar' ? 'عدد الضيوف' : 'Guests'}</span>
                </div>
                <span className="font-semibold text-white text-sm">{reservation.guests}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-1.5 text-[#8e8574] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{language === 'ar' ? 'الجلسة' : 'Area'}</span>
                </div>
                <span className="font-semibold text-white text-xs truncate">
                  {reservation.seatingArea ? t.reservation.seatingOptions[reservation.seatingArea] : 'Standard'}
                </span>
              </div>
            </div>
          </div>

          {/* Table Allocation Assignment */}
          <div className="p-4 rounded-2xl bg-[#191921] border border-white/5 mb-6">
            <label className="block text-xs font-semibold uppercase tracking-widest text-[#c5a059] mb-2">
              {t.admin.reservationDrawer.assignTable}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="e.g. Table M-01 (Majlis) or R-04 (Terrace)"
                value={tableInput}
                onChange={(e) => setTableInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              />
              <button
                onClick={handleTableSave}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c5a059] text-black hover:bg-[#d8b56f] transition-colors"
              >
                {language === 'ar' ? 'تعيين' : 'Assign'}
              </button>
            </div>
          </div>

          {/* Special Requests */}
          {reservation.specialRequests && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 mb-6">
              <span className="text-xs font-semibold text-amber-300 block mb-1">
                {t.admin.reservationDrawer.specialRequests}
              </span>
              <p className="text-xs text-[#d8cfbe] leading-relaxed">
                {reservation.specialRequests}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons in Drawer Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
          <a
            href={`https://wa.me/${reservation.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `Greetings ${reservation.customerName}, this is Dar Al Nar Restaurant in Muscat confirming your reservation reference ${reservation.referenceNo} for ${reservation.guests} guests on ${reservation.date} at ${reservation.time}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-semibold border border-[#25D366]/30 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Guest</span>
          </a>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
          >
            {t.admin.actions.close}
          </button>
        </div>
      </div>
    </div>
  );
};
