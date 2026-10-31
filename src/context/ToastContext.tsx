import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

type ToastTone = 'success' | 'info';
interface Toast {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

const ToastContext = createContext<(t: Omit<Toast, 'id' | 'tone'> & { tone?: ToastTone }) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));
  const push = useCallback((t: Omit<Toast, 'id' | 'tone'> & { tone?: ToastTone }) => {
    const id = Date.now() + Math.random();
    setToasts((all) => [...all.slice(-2), { ...t, tone: t.tone ?? 'success', id }]);
    window.setTimeout(() => dismiss(id), 4200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[70] flex flex-col items-center gap-2 px-4 md:bottom-6 md:items-end md:pr-6" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto flex w-full max-w-sm animate-fadeUp items-start gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-lift">
            <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${t.tone === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-uni-soft text-uni-ink'}`}>
              {t.tone === 'success' ? <CheckCircle2 size={18} aria-hidden /> : <Info size={18} aria-hidden />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900">{t.title}</p>
              {t.description && <p className="mt-0.5 text-sm text-slate-600">{t.description}</p>}
            </div>
            <button onClick={() => dismiss(t.id)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Dismiss notification">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
