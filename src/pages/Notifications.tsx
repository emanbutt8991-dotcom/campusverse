import { Link } from 'react-router-dom';
import { Bell, BookOpen, CalendarDays, Car, Home, MessageSquareText, Sparkles, UtensilsCrossed, type LucideIcon } from 'lucide-react';
import { useDemoData } from '../hooks/useDemoData';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import type { ActivityType } from '../types/content';
import { timeAgo } from '../utils/format';

const ICON: Record<ActivityType, LucideIcon> = { ride: Car, study: BookOpen, meal: UtensilsCrossed, event: CalendarDays, housing: Home, post: MessageSquareText, listing: Sparkles };

export default function Notifications() {
  const { notifications, activity, markAllRead, unreadCount } = useDemoData();
  return (
    <div>
      <PageHeader icon={<Bell size={24} aria-hidden />} title="Notifications & Activity" subtitle="Everything you've done in this demo, in one place" action={<Button variant="highlight" onClick={markAllRead} disabled={!unreadCount}>Mark all read</Button>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-uni-border bg-white p-5 shadow-card" aria-labelledby="n-h">
          <h2 id="n-h" className="font-display text-lg font-bold text-slate-900">Notifications</h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {notifications.map((n) => {
              const Icon = ICON[n.type];
              return (
                <li key={n.id} className="flex gap-3 py-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${n.read ? 'bg-slate-100 text-slate-500' : 'bg-uni-primary text-uni-onprimary'}`}><Icon size={18} aria-hidden /></span>
                  <div>
                    <p className="text-sm text-slate-800">{n.text}</p>
                    <p className="text-xs text-slate-500">{n.createdAt ? timeAgo(Math.round((Date.now() - n.createdAt) / 60000)) : 'Earlier'}{!n.read && ' · New'}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="rounded-3xl border border-uni-border bg-white p-5 shadow-card" aria-labelledby="a-h">
          <h2 id="a-h" className="font-display text-lg font-bold text-slate-900">Upcoming activity</h2>
          <ul className="mt-3 space-y-2">
            {activity.map((a) => {
              const Icon = ICON[a.type];
              return (
                <li key={a.id}>
                  <Link to={a.link} className="flex items-center gap-3 rounded-2xl p-2.5 hover:bg-uni-soft">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-uni-soft text-uni-ink"><Icon size={18} aria-hidden /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-900">{a.title}</span>
                      <span className="block truncate text-xs text-slate-600">{a.subtitle}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">{a.status}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
