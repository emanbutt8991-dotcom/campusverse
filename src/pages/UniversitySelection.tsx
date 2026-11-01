import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Plus, Sparkles } from 'lucide-react';
import { UNIVERSITIES, DISCLAIMER } from '../config/universities';
import type { UniversityConfig } from '../types/university';
import { useUniversityContext } from '../hooks/useUniversity';
import { UniversityCard } from '../components/university/UniversityCard';
import { CustomUniversityForm } from '../components/university/CustomUniversityForm';
import { MascotArt } from '../components/university/MascotArt';
import { SearchBar } from '../components/common/SearchBar';
import { Modal } from '../components/common/Modal';
import { Logo } from '../components/common/Logo';
import { buildTokens } from '../config/themeTokens';

export default function UniversitySelection() {
  const navigate = useNavigate();
  const { university, customUniversity, selectUniversity, saveCustomUniversity } = useUniversityContext();
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<UniversityConfig | null>(university);
  const [customOpen, setCustomOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return UNIVERSITIES;
    return UNIVERSITIES.filter((u) => [u.name, u.shortName, u.city, u.province, u.athleticIdentity].some((f) => f.toLowerCase().includes(q)));
  }, [query]);

  const enter = (u: UniversityConfig) => {
    selectUniversity(u);
    navigate('/home', { replace: true });
  };

  const t = picked ? buildTokens(picked.colours) : null;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F7F7FB] pb-40">
      {/* Decorative orbits */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,.22),transparent_60%)]" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full bg-fuchsia-300/30 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" aria-hidden />
      <svg className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 opacity-40" width="900" height="420" viewBox="0 0 900 420" aria-hidden>
        <ellipse cx="450" cy="210" rx="420" ry="120" fill="none" stroke="#a5b4fc" strokeDasharray="4 8" />
        <ellipse cx="450" cy="210" rx="300" ry="80" fill="none" stroke="#f0abfc" strokeDasharray="2 10" />
      </svg>

      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
      </header>

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <section className="mx-auto max-w-3xl pb-8 pt-6 text-center sm:pt-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-card ring-1 ring-indigo-100">
            <Sparkles size={14} aria-hidden /> Rides · Meals · Community · Housing · Study groups
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Welcome to <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">CampusVerse</span>
          </h1>
          <p className="mt-3 font-display text-lg font-semibold text-slate-700 sm:text-xl">Your campus. Your people. Your universe.</p>
          <p className="mt-6 text-base text-slate-600">First things first, which university are you from?</p>
          <div className="mx-auto mt-4 max-w-xl">
            <SearchBar value={query} onChange={setQuery} label="Search your university" placeholder="Search your university..." />
          </div>
        </section>

        <section aria-label="Universities">
          <p className="mb-3 text-sm text-slate-600" aria-live="polite">
            {filtered.length === UNIVERSITIES.length ? `${UNIVERSITIES.length} campuses supported` : `${filtered.length} match${filtered.length === 1 ? '' : 'es'} for “${query}”`}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((u, i) => (
              <div key={u.id} className="animate-fadeUp" style={{ animationDelay: `${i * 30}ms` }}>
                <UniversityCard university={u} selected={picked?.id === u.id} onSelect={() => setPicked(u)} />
              </div>
            ))}
            {customUniversity && (!query || customUniversity.name.toLowerCase().includes(query.toLowerCase())) && (
              <UniversityCard university={customUniversity} selected={picked?.id === customUniversity.id} onSelect={() => setPicked(customUniversity)} />
            )}
            <button
              type="button"
              onClick={() => setCustomOpen(true)}
              className="group flex min-h-[290px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-white/70 p-6 text-center transition hover:-translate-y-1 hover:border-indigo-400 hover:bg-white hover:shadow-lift"
            >
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg transition group-hover:scale-105">
                <Building2 size={28} aria-hidden />
              </span>
              <span className="mt-4 font-display text-lg font-bold text-slate-900">Other University</span>
              <span className="text-sm text-slate-600">Don't see yours?</span>
              <span className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-xl bg-indigo-50 px-4 text-sm font-semibold text-indigo-700">
                <Plus size={16} aria-hidden /> Set up my campus
              </span>
            </button>
          </div>
          {filtered.length === 0 && (
            <p className="mt-6 rounded-2xl bg-white p-5 text-center text-sm text-slate-600 shadow-card">
              No listed campus matches “{query}”. Choose <strong>Other University</strong> to set up your own campus in seconds.
            </p>
          )}
        </section>

        <footer className="mt-14 text-center text-xs text-slate-500">
          <p>{DISCLAIMER}</p>
          <p className="mt-1">University colours shown are editable UI approximations. All illustrations are original and all content is fictional demo data.</p>
        </footer>
      </main>

      {/* Animated selection preview */}
      {picked && t && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-5" role="region" aria-label="Selected university preview">
          <div key={picked.id} className="relative mx-auto flex max-w-4xl animate-fadeUp flex-col gap-4 overflow-hidden rounded-3xl p-4 shadow-lift sm:flex-row sm:items-center sm:p-5" style={{ background: t.primary, color: t.onPrimary }}>
            <div className="pointer-events-none absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />
            <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full blur-2xl" style={{ background: t.highlight, opacity: 0.35 }} aria-hidden />
            <div className="relative flex min-w-0 flex-1 items-center gap-4">
              <MascotArt kind={picked.mascot} primary={t.primary} highlight={t.highlight} monogram={picked.monogram} size={60} label={`${picked.athleticIdentity} inspired graphic`} />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{picked.athleticIdentity}</p>
                <p className="truncate font-display text-xl font-extrabold">{picked.name}</p>
                <p className="text-sm opacity-90">{picked.welcomeMessage}</p>
              </div>
            </div>
            <div className="relative flex items-center gap-3">
              <div className="hidden gap-1.5 sm:flex" aria-hidden>
                {[picked.colours.primary, picked.colours.secondary, picked.colours.accent].map((c, i) => (
                  <span key={i} className="h-6 w-6 rounded-full ring-2 ring-white/70" style={{ background: c }} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => enter(picked)}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-6 text-base font-bold shadow-lg transition hover:brightness-105 active:scale-[.98] sm:flex-none"
                style={{ background: t.highlight === t.primary ? '#fff' : t.highlight, color: t.highlight === t.primary ? t.primary : t.onHighlight }}
                autoFocus
              >
                Enter Campus <ArrowRight size={18} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal open={customOpen} onClose={() => setCustomOpen(false)} title="Set up your campus" description="Tell us where you study and we'll build a themed CampusVerse for you." icon={<Building2 size={20} />}>
        <CustomUniversityForm
          initial={customUniversity ? { name: customUniversity.name, city: customUniversity.city, province: customUniversity.province, country: customUniversity.country } : undefined}
          onCancel={() => setCustomOpen(false)}
          onSubmit={(input) => {
            const u = saveCustomUniversity(input);
            setCustomOpen(false);
            setPicked(u);
          }}
        />
      </Modal>
    </div>
  );
}
