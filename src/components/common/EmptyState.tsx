import type { ReactNode } from 'react';
import { SearchX } from 'lucide-react';

export function EmptyState({ title, description, action, icon }: { title: string; description: string; action?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-uni-border bg-white/70 px-6 py-12 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-uni-soft text-uni-ink">{icon ?? <SearchX size={26} aria-hidden />}</span>
      <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-600">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
