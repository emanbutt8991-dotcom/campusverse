import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, CalendarClock, CheckCircle2, MapPin, Plus, RotateCcw, Search, Users } from 'lucide-react';
import { useUniversity } from '../hooks/useUniversity';
import { useDemoData } from '../hooks/useDemoData';
import { useToast } from '../context/ToastContext';
import type { MeetingFormat, StudyGroup } from '../types/content';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { SelectField, TextArea, TextField } from '../components/common/Field';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Avatar } from '../components/common/Avatar';
import { StudyGroupCard } from '../components/cards/StudyGroupCard';
import { compact } from '../utils/filters';

type FormatFilter = 'All' | MeetingFormat;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function VerseStudy() {
  const u = useUniversity();
  const { groups, isGroupRequested, requestJoin, createGroup } = useDemoData();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const resultsRef = useRef<HTMLHeadingElement>(null);

  const [course, setCourse] = useState(params.get('course') ?? '');
  const [format, setFormat] = useState<FormatFilter>('All');
  const [details, setDetails] = useState<StudyGroup | null>(() => groups.find((g) => g.id === params.get('group')) ?? null);
  const [confirm, setConfirm] = useState<StudyGroup | null>(null);
  const [justJoined, setJustJoined] = useState<StudyGroup | null>(null);
  const [createOpen, setCreateOpen] = useState(params.get('create') === '1');

  useEffect(() => {
    if (params.get('create') || params.get('group')) {
      const next = new URLSearchParams(params);
      next.delete('create');
      next.delete('group');
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const courses = useMemo(() => [...new Set([...u.sampleCourses, ...groups.map((g) => g.course)])], [u.sampleCourses, groups]);

  const results = useMemo(
    () =>
      groups.filter((g) => {
        const q = compact(course);
        const okCourse = !q || compact(g.course).includes(q) || compact(g.name).includes(q);
        return okCourse && (format === 'All' || g.format === format);
      }),
    [groups, course, format],
  );

  const reset = () => {
    setCourse('');
    setFormat('All');
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    resultsRef.current?.focus();
  };

  const doJoin = (g: StudyGroup) => {
    requestJoin(g);
    setConfirm(null);
    setJustJoined(g);
    toast({ title: 'Study group join request submitted!', description: `Your request to join ${g.name} (${g.course}) is pending. (Simulated)` });
  };

  return (
    <div>
      <PageHeader
        icon={<BookOpen size={24} aria-hidden />}
        eyebrow={`${u.shortName} · Academics`}
        title="VerseStudy"
        subtitle="Find a study group for your course"
        action={
          <Button variant="highlight" size="lg" icon={<Plus size={18} aria-hidden />} onClick={() => setCreateOpen(true)}>
            Create Group
          </Button>
        }
      />

      <form onSubmit={onSearch} className="mb-6 rounded-3xl border border-uni-border bg-white p-4 shadow-card" role="search" aria-label="Search study groups">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
          <TextField label="Course code" placeholder={`e.g. ${u.sampleCourses[0]}`} value={course} onChange={(e) => setCourse(e.target.value)} list="course-codes" autoComplete="off" />
          <datalist id="course-codes">
            {courses.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <fieldset>
            <legend className="mb-1.5 text-sm font-semibold text-slate-800">Meeting format</legend>
            <div className="inline-flex h-11 rounded-xl bg-slate-100 p-1" role="radiogroup" aria-label="Meeting format">
              {(['All', 'In Person', 'Online'] as FormatFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  role="radio"
                  aria-checked={format === f}
                  onClick={() => setFormat(f)}
                  className={`rounded-lg px-3.5 text-sm font-semibold transition ${format === f ? 'bg-white text-uni-ink shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </fieldset>
          <Button type="submit" size="lg" icon={<Search size={18} aria-hidden />}>
            Search
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Your courses:</span>
          {u.sampleCourses.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCourse(c)}
              aria-pressed={compact(course) === compact(c)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${compact(course) === compact(c) ? 'bg-uni-primary text-uni-onprimary' : 'bg-uni-soft text-uni-ink hover:brightness-95'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </form>

      <section aria-labelledby="groups-h">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 id="groups-h" ref={resultsRef} tabIndex={-1} className="font-display text-xl font-bold text-slate-900 focus:outline-none" aria-live="polite">
            {course ? 'Matching Study Groups' : 'All Study Groups'} ({results.length})
          </h2>
          {(course || format !== 'All') && (
            <Button variant="ghost" size="sm" icon={<RotateCcw size={15} aria-hidden />} onClick={reset}>
              Clear filters
            </Button>
          )}
        </div>

        {justJoined && isGroupRequested(justJoined.id) && (
          <div className="mb-4 flex animate-fadeUp items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900" role="status">
            <CheckCircle2 className="mt-0.5 shrink-0" size={20} aria-hidden />
            <div>
              <p className="font-semibold">Study group join request submitted!</p>
              <p className="text-sm">
                Request Submitted to <strong>{justJoined.name}</strong> ({justJoined.course}). Status: <strong>Request Pending</strong>. It's now in your Upcoming Activity.
              </p>
            </div>
          </div>
        )}

        {results.length === 0 ? (
          <EmptyState
            title="No study groups found"
            description={`No ${format !== 'All' ? format.toLowerCase() + ' ' : ''}groups match “${course}” at ${u.shortName}. Check the course code or start your own group.`}
            action={
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="secondary" onClick={reset} icon={<RotateCcw size={16} aria-hidden />}>Clear filters</Button>
                <Button onClick={() => setCreateOpen(true)} icon={<Plus size={16} aria-hidden />}>Create a group</Button>
              </div>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((g) => (
              <StudyGroupCard key={g.id} group={g} requested={isGroupRequested(g.id)} onDetails={() => setDetails(g)} onJoin={() => setConfirm(g)} />
            ))}
          </div>
        )}
      </section>

      <Modal
        open={!!details}
        onClose={() => setDetails(null)}
        title={details?.name ?? ''}
        description={details ? `${details.course} · Study group` : ''}
        icon={<BookOpen size={20} />}
        footer={
          details && (
            <>
              <Button variant="secondary" onClick={() => setDetails(null)}>Close</Button>
              {isGroupRequested(details.id) ? (
                <Button variant="success" disabled>Request Pending</Button>
              ) : details.members >= details.max ? (
                <Button disabled variant="secondary">Group Full</Button>
              ) : (
                <Button onClick={() => setConfirm(details)} disabled={details.userCreated}>Request to Join</Button>
              )}
            </>
          )
        }
      >
        {details && (
          <div className="space-y-4">
            {isGroupRequested(details.id) && (
              <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800" role="status">
                <CheckCircle2 size={18} aria-hidden /> Request Submitted — pending organizer approval (simulated)
              </p>
            )}
            <p className="text-slate-700">{details.description}</p>
            <dl className="grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl border border-slate-100 p-3">
                <dt className="flex items-center gap-1 text-xs text-slate-500"><CalendarClock size={13} aria-hidden /> When</dt>
                <dd className="font-semibold text-slate-900">{details.day}s, {details.time}</dd>
              </div>
              <div className="rounded-xl border border-slate-100 p-3">
                <dt className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={13} aria-hidden /> Where</dt>
                <dd className="font-semibold text-slate-900">{details.location}</dd>
              </div>
              <div className="rounded-xl border border-slate-100 p-3">
                <dt className="flex items-center gap-1 text-xs text-slate-500"><Users size={13} aria-hidden /> Members</dt>
                <dd className="font-semibold text-slate-900">{details.members} / {details.max}{details.members >= details.max ? ' · Full' : ` · ${details.max - details.members} spots left`}</dd>
              </div>
            </dl>
            <div className="flex items-center gap-3 rounded-2xl bg-uni-soft p-3">
              <Avatar name={details.organizer} size={40} />
              <div>
                <p className="text-sm font-semibold text-slate-900">Organized by {details.organizer}</p>
                <p className="text-xs text-slate-600">Demo student profile</p>
              </div>
            </div>
            <div className="flex -space-x-2" aria-label={`${details.members} members`}>
              {Array.from({ length: Math.min(details.members, 6) }).map((_, i) => (
                <Avatar key={i} name={`${details.course} member ${i + 1}`} size={32} ring />
              ))}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!confirm}
        title="Request to join this group?"
        description={confirm ? `${confirm.course} · ${confirm.name}` : ''}
        confirmLabel="Send join request"
        icon={<BookOpen size={20} />}
        onCancel={() => setConfirm(null)}
        onConfirm={() => confirm && doJoin(confirm)}
      >
        {confirm && (
          <div className="space-y-1 rounded-2xl bg-uni-soft p-4 text-sm text-slate-800">
            <p><strong>Meets:</strong> {confirm.day}s at {confirm.time}</p>
            <p><strong>Location:</strong> {confirm.location}</p>
            <p><strong>Spots left:</strong> {confirm.max - confirm.members}</p>
          </div>
        )}
      </ConfirmDialog>

      <CreateGroupModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        defaultCourse={course || u.sampleCourses[0]}
        locations={u.campusLocations}
        onSubmit={(g) => {
          createGroup(g);
          setCreateOpen(false);
          setCourse(g.course);
          setFormat('All');
          toast({ title: 'Study group created!', description: `${g.name} for ${g.course} is now listed (demo).` });
        }}
      />
    </div>
  );
}

function CreateGroupModal({
  open,
  onClose,
  onSubmit,
  defaultCourse,
  locations,
}: {
  open: boolean;
  onClose: () => void;
  defaultCourse: string;
  locations: string[];
  onSubmit: (g: Omit<StudyGroup, 'id' | 'members' | 'organizer' | 'userCreated'>) => void;
}) {
  const blank = { course: defaultCourse, name: '', description: '', day: 'Monday', time: '18:00', format: 'In Person' as MeetingFormat, location: locations[1] ?? locations[0], max: '6' };
  const [f, setF] = useState(blank);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (open) {
      setF(blank);
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (f.course.trim().length < 3) err.course = 'Enter a course code, e.g. ' + defaultCourse;
    if (f.name.trim().length < 3) err.name = 'Give your group a name (at least 3 characters).';
    if (f.description.trim().length < 10) err.description = 'Add a short description (at least 10 characters).';
    if (!f.time) err.time = 'Choose a meeting time.';
    if (f.format === 'In Person' && !f.location.trim()) err.location = 'Enter where you will meet.';
    const max = Number(f.max);
    if (!Number.isInteger(max) || max < 2 || max > 30) err.max = 'Group size must be between 2 and 30.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const [h, m] = f.time.split(':').map(Number);
    const time = `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
    onSubmit({
      course: f.course.trim().toUpperCase(),
      name: f.name.trim(),
      description: f.description.trim(),
      day: f.day,
      time,
      format: f.format,
      location: f.format === 'Online' ? f.location.trim() || 'Online (Video call)' : f.location.trim(),
      max,
    });
  };
  return (
    <Modal open={open} onClose={onClose} title="Create a study group" description="Start a group for your course. It's saved on this device only." icon={<BookOpen size={20} />}>
      <form onSubmit={submit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Course code" value={f.course} onChange={set('course')} error={errors.course} data-autofocus />
          <TextField label="Group name" placeholder="e.g. Final Exam Squad" value={f.name} onChange={set('name')} error={errors.name} />
        </div>
        <TextArea label="Description" placeholder="What will you cover? Who should join?" value={f.description} onChange={set('description')} error={errors.description} />
        <div className="grid gap-4 sm:grid-cols-3">
          <SelectField label="Meeting day" value={f.day} onChange={set('day')}>
            {DAYS.map((d) => <option key={d}>{d}</option>)}
          </SelectField>
          <TextField label="Meeting time" type="time" value={f.time} onChange={set('time')} error={errors.time} />
          <TextField label="Maximum members" type="number" min={2} max={30} value={f.max} onChange={set('max')} error={errors.max} />
        </div>
        <SelectField label="Format" value={f.format} onChange={(e) => setF((s) => ({ ...s, format: e.target.value as MeetingFormat, location: e.target.value === 'Online' ? 'Online (Video call)' : locations[1] ?? '' }))}>
          <option>In Person</option>
          <option>Online</option>
        </SelectField>
        <TextField label={f.format === 'Online' ? 'Online label' : 'Meeting location'} value={f.location} onChange={set('location')} error={errors.location} list="study-locations" />
        <datalist id="study-locations">
          {locations.map((l) => <option key={l} value={l} />)}
        </datalist>
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Create group</Button>
        </div>
      </form>
    </Modal>
  );
}
