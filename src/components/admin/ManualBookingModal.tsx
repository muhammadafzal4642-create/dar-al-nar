import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { X, Calendar, Clock, Users, Plus, User } from 'lucide-react';

interface ManualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualBookingModal: React.FC<ManualBookingModalProps> = ({ isOpen, onClose }) => {
  const { addReservation, language, t, addToast } = useRestaurant();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+968 ');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('2026-10-07');
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(4);
  const [seatingArea, setSeatingArea] = useState<'main_dining' | 'royal_terrace' | 'private_majlis'>('main_dining');
  const [specialRequests, setSpecialRequests] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !time) return;

    await addReservation({
      customerName: name,
      phone,
      email: email || 'walkin@daralnar.om',
      date,
      time,
      guests: Number(guests),
      seatingArea,
      specialRequests: specialRequests ? `[Staff Created] ${specialRequests}` : '[Staff Walk-in / Phone]'
    });

    addToast('success', language === 'ar' ? 'تم تسجيل الحجز' : 'Booking Logged', 
      language === 'ar' ? `تم تسجيل حجز الضيف ${name}` : `Recorded booking for ${name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#15151b] border border-[#c5a059]/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-[#e8dfc8]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 text-[#9a9181] hover:text-white rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">
            {language === 'ar' ? 'استقبال دار النار' : 'Host Reception'}
          </span>
          <h3 className="font-heading text-2xl font-bold text-white mt-0.5">
            {t.admin.actions.addReservationManual}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                {t.reservation.name} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Guest Name"
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                {t.reservation.phone} *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                {t.reservation.date} *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                {t.reservation.time} *
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b5ab99] mb-1">
                {t.reservation.guests} *
              </label>
              <input
                type="number"
                min="1"
                max="30"
                required
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 2)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {t.reservation.seating}
            </label>
            <select
              value={seatingArea}
              onChange={(e) => setSeatingArea(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            >
              <option value="main_dining">{t.reservation.seatingOptions.main_dining}</option>
              <option value="royal_terrace">{t.reservation.seatingOptions.royal_terrace}</option>
              <option value="private_majlis">{t.reservation.seatingOptions.private_majlis}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#b5ab99] mb-1">
              {t.reservation.specialRequests}
            </label>
            <input
              type="text"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Walk-in seated at Table 4 or VIP phoned in"
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f0f12] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs text-[#8e8574] hover:text-white"
            >
              {t.admin.actions.close}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#c5a059] text-black hover:bg-[#d8b56f]"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ar' ? 'تأكيد وحفظ الحجز' : 'Record Booking'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
