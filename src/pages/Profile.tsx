import { useNavigate } from 'react-router-dom';
import { BookOpen, Car, GraduationCap, Info, Palette, Repeat, ShieldAlert, UtensilsCrossed, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { useUniversity } from '../hooks/useUniversity';
import { useDemoData } from '../hooks/useDemoData';
import { Avatar } from '../components/common/Avatar';
import { UniversityIdentity } from '../components/university/UniversityIdentity';
import { ThemeEditor } from '../components/university/ThemeEditor';
import { Button } from '../components/common/Button';

export default function Profile() {
  const u = useUniversity();
  const { activity } = useDemoData();
  const [themeOpen, setThemeOpen] = useState(false);
  const navigate = useNavigate();
  const count = (t: string) => activity.filter((a) => a.type === t && a.createdAt > 0).length;
  const stats = [
    { label: 'Ride requests', value: count('ride'), icon: Car },
    { label: 'Study groups', value: count('study'), icon: BookOpen },
    { label: 'Meal claims', value: count('meal'), icon: UtensilsCrossed },
    { label: 'Event RSVPs', value: count('event'), icon: CalendarDays },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-uni-border bg-white shadow-card">
          <div className="h-28 bg-gradient-to-r from-uni-primary to-uni-accent" />
          <div className="-mt-12 px-6 pb-6">
            <div className="inline-block rounded-full bg-white p-1.5"><Avatar name="Alex Morgan" size={88} /></div>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-slate-900">Alex Morgan</h1>
            <p className="flex items-center gap-1.5 text-slate-700"><GraduationCap size={18} aria-hidden /> Third-Year Student · {u.name}</p>
            <span className="mt-2 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200">Demo Account</span>
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
              <ShieldAlert size={18} className="mt-0.5 shrink-0 text-slate-500" aria-hidden />
              University email verification is not performed in this prototype. In the full product, only verified students could access campus communities.
            </p>
          </div>
        </section>
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Your demo activity">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl border border-uni-border bg-white p-4 shadow-card">
              <s.icon size={20} className="text-uni-ink" aria-hidden />
              <p className="mt-2 font-display text-3xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-sm text-slate-600">{s.label}</p>
            </div>
          ))}
        </section>
        <section className="rounded-3xl border border-uni-border bg-white p-5 shadow-card">
          <h2 className="font-display text-lg font-bold text-slate-900">Settings</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="secondary" icon={<Repeat size={16} aria-hidden />} onClick={() => navigate('/select')}>Switch University</Button>
            {u.isCustom && <Button variant="secondary" icon={<Palette size={16} aria-hidden />} onClick={() => setThemeOpen(true)}>Edit University Theme</Button>}
            <Button variant="secondary" icon={<Info size={16} aria-hidden />} onClick={() => navigate('/about')}>About CampusVerse</Button>
          </div>
        </section>
      </div>
      <UniversityIdentity university={u} />
      {u.isCustom && <ThemeEditor key={String(themeOpen)} open={themeOpen} onClose={() => setThemeOpen(false)} />}
    </div>
  );
}
