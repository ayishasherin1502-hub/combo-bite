import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, AlertTriangle, CheckCircle, Skull } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isCursed = toast.type === 'cursed';
        const isBadge = toast.type === 'badge';
        const isSuccess = toast.type === 'success';

        let borderBg = 'bg-slate-900/95 text-white border-slate-700 shadow-xl';
        if (isCursed) borderBg = 'bg-rose-950/95 text-rose-100 border-rose-600 shadow-rose-900/40 shadow-2xl';
        if (isBadge) borderBg = 'bg-amber-950/95 text-amber-100 border-amber-500 shadow-amber-900/40 shadow-2xl animate-bounce-short';
        if (isSuccess) borderBg = 'bg-emerald-950/95 text-emerald-100 border-emerald-600 shadow-emerald-900/40 shadow-xl';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${borderBg}`}
          >
            <div className="text-2xl select-none shrink-0 pt-0.5">
              {toast.emoji || (isCursed ? '💀' : isBadge ? '🏆' : isSuccess ? '✨' : '💬')}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
                {toast.title}
                {isBadge && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 font-semibold uppercase">Unlocked</span>}
                {isCursed && <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-300 font-semibold uppercase">Cursed</span>}
              </h4>
              <p className="text-xs opacity-90 mt-1 leading-relaxed">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
