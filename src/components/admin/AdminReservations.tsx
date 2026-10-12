import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Reservation, ReservationStatus } from '../../types';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  Phone,
  Trash2
} from 'lucide-react';

interface AdminReservationsProps {
  onSelectReservation: (res: Reservation) => void;
  onOpenManualBooking: () => void;
}

export const AdminReservations: React.FC<AdminReservationsProps> = ({ 
  onSelectReservation, 
  onOpenManualBooking 
}) => {
  const { 
    reservations, 
    updateReservationStatus, 
    deleteReservation, 
    language, 
    t 
  } = useRestaurant();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'all'>('all');

  const filteredReservations = reservations.filter((res) => {
    // Status filter
    if (statusFilter !== 'all' && res.status !== statusFilter) return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = res.customerName.toLowerCase().includes(q);
      const matchPhone = res.phone.includes(q);
      const matchRef = res.referenceNo.toLowerCase().includes(q);
      return matchName || matchPhone || matchRef;
    }

    return true;
  });

  const statusStyles: Record<ReservationStatus, { bg: string; text: string; border: string }> = {
    pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    confirmed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    cancelled: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
    completed: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Controls: Search, Status Filters, Add Button */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8a8171] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.admin.actions.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl bg-[#141419] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a059]"
          />
        </div>

        {/* Filter Segmented Control & Manual Booking */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#141419] border border-white/10 rounded-xl">
            {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                    : 'text-[#9c9383] hover:text-white'
                }`}
              >
                {st === 'all' ? t.admin.actions.all : t.admin.status[st]}
              </button>
            ))}
          </div>

          {/* New Booking Button */}
          <button
            onClick={onOpenManualBooking}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#c5a059] hover:bg-[#d8b56f] text-black transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t.admin.actions.addReservationManual}</span>
          </button>
        </div>
      </div>

      {/* Reservations Table Container */}
      <div className="bg-[#141419] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-[#8e8575] uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4 sm:px-6 font-semibold">Reservation ID</th>
                <th className="py-4 px-4 font-semibold">Customer</th>
                <th className="py-4 px-4 font-semibold">Phone</th>
                <th className="py-4 px-4 font-semibold">Date & Time</th>
                <th className="py-4 px-4 font-semibold text-center">Guests</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-right rtl:text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#d8cfbe]">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#8e8574]">
                    {language === 'ar' ? 'لا توجد حجوزات مطابقة للبحث أو التصفية.' : 'No reservations match your search or filter.'}
                  </td>
                </tr>
              ) : (
                filteredReservations.map((res) => {
                  const style = statusStyles[res.status];
                  return (
                    <tr 
                      key={res.id} 
                      className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                      onClick={() => onSelectReservation(res)}
                    >
                      {/* ID */}
                      <td className="py-4 px-4 sm:px-6 font-mono font-semibold text-[#c5a059]">
                        {res.referenceNo}
                        {res.tableNumber && (
                          <span className="block text-[10px] text-[#8e8574] font-normal">
                            Table: {res.tableNumber}
                          </span>
                        )}
                      </td>

                      {/* Customer */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-white block text-sm">
                          {res.customerName}
                        </span>
                        {res.specialRequests && (
                          <span className="text-[11px] text-amber-200/70 italic line-clamp-1">
                            "{res.specialRequests}"
                          </span>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-4 font-mono text-[#a29a8a]">
                        {res.phone}
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-4">
                        <span className="text-white block font-medium">{res.date}</span>
                        <span className="text-[11px] text-[#8e8574]">{res.time}</span>
                      </td>

                      {/* Guests */}
                      <td className="py-4 px-4 text-center font-bold text-white">
                        {res.guests}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${style.bg} ${style.text} ${style.border}`}>
                          {t.admin.status[res.status]}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right rtl:text-left" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end rtl:justify-start gap-1.5">
                          {/* Quick Confirm */}
                          {res.status === 'pending' && (
                            <button
                              onClick={() => updateReservationStatus(res.id, 'confirmed')}
                              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                              title={t.admin.actions.confirm}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Quick Cancel */}
                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => updateReservationStatus(res.id, 'cancelled')}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                              title={t.admin.actions.cancel}
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Inspect Details */}
                          <button
                            onClick={() => onSelectReservation(res)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                            title={t.admin.actions.viewDetails}
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deleteReservation(res.id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-900/30 text-[#8e8574] hover:text-rose-400 transition-colors"
                            title={t.admin.actions.delete}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="py-3 px-6 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8e8574]">
          <span>
            {language === 'ar' ? 'عرض' : 'Showing'} {filteredReservations.length} {language === 'ar' ? 'من أصل' : 'of'} {reservations.length} {language === 'ar' ? 'حجز' : 'reservations'}
          </span>
          <span className="font-mono">
            {language === 'ar' ? 'نظام دار النار السحابي' : 'Dar Al Nar Host Diary System'}
          </span>
        </div>
      </div>

    </div>
  );
};
