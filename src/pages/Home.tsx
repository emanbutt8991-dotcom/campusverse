import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarDays, Car, ChevronRight, Home as HomeIcon, Info, MessageSquareText, Search, Sparkles, Users, UtensilsCrossed, BedDouble, type LucideIcon } from 'lucide-react';
import { MODULES } from '../config/navigation';
import { useUniversity } from '../hooks/useUniversity';
import { useDemoData } from '../hooks/useDemoData';
import { buildTokens } from '../config/themeTokens';
import { CampusScene } from '../components/university/CampusScene';
import { MascotArt } from '../components/university/MascotArt';
import { UniversityIdentity } from '../components/university/UniversityIdentity';
import { AdSidebar } from '../components/advertisements/SponsoredAd';
import { PostCard } from '../components/cards/PostCard';
import { DateBadge } from '../components/cards/EventCard';
import { searchAll, type SearchResult } from '../utils/filters';
import { formatTime, formatDate } from '../utils/format';
import type { ActivityType } from '../types/content';

const ACTIVITY_ICON: Record<ActivityType, LucideIcon> = { ride: Car, study: BookOpen, meal: UtensilsCrossed, event: CalendarDays, housing: HomeIcon, post: MessageSquareText, listing: Sparkles };
const RESULT_ICON: Record<SearchResult['type'], LucideIcon> = { Ride: Car, 'Study group': BookOpen, Housing: BedDouble, Event: CalendarDays, Meal: UtensilsCrossed, Post: Users };

