import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { DISCLAIMER, UNIVERSITIES } from '../config/universities';
import { MODULES } from '../config/navigation';

export default function About() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader icon={<Info size={24} aria-hidden />} title="About CampusVerse" subtitle="Your campus. Your people. Your universe." />
      <article className="space-y-5 rounded-3xl border border-uni-border bg-white p-6 text-slate-700 shadow-card">
        <p>
          CampusVerse is a high-fidelity interactive prototype created for <strong>SFWRTECH 3RQ3 – Software Requirements &amp; Specifications</strong>. It brings five student services into one university-themed community:
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {MODULES.map((m) => (
            <li key={m.to}>
              <Link to={m.to} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 hover:bg-uni-soft">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-uni-primary text-uni-onprimary"><m.icon size={18} aria-hidden /></span>
                <span><span className="block font-semibold text-slate-900">{m.label}</span><span className="text-sm">{m.tagline}</span></span>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="font-display text-xl font-bold text-slate-900">How the prototype works</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>The whole experience re-themes and reloads content based on the selected university ({UNIVERSITIES.length} supported, plus any custom university).</li>
          <li>All people, rides, meals, listings, events and businesses are fictional demo data.</li>
          <li>Requests, RSVPs, posts and messages are simulated and saved only in your browser (localStorage). Nothing is sent anywhere.</li>
          <li>No real verification, payments, reservations or messaging take place.</li>
          <li>Use <strong>Reset Demo</strong> in the profile menu to restore the original data at any time.</li>
        </ul>
        <h2 className="font-display text-xl font-bold text-slate-900">Usability test tasks</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li><strong>Find a ride:</strong> as a McMaster student, find a carpool from McMaster University to Toronto, review the details and request one seat.</li>
          <li><strong>Join a study group:</strong> find a study group for SFWRTECH 3RQ3 and request to join it.</li>
        </ol>
        <p className="rounded-2xl bg-slate-50 p-4 text-sm font-medium">{DISCLAIMER}</p>
        <p className="text-xs text-slate-500">University colours are editable UI approximations, not official brand specifications. Campus and athletic-identity graphics are original illustrations and are not university logos or mascots.</p>
      </article>
    </div>
  );
}
