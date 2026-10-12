import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Reservation } from '../../types';
import { X, Calendar, Clock, Users, CheckCircle2, MessageSquare, Sparkles, MapPin, Share2 } from 'lucide-react';

export const ReservationModal: React.FC = () => {
  const { 
    isReservationModalOpen, 
    closeReservationModal, 
    selectedDishForModal, 
    setSelectedDishForModal,
    addReservation, 
    settings, 
    language, 
    t 
  } = useRestaurant();

  // Tomorrow's date as default
  const tomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [date, setDate] = useState(tomorrowStr());
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<'main_dining' | 'royal_terrace' | 'private_majlis'>('main_dining');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (selectedDishForModal) {
      const dishName = language === 'ar' ? selectedDishForModal.nameAr : selectedDishForModal.nameEn;
      setSpecialRequests((prev) => 
        prev ? `${prev} · Requesting ${dishName}` : `Specifically looking forward to tasting ${dishName}`
      );
    }
  }, [selectedDishForModal, language]);

  if (!isReservationModalOpen) return null;

  const handleClose = () => {
    setSelectedDishForModal(null);
    setConfirmedReservation(null);
    setSubmissionError('');
    closeReservationModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !date || !time) return;

    setIsSubmitting(true);
    try {
      const newRes = await addReservation({
        customerName: name,
        phone,
        email,
        date,
        time,
        guests: Number(guests),
        seatingArea,
        specialRequests: specialRequests.trim() || undefined
      });
      setConfirmedReservation(newRes);
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'Reservation could not be saved. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '12:30', '13:00', '13:30', '14:00', '14:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141418] border border-[#c5a059]/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl text-[#e8dfc8] max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 text-[#9a9181] hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close reservation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedReservation ? (
          /* Professional Confirmation Screen */
          <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#c5a059] font-medium">
                {language === 'ar' ? 'حجز مسجل في النظام' : 'Confirmed in System'}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                {t.reservation.confirmedTitle}
              </h3>
              <p className="text-sm text-[#b8afa0] max-w-md mx-auto mt-2 leading-relaxed">
                {t.reservation.confirmedMsg}
              </p>
            </div>

            {/* Reference Number Card */}
            <div className="bg-[#1b1b22] border border-[#c5a059]/40 rounded-2xl p-5 max-w-md mx-auto">
              <div className="flex items-center justify-between text-xs text-[#a29a8a] border-b border-white/10 pb-3 mb-3">
                <span>{t.reservation.refNumber}</span>
                <span className="font-mono text-base font-bold text-[#c5a059] tracking-wider">
                  {confirmedReservation.referenceNo}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left rtl:text-right text-xs">
                <div>
                  <span className="text-[#877e6e] block">{t.reservation.name}</span>
                  <span className="font-semibold text-white">{confirmedReservation.customerName}</span>
                </div>
                <div>
                  <span className="text-[#877e6e] block">{t.reservation.guests}</span>
                  <span className="font-semibold text-white">{confirmedReservation.guests} {language === 'ar' ? 'ضيوف' : 'Guests'}</span>
                </div>
                <div>
                  <span className="text-[#877e6e] block">{t.reservation.date}</span>
                  <span className="font-semibold text-white">{confirmedReservation.date}</span>
                </div>
                <div>
                  <span className="text-[#877e6e] block">{t.reservation.time}</span>
                  <span className="font-semibold text-white">{confirmedReservation.time}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#9a9181]">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#c5a059]" />
                  <span>Shatti Al Qurum · Muscat</span>
                </div>
                <span className="text-emerald-400 font-medium">
                  {language === 'ar' ? 'مسجل بالمطعم' : 'Stored in Management System'}
                </span>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/96891234567?text=${encodeURIComponent(
                  `Hello Dar Al Nar, my reservation reference is ${confirmedReservation.referenceNo} for ${confirmedReservation.guests} guests on ${confirmedReservation.date} at ${confirmedReservation.time}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#25D366] hover:bg-[#20ba59] text-black transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.reservation.whatsappConfirm}</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#c5a059] hover:bg-[#d8b56f] text-black transition-colors"
              >
                {t.reservation.closeModal}
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Booking Form */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#c5a059] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DAR AL NAR · دار النار</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {t.reservation.modalTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#a29a8a] mt-1">
                {t.reservation.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Date, Time & Party Size */}
              <div className="p-4 rounded-2xl bg-[#1b1b22] border border-white/5 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">
                  {t.reservation.step1}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Date */}
                  <div>
                    <label className="block text-[11px] font-medium text-[#b2a896] mb-1">
                      {t.reservation.date}
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#8a8171] absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 rounded-xl bg-[#121216] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-[11px] font-medium text-[#b2a896] mb-1">
                      {t.reservation.time}
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-[#8a8171] absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 rounded-xl bg-[#121216] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label className="block text-[11px] font-medium text-[#b2a896] mb-1">
                      {t.reservation.guests}
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-[#8a8171] absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 rounded-xl bg-[#121216] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14].map((g) => (
                          <option key={g} value={g}>
                            {g} {g === 1 ? (language === 'ar' ? 'ضيف واحد' : 'Guest') : (language === 'ar' ? 'ضيوف' : 'Guests')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="block text-[11px] font-medium text-[#b2a896] mb-1.5">
                    {t.reservation.seating}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(['main_dining', 'royal_terrace', 'private_majlis'] as const).map((area) => (
                      <button
                        type="button"
                        key={area}
                        onClick={() => setSeatingArea(area)}
                        className={`p-2.5 rounded-xl border text-left rtl:text-right text-xs transition-all cursor-pointer ${
                          seatingArea === area
                            ? 'bg-[#c5a059]/15 border-[#c5a059] text-white font-medium'
                            : 'bg-[#121216] border-white/5 text-[#a29a8a] hover:text-white'
                        }`}
                      >
                        {t.reservation.seatingOptions[area]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Guest Contact Info */}
              <div className="p-4 rounded-2xl bg-[#1b1b22] border border-white/5 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">
                  {t.reservation.step2}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#b2a896] mb-1">
                      {t.reservation.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'ar' ? 'طارق البوسعيدي' : 'Tariq Al-Busaidi'}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#121216] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#b2a896] mb-1">
                      {t.reservation.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+968 9XXXXXXX"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#121216] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#b2a896] mb-1">
                      {t.reservation.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tariq@oman.om"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#121216] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#b2a896] mb-1">
                    {t.reservation.specialRequests}
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder={t.reservation.specialRequestsPlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-[#121216] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {submissionError && <p className="text-sm text-rose-400" role="alert">{submissionError}</p>}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#c5a059] hover:bg-[#d8b56f] text-black shadow-xl shadow-[#c5a059]/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? t.reservation.submitting : t.reservation.confirmBtn}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