export default function Home() {
  const u = useUniversity();
  const t = buildTokens(u.colours);
  const navigate = useNavigate();
  const demo = useDemoData();
  const [q, setQ] = useState('');
  const results = useMemo(() => searchAll(q, demo), [q, demo]);
  const grouped = useMemo(() => {
    const map = new Map<SearchResult['type'], SearchResult[]>();
    results.forEach((r) => map.set(r.type, [...(map.get(r.type) ?? []), r]));
    return [...map.entries()];
  }, [results]);

  const counts: Record<string, string> = {
    '/ride': `${demo.rides.filter((r) => r.seats > 0).length} rides available`,
    '/meals': `${demo.meals.length} dishes shared`,
    '/connect': `${demo.events.length} upcoming events`,
    '/room': `${demo.housing.length} listings`,
    '/study': `${demo.groups.length} study groups`,
  };

  return (
    <div className="space-y-6">
      {demo.dataset.isSample && (
        <p className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Info size={18} className="mt-0.5 shrink-0" aria-hidden />
          <span>
            You're viewing <strong>sample content</strong> generated for {u.name}. Locations, courses, listings and colours are placeholders and are not official university information.
          </span>
        </p>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-uni-primary text-uni-onprimary shadow-lift">
        <CampusScene style={u.campusStyle} primary={t.primary} highlight={t.highlight} className="absolute inset-0 h-full w-full opacity-90" label={`Illustrated ${u.shortName} campus banner`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" aria-hidden />
        <div className="relative grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 py-1 pl-1 pr-3 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur">
              <MascotArt kind={u.mascot} primary={t.primary} highlight={t.highlight} monogram={u.monogram} size={26} label="" />
              {u.name} · {u.athleticIdentity}
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Welcome back, Alex!</h1>
            <p className="mt-2 text-lg font-medium text-white/90">{u.welcomeMessage}</p>
            <p className="text-sm text-white/75">Demo Account · Third-Year Student · {u.city}</p>

            {/* Global search */}
            <div className="relative mt-6 max-w-xl">
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (results[0]) navigate(results[0].link);
                }}
                className="flex gap-2 rounded-2xl bg-white p-1.5 shadow-lift"
              >
                <div className="relative flex-1">
                  <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
                  <input
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    aria-label="Search CampusVerse"
                    placeholder="Search rides, courses, housing, events, meals…"
                    className="h-11 w-full rounded-xl bg-transparent pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
                <button type="submit" className="h-11 rounded-xl bg-uni-primary px-5 text-sm font-semibold text-uni-onprimary hover:brightness-110">Search</button>
              </form>
              {q.trim().length >= 2 && (
                <div className="absolute left-0 right-0 z-30 mt-2 max-h-96 animate-pop overflow-y-auto rounded-2xl bg-white p-2 text-slate-900 shadow-lift" role="listbox" aria-label="Search results">
                  <p className="px-3 py-1.5 text-xs font-semibold text-slate-500" aria-live="polite">
                    {results.length} result{results.length === 1 ? '' : 's'} in {u.shortName}
                  </p>
                  {results.length === 0 ? (
                    <p className="px-3 py-4 text-sm text-slate-600">No matches for “{q}”. Try a course code like “{u.sampleCourses[0]}” or a destination.</p>
                  ) : (
                    grouped.map(([type, items]) => {
                      const Icon = RESULT_ICON[type];
                      return (
                        <div key={type} className="py-1">
                          <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-uni-ink">{type}s</p>
                          {items.slice(0, 4).map((r) => (
                            <Link key={r.id} to={r.link} role="option" aria-selected={false} className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-uni-soft">
                              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-uni-soft text-uni-ink"><Icon size={17} aria-hidden /></span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold">{r.title}</span>
                                <span className="block truncate text-xs text-slate-600">{r.subtitle}</span>
                              </span>
                              <ChevronRight size={16} className="text-slate-400" aria-hidden />
                            </Link>
                          ))}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-white/80">Your courses:</span>
              {u.sampleCourses.map((c) => (
                <Link key={c} to={`/study?course=${encodeURIComponent(c)}`} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white hover:text-slate-900">
                  {c}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden items-end justify-end lg:flex">
            <div className="rounded-full bg-white/10 p-3 ring-1 ring-white/25 backdrop-blur">
              <MascotArt kind={u.mascot} primary={t.primary} highlight={t.highlight} monogram={u.monogram} size={150} label={`${u.athleticIdentity} inspired graphic`} />
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section aria-labelledby="services-h">
        <h2 id="services-h" className="sr-only">CampusVerse services</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
          {MODULES.map((m, i) => (
            <Link
              key={m.to}
              to={m.to}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-uni-border bg-white p-4 shadow-card transition hover:-translate-y-1 hover:shadow-lift sm:p-5 ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-uni-soft transition group-hover:scale-125" aria-hidden />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-uni-primary text-uni-onprimary shadow-sm">
                <m.icon size={22} aria-hidden />
              </span>
              <h3 className="relative mt-4 font-display text-lg font-bold text-slate-900">{m.label}</h3>
              <p className="relative text-sm font-semibold text-uni-ink">{m.tagline}</p>
              <p className="relative mt-1 hidden text-sm text-slate-600 sm:block">{m.description}</p>
              <p className="relative mt-2 text-xs text-slate-500">{counts[m.to]}</p>
              <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-uni-ink">
                Open <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="grid gap-6 xl:grid-cols-2">
            {/* Upcoming activity */}
            <section className="rounded-3xl border border-uni-border bg-white p-5 shadow-card" aria-labelledby="activity-h">
              <div className="flex items-center justify-between">
                <h2 id="activity-h" className="font-display text-lg font-bold text-slate-900">Your upcoming activity</h2>
                <Link to="/notifications" className="text-sm font-semibold text-uni-ink hover:underline">See all</Link>
              </div>
              <ul className="mt-4 space-y-2" aria-live="polite">
                {demo.activity.slice(0, 6).map((a) => {
                  const Icon = ACTIVITY_ICON[a.type];
                  const pending = /pending|requested/i.test(a.status);
                  return (
                    <li key={a.id}>
                      <Link to={a.link} className="flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-uni-soft">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-uni-soft text-uni-ink"><Icon size={18} aria-hidden /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-slate-900">{a.title}</span>
                          <span className="block truncate text-xs text-slate-600">{a.subtitle}</span>
                        </span>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${pending ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'}`}>{a.status}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Campus feed */}
            <section className="rounded-3xl border border-uni-border bg-white p-5 shadow-card" aria-labelledby="feed-h">
              <div className="flex items-center justify-between">
                <h2 id="feed-h" className="font-display text-lg font-bold text-slate-900">Latest posts from {u.shortName}</h2>
                <Link to="/connect" className="text-sm font-semibold text-uni-ink hover:underline">Open feed</Link>
              </div>
              <div className="mt-4 space-y-3">
                {demo.posts.slice(0, 3).map((p) => (
                  <Link key={p.id} to="/connect" className="block rounded-3xl transition hover:-translate-y-0.5 [&>article]:border-slate-100 [&>article]:shadow-none">
                    <PostCard post={p} liked={false} onLike={() => {}} onComment={() => {}} onShare={() => {}} compact />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-6 lg:col-span-4" aria-label="Campus sidebar">
          <UniversityIdentity university={u} />
          <section className="rounded-3xl border border-uni-border bg-white p-5 shadow-card" aria-labelledby="events-h">
            <h2 id="events-h" className="font-display text-lg font-bold text-slate-900">Upcoming campus events</h2>
            <ul className="mt-3 space-y-3">
              {demo.events.slice(0, 3).map((e) => (
                <li key={e.id}>
                  <Link to={`/connect?event=${e.id}`} className="flex items-center gap-3 rounded-2xl p-1.5 hover:bg-uni-soft">
                    <DateBadge iso={e.date} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-900">{e.title}</span>
                      <span className="block truncate text-xs text-slate-600">{formatDate(e.date)} · {formatTime(e.time)} · {demo.isRsvped(e.id) ? '✓ Going' : `${e.capacity - e.going} spots left`}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="ads-h">
            <h2 id="ads-h" className="mb-3 text-xs font-bold uppercase tracking-wider text-uni-muted">Sponsored · sample ads</h2>
            <AdSidebar ads={demo.dataset.ads.slice(0, 2)} />
          </section>
          <section className="rounded-3xl border border-uni-border bg-white p-5 shadow-card" aria-labelledby="shortcuts-h">
            <h2 id="shortcuts-h" className="font-display text-lg font-bold text-slate-900">Shortcuts</h2>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {[
                ['Offer a ride', '/ride?offer=1'],
                ['Share food', '/meals?share=1'],
                ['Create study group', '/study?create=1'],
                ['Post a listing', '/room?post=1'],
                ['Messages', '/messages'],
                ['Switch university', '/select'],
              ].map(([label, to]) => (
                <Link key={to} to={to} className="rounded-xl border border-uni-border px-3 py-2.5 font-semibold text-slate-700 transition hover:border-uni-primary/40 hover:bg-uni-soft hover:text-uni-ink">
                  {label}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
