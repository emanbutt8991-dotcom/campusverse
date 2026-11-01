import { ClipboardList, Compass } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface Props {
  open: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

/** Scenario goals only: deliberately no navigation steps, so participants find their own way. */
const TASKS = [
  {
    service: 'VerseRide',
    title: 'Request a ride',
    scenario: "You're heading off campus this weekend and don't have a car. Find a ride that suits your plans and ask the driver for a seat.",
  },
  {
    service: 'VerseStudy',
    title: 'Join a study group',
    scenario: 'You have an exam coming up in one of your courses. Find a study group for that course and ask to join it.',
  },
];

export function UsabilityInstructions({ open, onClose, onStartTour }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      icon={<ClipboardList size={20} aria-hidden />}
      title="Usability test"
      description="Two short tasks. We're testing the app, not you."
      footer={
        <>
          <Button variant="secondary" onClick={onStartTour} icon={<Compass size={16} aria-hidden />}>
            I'm stuck, take the tour
          </Button>
          <Button onClick={onClose} data-autofocus>
            Got it
          </Button>
        </>
      }
    >
      <ol className="space-y-3">
        {TASKS.map((t, i) => (
          <li key={t.service} className="flex gap-3 rounded-2xl border border-uni-border bg-uni-soft/60 p-3.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-uni-primary text-sm font-bold text-uni-onprimary" aria-hidden>
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900">
                {t.title} <span className="text-xs font-semibold text-uni-ink">· {t.service}</span>
              </p>
              <p className="mt-0.5 text-sm text-slate-600">{t.scenario}</p>
            </div>
          </li>
        ))}
      </ol>
      <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
        <li>• Try each task on your own first, at your own pace.</li>
        <li>• A task is done when the app confirms your request was sent.</li>
        <li>
          • Stuck? Open <strong className="text-slate-800">Help</strong> in the top bar at any time.
        </li>
      </ul>
    </Modal>
  );
}
