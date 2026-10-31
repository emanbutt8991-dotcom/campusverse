import type { CampusEvent, Housing, Meal, Post, Ride, StudyGroup } from '../types/content';

export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

/** Course matching that ignores case and spacing: "sfwrtech3rq3" matches "SFWRTECH 3RQ3". */
export const compact = (s: string) => norm(s).replace(/[^a-z0-9]/g, '');

export function matches(haystack: (string | undefined)[], query: string) {
  const q = norm(query);
  if (!q) return true;
  const text = norm(haystack.filter(Boolean).join(' '));
  return q.split(/\s+/).every((word) => text.includes(word) || compact(text).includes(compact(word)));
}

export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening';
export function timeOfDay(hhmm: string): TimeOfDay {
  const h = Number(hhmm.split(':')[0]);
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
}

export interface SearchResult {
  id: string;
  type: 'Ride' | 'Study group' | 'Housing' | 'Event' | 'Meal' | 'Post';
  title: string;
  subtitle: string;
  link: string;
}

export function searchAll(
  q: string,
  d: { rides: Ride[]; groups: StudyGroup[]; housing: Housing[]; events: CampusEvent[]; meals: Meal[]; posts: Post[] },
): SearchResult[] {
  if (norm(q).length < 2) return [];
  const out: SearchResult[] = [];
  d.groups
    .filter((g) => matches([g.course, g.name, g.description, g.location], q))
    .forEach((g) => out.push({ id: g.id, type: 'Study group', title: `${g.course} · ${g.name}`, subtitle: `${g.day} ${g.time} · ${g.members}/${g.max} members`, link: `/study?course=${encodeURIComponent(g.course)}&group=${g.id}` }));
  d.rides
    .filter((r) => matches([r.from, r.to, r.driver, r.pickup], q))
    .forEach((r) => out.push({ id: r.id, type: 'Ride', title: `${r.from} → ${r.to}`, subtitle: `${r.driver} · $${r.price}/seat`, link: `/ride?to=${encodeURIComponent(r.to)}&ride=${r.id}` }));
  d.housing
    .filter((h) => matches([h.neighbourhood, h.roomType, h.description], q))
    .forEach((h) => out.push({ id: h.id, type: 'Housing', title: `${h.roomType} near ${h.neighbourhood}`, subtitle: `$${h.rent}/month · ${h.distanceKm} km`, link: `/room?home=${h.id}` }));
  d.events
    .filter((e) => matches([e.title, e.location, e.description], q))
    .forEach((e) => out.push({ id: e.id, type: 'Event', title: e.title, subtitle: e.location, link: `/connect?event=${e.id}` }));
  d.meals
    .filter((m) => matches([m.dish, m.description, m.pickup, ...m.tags], q))
    .forEach((m) => out.push({ id: m.id, type: 'Meal', title: m.dish, subtitle: `${m.pickup} · ${m.window}`, link: `/meals?q=${encodeURIComponent(m.dish)}` }));
  d.posts
    .filter((p) => matches([p.content, p.author, p.category], q))
    .forEach((p) => out.push({ id: p.id, type: 'Post', title: p.content.slice(0, 70) + (p.content.length > 70 ? '…' : ''), subtitle: `${p.author} · ${p.category}`, link: `/connect?q=${encodeURIComponent(q)}` }));
  return out;
}
