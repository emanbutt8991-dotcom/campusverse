import { forwardRef, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { CircleHelp, ClipboardList, Compass } from 'lucide-react';
import { GuidedTour } from './GuidedTour';
import { UsabilityInstructions } from './UsabilityInstructions';

/** Navbar Help button: a small dropdown offering the guided tour and the usability-test brief. */
export function HelpMenu() {
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(false);
  const [brief, setBrief] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((refocus = false) => {
    setOpen(false);
    if (refocus) btnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    firstItemRef.current?.focus();
    const onDown = (e: MouseEvent) => wrapRef.current && !wrapRef.current.contains(e.target as Node) && close();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const items = Array.from(wrapRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (!items.length) return;
        e.preventDefault();
        items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const startTour = () => {
    setOpen(false);
    setBrief(false);
    setTour(true);
  };
  const endTour = useCallback(() => {
    setTour(false);
    btnRef.current?.focus();
  }, []);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        ref={btnRef}
        className={`inline-flex h-10 items-center gap-1.5 rounded-xl px-2.5 text-sm font-semibold transition ${open ? 'bg-uni-soft text-uni-ink' : 'text-slate-700 hover:bg-uni-soft hover:text-uni-ink'}`}
        aria-label="Help"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <CircleHelp size={20} aria-hidden />
        <span className="hidden sm:inline lg:hidden xl:inline">Help</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[min(18rem,calc(100vw-1.5rem))] animate-pop overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lift" role="menu" aria-label="Help">
          <p className="border-b border-slate-100 bg-uni-soft/70 px-4 py-2.5 text-xs leading-relaxed text-slate-700">
            <strong className="font-semibold text-uni-ink">Testing?</strong> Try both tasks on your own first. Use the tour only if you get stuck.
          </p>
          <HelpItem
            ref={firstItemRef}
            icon={<Compass size={16} />}
            label="Take a Tour"
            hint="A quick look at each section"
            onClick={startTour}
          />
          <HelpItem
            icon={<ClipboardList size={16} />}
            label="Usability Test Instructions"
            hint="The two tasks to try"
            onClick={() => {
              setOpen(false);
              setBrief(true);
            }}
          />
        </div>
      )}

      <UsabilityInstructions open={brief} onClose={() => setBrief(false)} onStartTour={startTour} />
      <GuidedTour open={tour} onClose={endTour} />
    </div>
  );
}

const HelpItem = forwardRef<HTMLButtonElement, { icon: ReactNode; label: string; hint: string; onClick: () => void }>(function HelpItem(
  { icon, label, hint, onClick },
  ref,
) {
  return (
    <button ref={ref} role="menuitem" onClick={onClick} className="flex w-full items-start gap-3 px-4 py-2.5 text-left hover:bg-uni-soft focus-visible:bg-uni-soft">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-uni-soft text-uni-ink">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-800">{label}</span>
        <span className="block text-xs text-slate-500">{hint}</span>
      </span>
    </button>
  );
});
