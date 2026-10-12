import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useRestaurant();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        let borderColor = 'border-emerald-500/30';
        let bgGlow = 'from-emerald-950/40';

        if (toast.type === 'error') {
          icon = <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
          borderColor = 'border-rose-500/30';
          bgGlow = 'from-rose-950/40';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
          borderColor = 'border-amber-500/30';
          bgGlow = 'from-amber-950/40';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-amber-300 shrink-0" />;
          borderColor = 'border-[#c5a059]/40';
          bgGlow = 'from-[#3a2c16]/50';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r ${bgGlow} to-[#16161a] bg-[#16161a] border ${borderColor} shadow-2xl backdrop-blur-md text-[#e8dfc8] transition-all transform animate-in slide-in-from-bottom-3 duration-200`}
          >
            <div className="pt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-wide text-white">{toast.title}</h4>
              <p className="text-xs text-[#b8afa0] mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8e8574] hover:text-white p-1 rounded-md transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
