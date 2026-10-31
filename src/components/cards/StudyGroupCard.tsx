import { CalendarClock, MapPin, Monitor, Users } from 'lucide-react';
import type { StudyGroup } from '../../types/content';
import { Button } from '../common/Button';

interface Props {
  group: StudyGroup;
  requested: boolean;
  onDetails: () => void;
  onJoin: () => void;
}

export function StudyGroupCard({ group: g, requested, onDetails, onJoin }: Props) {
  const full = g.members >= g.max;
  const [dept, code] = splitCourse(g.course);
  const pct = Math.round((g.members / g.max) * 100);
  return (
    <article className="flex flex-col rounded-3xl border border-uni-border bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift" aria-label={`${g.name}, ${g.course}`}>
      <div className="flex items-start gap-3">
        <div className="grid h-14 min-w-14 place-items-center rounded-2xl bg-uni-primary px-2 text-center text-uni-onprimary">
          <span className="font-display text-sm font-extrabold leading-none">{code}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-uni-ink">{dept} · Study Group</p>
          <h3 className="font-display text-lg font-bold leading-snug text-slate-900">{g.name}</h3>
        </div>
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${g.format === 'Online' ? 'bg-sky-50 text-sky-800' : 'bg-emerald-50 text-emerald-800'}`}>
          {g.format === 'Online' ? <Monitor size={12} aria-hidden /> : <MapPin size={12} aria-hidden />} {g.format}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-slate-600">{g.description}</p>
      <dl className="mt-4 space-y-1.5 text-sm text-slate-700">
        <div className="flex items-center gap-2"><CalendarClock size={15} className="text-slate-400" aria-hidden /><dt className="sr-only">When</dt><dd>{g.day} · {g.time}</dd></div>
        <div className="flex items-center gap-2"><MapPin size={15} className="text-slate-400" aria-hidden /><dt className="sr-only">Where</dt><dd className="truncate">{g.location}</dd></div>
        <div className="flex items-center gap-2"><Users size={15} className="text-slate-400" aria-hidden /><dt className="sr-only">Members</dt><dd>{g.members} / {g.max} members</dd></div>
      </dl>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100" aria-hidden>
        <div className={`h-full rounded-full ${full ? 'bg-rose-400' : 'bg-uni-highlight'}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button variant="secondary" size="sm" onClick={onDetails} aria-label={`Details for ${g.name}`}>Details</Button>
        {requested ? (
          <Button variant="success" size="sm" disabled>Request Pending</Button>
        ) : full ? (
          <Button size="sm" disabled variant="secondary">Group Full</Button>
        ) : (
          <Button size="sm" onClick={onJoin} disabled={g.userCreated} aria-label={`Request to join ${g.name}`}>{g.userCreated ? 'Organizer' : 'Request to Join'}</Button>
        )}
      </div>
    </article>
  );
}

export function splitCourse(course: string): [string, string] {
  const m = course.trim().match(/^([A-Za-z]+)\s*(.*)$/);
  if (!m) return [course, course];
  return [m[1].toUpperCase(), m[2] || m[1]];
}
