import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { TOUR_STEPS } from '../../config/tourSteps';
import { Button } from '../common/Button';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PAD = 6; // spotlight padding around the target
const GAP = 12; // distance between spotlight and tooltip
const EDGE = 12; // minimum distance from viewport edges
const MAX_W = 300;

/** First visible element for a tour target (desktop nav vs. phone tab bar). */
function findTarget(key: string): HTMLElement | null {
  const els = document.querySelectorAll<HTMLElement>(`[data-tour="${key}"]`);
  for (const el of Array.from(els)) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) return el;
  }
  return null;
}

const sameBox = (a: Box | null, b: Box | null) =>
  a === b || (!!a && !!b && a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height);

/** Lightweight spotlight walkthrough. Esc exits, ← / → step through. */
export function GuidedTour({ open, onClose }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState<Box | null>(null);
  const [tipH, setTipH] = useState(160);
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  const tipRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const bodyId = useId();

  const step = TOUR_STEPS[index];
  const last = index === TOUR_STEPS.length - 1;

  // Reset to the first stop each time the tour opens, and warm the lazy page chunks so steps feel instant.
  useEffect(() => {
    if (!open) return;
    setIndex(0);
    void Promise.allSettled([
      import('../../pages/VerseMeals'),
      import('../../pages/VerseConnect'),
      import('../../pages/VerseRoom'),
      import('../../pages/Messages'),
    ]);
  }, [open]);

  // Navigate to the page for this stop.
  useEffect(() => {
    if (open && step && pathname !== step.route) navigate(step.route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  // Track the target's position (handles resize, scroll, route changes and lazy-loaded pages).
  useEffect(() => {
    if (!open || !step) return;
    const measure = () => {
      setVp((v) => (v.w === window.innerWidth && v.h === window.innerHeight ? v : { w: window.innerWidth, h: window.innerHeight }));
      const el = findTarget(step.target);
      const r = el?.getBoundingClientRect();
      const next = r ? { top: r.top - PAD, left: r.left - PAD, width: r.width + PAD * 2, height: r.height + PAD * 2 } : null;
      setBox((prev) => (sameBox(prev, next) ? prev : next));
    };
    measure();
    const id = window.setInterval(measure, 200);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.clearInterval(id);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [open, step]);

  useLayoutEffect(() => {
    if (tipRef.current) setTipH(tipRef.current.offsetHeight);
  });

  const next = useCallback(() => (last ? onClose() : setIndex((i) => i + 1)), [last, onClose]);
  const back = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  // Keyboard: Esc exits, arrows move, Tab stays inside the tooltip.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') back();
      else if (e.key === 'Tab' && tipRef.current) {
        const els = Array.from(tipRef.current.querySelectorAll<HTMLElement>('button:not([disabled])'));
        if (!els.length) return;
        const [f, l] = [els[0], els[els.length - 1]];
        if (!tipRef.current.contains(document.activeElement)) {
          e.preventDefault();
          f.focus();
        } else if (e.shiftKey && document.activeElement === f) {
          e.preventDefault();
          l.focus();
        } else if (!e.shiftKey && document.activeElement === l) {
          e.preventDefault();
          f.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, next, back, onClose]);

  // Move focus to the main action on every step.
  useEffect(() => {
    if (open) primaryRef.current?.focus({ preventScroll: true });
  }, [open, index]);

  if (!open || !step) return null;

  // Tooltip placement: below the target when it fits, otherwise above; centred if the target isn't on screen.
  const w = Math.min(MAX_W, vp.w - EDGE * 2);
  let top: number;
  let left: number;
  let arrow: { side: 'top' | 'bottom'; x: number } | null = null;
  if (box) {
    const cx = box.left + box.width / 2;
    left = Math.min(Math.max(cx - w / 2, EDGE), vp.w - w - EDGE);
    const below = box.top + box.height + GAP;
    if (below + tipH <= vp.h - EDGE || box.top - GAP - tipH < EDGE) {
      top = below;
      arrow = { side: 'top', x: Math.min(Math.max(cx - left, 18), w - 18) };
    } else {
      top = box.top - GAP - tipH;
      arrow = { side: 'bottom', x: Math.min(Math.max(cx - left, 18), w - 18) };
    }
  } else {
    left = (vp.w - w) / 2;
    top = Math.max(EDGE, (vp.h - tipH) / 2);
  }

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      {/* Click shield: keeps the page still while touring; dims fully only if there's no spotlight. */}
      <div className={`absolute inset-0 ${box ? '' : 'bg-slate-900/45'}`} aria-hidden />
      {box && (
        <div
          className="pointer-events-none absolute rounded-2xl ring-2 ring-uni-highlight transition-all duration-300 ease-out"
          style={{ top: box.top, left: box.left, width: box.width, height: box.height, boxShadow: '0 0 0 9999px rgb(15 23 42 / 0.45)' }}
          aria-hidden
        />
      )}

      <div
        ref={tipRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        className="absolute animate-pop rounded-2xl border border-uni-border bg-white p-4 shadow-lift"
        style={{ top, left, width: w }}
      >
        {arrow && (
          <span
            className={`absolute h-3 w-3 rotate-45 border-uni-border bg-white ${arrow.side === 'top' ? '-top-1.5 border-l border-t' : '-bottom-1.5 border-b border-r'}`}
            style={{ left: arrow.x - 6 }}
            aria-hidden
          />
        )}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-uni-ink" aria-live="polite">
              Step {index + 1} of {TOUR_STEPS.length}
            </p>
            <h2 id={titleId} className="font-display text-base font-bold text-slate-900">
              {step.title}
            </h2>
          </div>
          <button onClick={onClose} className="-mr-1.5 -mt-1 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800" aria-label="Exit tour">
            <X size={16} />
          </button>
        </div>
        <p id={bodyId} className="mt-1 text-sm leading-relaxed text-slate-600">
          {step.body}
        </p>

        <div className="mt-3 flex items-center gap-1" aria-hidden>
          {TOUR_STEPS.map((s, i) => (
            <span key={s.target} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-uni-primary' : 'w-1.5 bg-uni-border'}`} />
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          {!last && (
            <button onClick={onClose} className="mr-auto rounded-lg px-1 text-sm font-semibold text-slate-500 hover:text-slate-800">
              Skip
            </button>
          )}
          {last && <span className="mr-auto" />}
          {index > 0 && (
            <Button variant="secondary" size="sm" onClick={back} icon={<ArrowLeft size={15} aria-hidden />}>
              Back
            </Button>
          )}
          <Button ref={primaryRef} size="sm" onClick={next}>
            {last ? 'Finish' : 'Next'}
            {last ? <Check size={15} aria-hidden /> : <ArrowRight size={15} aria-hidden />}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
