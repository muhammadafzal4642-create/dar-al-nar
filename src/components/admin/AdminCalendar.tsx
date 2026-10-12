import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Reservation, ReservationStatus } from '../../types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Users, MapPin } from 'lucide-react';

interface AdminCalendarProps {
  onSelectReservation: (res: Reservation) => void;
}

export const AdminCalendar: React.FC<AdminCalendarProps> = ({ onSelectReservation }) => {
  const { reservations, language, t } = useRestaurant();
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('week');
  const [currentDateOffset, setCurrentDateOffset] = useState(0); // in days/weeks

  // Reference base date
  const baseDate = new Date('2026-10-07T00:00:00');
  const activeDate = new Date(baseDate);
  activeDate.setDate(activeDate.getDate() + currentDateOffset);
  const activeDateStr = activeDate.toISOString().split('T')[0];

  const statusStyles: Record<ReservationStatus, { bg: string; text: string; border: string }> = {
    pending: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/40' },
    confirmed: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/40' },
    cancelled: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/40' },
    completed: { bg: 'bg-sky-500/15', text: 'text-sky-300', border: 'border-sky-500/40' }
  };

  // Generate 7 days for week view
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(activeDate);
    d.setDate(d.getDate() - 3 + i);
    return {
      dateObj: d,
      dateStr: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString(language === 'ar' ? 'ar-OM' : 'en-US', { weekday: 'short' }),
      dayNumber: d.getDate()
    };
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Calendar Header: View Switcher (Day/Week/Month) & Date Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#141419] border border-white/5">
        
        {/* Navigation & Current Range */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setCurrentDateOffset(prev => prev - (calendarView === 'day' ? 1 : (calendarView === 'week' ? 7 : 30)))}
              className="p-1.5 rounded-lg text-[#9a9181] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title={t.admin.calendar.prev}
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              onClick={() => setCurrentDateOffset(0)}
              className="px-3 py-1 rounded-lg text-xs font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              {t.admin.calendar.today}
            </button>
            <button
              onClick={() => setCurrentDateOffset(prev => prev + (calendarView === 'day' ? 1 : (calendarView === 'week' ? 7 : 30)))}
              className="p-1.5 rounded-lg text-[#9a9181] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title={t.admin.calendar.next}
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#c5a059]" />
            <span>
              {activeDate.toLocaleDateString(language === 'ar' ? 'ar-OM' : 'en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </h3>
        </div>

        {/* Legend & View Switcher */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Status Color Legend */}
          <div className="hidden lg:flex items-center gap-3 text-[11px] text-[#8e8574]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>{t.admin.status.confirmed}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>{t.admin.status.pending}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span>{t.admin.status.cancelled}</span>
            </div>
          </div>

          {/* Day / Week / Month Segmented control */}
          <div className="flex items-center gap-1 p-1 bg-black/40 border border-white/10 rounded-xl">
            {(['day', 'week', 'month'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setCalendarView(view)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  calendarView === view
                    ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                    : 'text-[#9c9383] hover:text-white'
                }`}
              >
                {view === 'day' ? t.admin.calendar.viewDay : (view === 'week' ? t.admin.calendar.viewWeek : t.admin.calendar.viewMonth)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Views */}
      {calendarView === 'week' && (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {weekDays.map((day) => {
            const dayReservations = reservations.filter(r => r.date === day.dateStr);
            const isToday = day.dateStr === '2026-10-07';

            return (
              <div
                key={day.dateStr}
                className={`rounded-2xl p-4 flex flex-col min-h-[460px] border transition-all ${
                  isToday
                    ? 'bg-[#181822] border-[#c5a059]/40 shadow-xl'
                    : 'bg-[#131317] border-white/5'
                }`}
              >
                {/* Day Header */}
                <div className="pb-3 border-b border-white/5 mb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8e8574] block">
                      {day.dayName}
                    </span>
                    <span className={`text-lg font-bold font-heading ${isToday ? 'text-[#c5a059]' : 'text-white'}`}>
                      {day.dayNumber}
                    </span>
                  </div>
                  {isToday && (
                    <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#c5a059]">
                      {language === 'ar' ? 'اليوم' : 'Today'}
                    </span>
                  )}
                </div>

                {/* Day Bookings Stack */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {dayReservations.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center p-4">
                      <span className="text-[11px] text-[#5c564c] italic">
                        {language === 'ar' ? 'لا حجوزات' : 'No bookings'}
                      </span>
                    </div>
                  ) : (
                    dayReservations.map((res) => {
                      const style = statusStyles[res.status];
                      return (
                        <div
                          key={res.id}
                          onClick={() => onSelectReservation(res)}
                          className={`p-2.5 rounded-xl border ${style.bg} ${style.border} hover:scale-[1.02] transition-transform cursor-pointer shadow-sm`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className="font-bold text-white flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#c5a059]" />
                              {res.time}
                            </span>
                            <span className="text-[#a29a8a]">{res.guests}p</span>
                          </div>

                          <p className="text-xs font-semibold text-white truncate">
                            {res.customerName}
                          </p>

                          <div className="flex items-center justify-between mt-1 text-[10px]">
                            <span className={`font-medium ${style.text}`}>
                              {t.admin.status[res.status]}
                            </span>
                            {res.tableNumber && (
                              <span className="text-[#8e8574] font-mono">
                                {res.tableNumber}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Day Timeline View */}
      {calendarView === 'day' && (
        <div className="bg-[#141419] border border-white/10 rounded-2xl p-6">
          <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h3 className="font-heading text-xl font-bold text-white">
                {activeDate.toLocaleDateString(language === 'ar' ? 'ar-OM' : 'en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </h3>
              <p className="text-xs text-[#8e8574]">
                {reservations.filter(r => r.date === activeDateStr).length} {language === 'ar' ? 'حجوزات مجدولة' : 'scheduled reservations'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {reservations.filter(r => r.date === activeDateStr).length === 0 ? (
              <div className="py-12 text-center text-xs text-[#8e8574]">
                {t.admin.calendar.noBookingsOnDay}
              </div>
            ) : (
              reservations
                .filter(r => r.date === activeDateStr)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((res) => {
                  const style = statusStyles[res.status];
                  return (
                    <div
                      key={res.id}
                      onClick={() => onSelectReservation(res)}
                      className={`p-4 rounded-xl border ${style.bg} ${style.border} flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center font-mono pr-4 rtl:pr-0 rtl:pl-4 border-r rtl:border-r-0 rtl:border-l border-white/10">
                          <span className="text-base font-bold text-white block">{res.time}</span>
                          <span className="text-[10px] text-[#8e8574]">{res.guests} Guests</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{res.customerName}</h4>
                          <p className="text-xs text-[#a29a8a]">{res.phone} · Ref: {res.referenceNo}</p>
                          {res.specialRequests && (
                            <p className="text-xs text-amber-200/80 italic mt-0.5">"{res.specialRequests}"</p>
                          )}
                        </div>
                      </div>

                      <div className="text-right rtl:text-left">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text} border ${style.border}`}>
                          {t.admin.status[res.status]}
                        </span>
                        {res.tableNumber && (
                          <span className="block text-[11px] text-[#8e8574] mt-1 font-mono">
                            Table: {res.tableNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      )}

      {/* Month Grid Overview View */}
      {calendarView === 'month' && (
        <div className="bg-[#141419] border border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#8e8574] mb-3">
            {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => {
              const dayNum = i + 1;
              const dateStr = `2026-10-${dayNum < 10 ? '0' + dayNum : dayNum}`;
              const count = reservations.filter(r => r.date === dateStr).length;

              return (
                <div
                  key={dayNum}
                  onClick={() => {
                    setCurrentDateOffset(dayNum - 7);
                    setCalendarView('day');
                  }}
                  className={`min-h-[70px] p-2 rounded-xl border border-white/5 hover:border-[#c5a059]/40 bg-black/20 hover:bg-[#1a1a24] transition-all cursor-pointer flex flex-col justify-between ${
                    dayNum === 7 ? 'border-[#c5a059] bg-[#c5a059]/10' : ''
                  }`}
                >
                  <span className={`text-xs font-bold ${dayNum === 7 ? 'text-[#c5a059]' : 'text-white'}`}>
                    {dayNum}
                  </span>
                  {count > 0 && (
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded text-center">
                      {count} bookings
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
