import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  subtitle: string;
  action?: ReactNode;
  eyebrow?: string;
}

export function PageHeader({ icon, title, subtitle, action, eyebrow }: Props) {
  return (
    <header className="relative mb-6 overflow-hidden rounded-3xl bg-uni-primary px-5 py-6 text-uni-onprimary shadow-card sm:px-8 sm:py-7">
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-[.12]" aria-hidden />
      <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-uni-highlight opacity-30 blur-2xl" aria-hidden />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">{icon}</span>
          <div>
            {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{eyebrow}</p>}
            <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
            <p className="text-sm opacity-90">{subtitle}</p>
          </div>
        </div>
        {action}
      </div>
    </header>
  );
}
