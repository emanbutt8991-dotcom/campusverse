import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type {
  Activity,
  ActivityType,
  AppNotification,
  CampusEvent,
  Comment,
  Conversation,
  Dataset,
  Housing,
  Meal,
  Post,
  Ride,
  StudyGroup,
} from '../types/content';
import type { UniversityConfig } from '../types/university';
import { buildDataset } from '../data/buildDataset';
import { readJSON, removeKey, storageKeys, writeJSON } from '../utils/storage';
import { formatDate, formatTime, relativeDay, uid } from '../utils/format';

/** Everything the visitor does, persisted per university (key: campusverse:demo:<id>). */
interface DemoState {
  createdRides: Ride[];
  rideRequests: string[];
  createdGroups: StudyGroup[];
  groupRequests: string[];
  createdMeals: Meal[];
  mealClaims: string[];
  createdPosts: Post[];
  likedPosts: string[];
  postComments: Record<string, Comment[]>;
  createdListings: Housing[];
  rsvps: string[];
  conversations: Conversation[] | null;
  activity: Activity[];
  notifications: AppNotification[];
}

const EMPTY: DemoState = {
  createdRides: [],
  rideRequests: [],
  createdGroups: [],
  groupRequests: [],
  createdMeals: [],
  mealClaims: [],
  createdPosts: [],
  likedPosts: [],
  postComments: {},
  createdListings: [],
  rsvps: [],
  conversations: null,
  activity: [],
  notifications: [],
};

/** Keep only well-formed saved fields so stale or corrupted storage can't crash the app on reload. */
function sanitizeDemoState(raw: unknown): DemoState {
  const out: DemoState = { ...EMPTY };
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
  const r = raw as Record<string, unknown>;
  const target = out as unknown as Record<string, unknown>;
  (Object.keys(EMPTY) as (keyof DemoState)[]).forEach((k) => {
    const v = r[k];
    if (k === 'postComments') {
      if (v && typeof v === 'object' && !Array.isArray(v) && Object.values(v).every(Array.isArray)) target[k] = v;
    } else if (k === 'conversations') {
      if (v === null || Array.isArray(v)) target[k] = v;
    } else if (Array.isArray(v)) {
      target[k] = v.filter((item) => item !== null && item !== undefined);
    }
  });
  return out;
}

export interface DemoContextValue {
  dataset: Dataset;
  rides: Ride[];
  groups: StudyGroup[];
  meals: Meal[];
  posts: Post[];
  events: CampusEvent[];
  housing: Housing[];
  conversations: Conversation[];
  activity: Activity[];
  notifications: AppNotification[];
  unreadCount: number;
  isRideRequested: (id: string) => boolean;
  isGroupRequested: (id: string) => boolean;
  isMealClaimed: (id: string) => boolean;
  isRsvped: (id: string) => boolean;
  isLiked: (id: string) => boolean;
  requestRide: (ride: Ride) => void;
  offerRide: (ride: Omit<Ride, 'id' | 'driver' | 'program' | 'car' | 'notes' | 'userCreated'>) => void;
  requestJoin: (group: StudyGroup) => void;
  createGroup: (g: Omit<StudyGroup, 'id' | 'members' | 'organizer' | 'userCreated'>) => void;
  claimMeal: (meal: Meal) => void;
  shareMeal: (m: Omit<Meal, 'id' | 'student' | 'distanceKm' | 'emoji' | 'hue' | 'userCreated' | 'allergens'>) => void;
  toggleLike: (id: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (p: Pick<Post, 'content' | 'category' | 'image'>) => void;
  toggleRsvp: (event: CampusEvent) => boolean;
  createListing: (h: Omit<Housing, 'id' | 'lister' | 'hue' | 'userCreated' | 'amenities'> & { amenities?: string[] }) => void;
  sendMessage: (conversationId: string, text: string) => void;
  openConversationFor: (withName: string, topic: string, opener: string) => string;
  markAllRead: () => void;
  resetDemo: () => void;
}

export const DemoContext = createContext<DemoContextValue | null>(null);

const ME = 'Alex Morgan';

export function DemoProvider({ university, children }: { university: UniversityConfig; children: ReactNode }) {
  const dataset = useMemo(() => buildDataset(university), [university]);
  const key = storageKeys.demo(university.id);
  const [state, setState] = useState<DemoState>(() => sanitizeDemoState(readJSON<unknown>(key, {})));

  useEffect(() => {
    writeJSON(key, state);
  }, [key, state]);

  const log = useCallback((s: DemoState, type: ActivityType, title: string, subtitle: string, status: string, link: string, note: string): DemoState => {
    const now = Date.now();
    return {
      ...s,
      activity: [{ id: uid('act'), type, title, subtitle, status, link, createdAt: now }, ...s.activity].slice(0, 30),
      notifications: [{ id: uid('ntf'), type, text: note, createdAt: now, read: false }, ...s.notifications].slice(0, 30),
    };
  }, []);

  /* ---------- merged views ---------- */
  const rides = useMemo(() => [...state.createdRides, ...dataset.rides], [state.createdRides, dataset.rides]);
  const groups = useMemo(() => [...state.createdGroups, ...dataset.groups], [state.createdGroups, dataset.groups]);
  const meals = useMemo(() => [...state.createdMeals, ...dataset.meals], [state.createdMeals, dataset.meals]);
  const housing = useMemo(() => [...state.createdListings, ...dataset.housing], [state.createdListings, dataset.housing]);
  const events = useMemo(
    () => dataset.events.map((e) => (state.rsvps.includes(e.id) ? { ...e, going: e.going + 1 } : e)),
    [dataset.events, state.rsvps],
  );
  const posts = useMemo(
    () =>
      [...state.createdPosts, ...dataset.posts].map((p) => ({
        ...p,
        likes: p.likes + (state.likedPosts.includes(p.id) ? 1 : 0),
        comments: [...p.comments, ...(state.postComments[p.id] ?? [])],
        minutesAgo: p.createdAt ? Math.max(0, Math.round((Date.now() - p.createdAt) / 60000)) : p.minutesAgo,
      })),
    [state.createdPosts, state.likedPosts, state.postComments, dataset.posts],
  );
  const conversations = state.conversations ?? dataset.conversations;

  /** Seeded "already happening" activity so the dashboard is never empty. */
  const defaultActivity = useMemo<Activity[]>(() => {
    const r = dataset.rides[2];
    const g = dataset.groups[3];
    const e = dataset.events[0];
    return [
      { id: 'seed-ride', type: 'ride', title: `Ride to ${r.to}`, subtitle: `${relativeDay(r.date)} · ${formatTime(r.time)} with ${r.driver}`, status: 'Confirmed', link: '/ride', createdAt: 0 },
      { id: 'seed-study', type: 'study', title: `${g.course} · ${g.name}`, subtitle: `${g.day}s · ${g.time} · ${g.location}`, status: 'Member', link: `/study?course=${encodeURIComponent(g.course)}`, createdAt: 0 },
      { id: 'seed-event', type: 'event', title: e.title, subtitle: `${formatDate(e.date)} · ${formatTime(e.time)}`, status: 'Interested', link: '/connect', createdAt: 0 },
    ];
  }, [dataset]);

  const activity = useMemo(() => [...state.activity, ...defaultActivity], [state.activity, defaultActivity]);

  const notifications = useMemo<AppNotification[]>(
    () => [
      ...state.notifications,
      { id: 'seed-n1', type: 'event', text: `${dataset.events[1].title} is filling up — only a few spots left.`, createdAt: 0, read: true },
      { id: 'seed-n2', type: 'study', text: `New group posted for ${dataset.groups[0].course}.`, createdAt: 0, read: true },
    ],
    [state.notifications, dataset],
  );

  /* ---------- actions ---------- */
  const requestRide = useCallback(
    (ride: Ride) =>
      setState((s) =>
        s.rideRequests.includes(ride.id)
          ? s
          : log({ ...s, rideRequests: [...s.rideRequests, ride.id] }, 'ride', `Ride to ${ride.to}`, `${relativeDay(ride.date)} · ${formatTime(ride.time)} with ${ride.driver}`, 'Request Pending', '/ride', `Seat request sent for ${ride.driver}'s ride to ${ride.to} (simulated).`),
      ),
    [log],
  );

  const offerRide: DemoContextValue['offerRide'] = useCallback(
    (r) =>
      setState((s) => {
        const ride: Ride = { ...r, id: uid('ride'), driver: ME, program: 'Third-Year Student', car: 'Your vehicle', notes: 'Posted by you in this demo.', userCreated: true };
        return log({ ...s, createdRides: [ride, ...s.createdRides] }, 'ride', `Offering a ride to ${ride.to}`, `${relativeDay(ride.date)} · ${formatTime(ride.time)} · ${ride.seats} seats`, 'Listed', '/ride', `Your ride to ${ride.to} is now listed.`);
      }),
    [log],
  );

  const requestJoin = useCallback(
    (g: StudyGroup) =>
      setState((s) =>
        s.groupRequests.includes(g.id) || g.members >= g.max
          ? s
          : log({ ...s, groupRequests: [...s.groupRequests, g.id] }, 'study', `${g.course} · ${g.name}`, `${g.day}s · ${g.time} · ${g.location}`, 'Request Pending', `/study?course=${encodeURIComponent(g.course)}`, `Join request submitted to ${g.name} (${g.course}).`),
      ),
    [log],
  );

  const createGroup: DemoContextValue['createGroup'] = useCallback(
    (g) =>
      setState((s) => {
        const group: StudyGroup = { ...g, id: uid('group'), members: 1, organizer: ME, userCreated: true };
        return log({ ...s, createdGroups: [group, ...s.createdGroups] }, 'study', `${group.course} · ${group.name}`, `${group.day}s · ${group.time}`, 'Organizer', `/study?course=${encodeURIComponent(group.course)}`, `New study group "${group.name}" created.`);
      }),
    [log],
  );

  const claimMeal = useCallback(
    (m: Meal) =>
      setState((s) =>
        s.mealClaims.includes(m.id) ? s : log({ ...s, mealClaims: [...s.mealClaims, m.id] }, 'meal', m.dish, `Pickup at ${m.pickup} · ${m.window}`, 'Claim Requested', '/meals', `Claim requested for ${m.dish} from ${m.student}.`),
      ),
    [log],
  );

  const shareMeal: DemoContextValue['shareMeal'] = useCallback(
    (m) =>
      setState((s) => {
        const meal: Meal = { ...m, id: uid('meal'), student: ME, distanceKm: 0.3, emoji: '🍽️', hue: 140, allergens: [], userCreated: true };
        return log({ ...s, createdMeals: [meal, ...s.createdMeals] }, 'listing', `Sharing: ${meal.dish}`, `${meal.pickup} · ${meal.window}`, 'Listed', '/meals', `Your food post "${meal.dish}" is live.`);
      }),
    [log],
  );

  const toggleLike = useCallback(
    (id: string) => setState((s) => ({ ...s, likedPosts: s.likedPosts.includes(id) ? s.likedPosts.filter((x) => x !== id) : [...s.likedPosts, id] })),
    [],
  );

  const addComment = useCallback(
    (postId: string, text: string) =>
      setState((s) => ({ ...s, postComments: { ...s.postComments, [postId]: [...(s.postComments[postId] ?? []), { id: uid('c'), author: ME, text }] } })),
    [],
  );

  const createPost: DemoContextValue['createPost'] = useCallback(
    (p) =>
      setState((s) => {
        const post: Post = { ...p, id: uid('post'), author: ME, program: 'Third-Year Student', minutesAgo: 0, likes: 0, comments: [], userCreated: true, createdAt: Date.now() };
        return log({ ...s, createdPosts: [post, ...s.createdPosts] }, 'post', 'You posted in VerseConnect', p.content.slice(0, 60), p.category, '/connect', 'Your post was published to the campus feed.');
      }),
    [log],
  );

  const toggleRsvp = useCallback(
    (e: CampusEvent) => {
      const going = !state.rsvps.includes(e.id);
      setState((s) =>
        going
          ? log({ ...s, rsvps: [...s.rsvps, e.id] }, 'event', e.title, `${formatDate(e.date)} · ${formatTime(e.time)} · ${e.location}`, 'RSVP Confirmed', '/connect', `RSVP confirmed for ${e.title}.`)
          : { ...s, rsvps: s.rsvps.filter((x) => x !== e.id), activity: s.activity.filter((a) => !(a.type === 'event' && a.title === e.title)) },
      );
      return going;
    },
    [log, state.rsvps],
  );

  const createListing: DemoContextValue['createListing'] = useCallback(
    (h) =>
      setState((s) => {
        const listing: Housing = { ...h, amenities: h.amenities ?? ['Posted by you'], id: uid('home'), lister: ME, hue: 260, userCreated: true };
        return log({ ...s, createdListings: [listing, ...s.createdListings] }, 'listing', `Listing: ${listing.neighbourhood}`, `$${listing.rent}/month · ${listing.roomType}`, 'Listed', '/room', `Your housing listing in ${listing.neighbourhood} is live.`);
      }),
    [log],
  );

  const sendMessage = useCallback(
    (conversationId: string, text: string) =>
      setState((s) => {
        const convs = s.conversations ?? dataset.conversations;
        const time = new Date().toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' });
        return {
          ...s,
          conversations: convs.map((c) => (c.id === conversationId ? { ...c, unread: false, messages: [...c.messages, { id: uid('m'), from: 'me' as const, text, time }] } : c)),
        };
      }),
    [dataset.conversations],
  );

  const openConversationFor = useCallback(
    (withName: string, topic: string, opener: string) => {
      const convs = state.conversations ?? dataset.conversations;
      const existing = convs.find((c) => c.with === withName && c.topic === topic);
      if (existing) return existing.id;
      const id = uid('conv');
      setState((s) => {
        const base = s.conversations ?? dataset.conversations;
        const conv: Conversation = { id, with: withName, program: 'Student lister', topic, messages: [{ id: uid('m'), from: 'them', text: opener, time: 'Now' }] };
        return log({ ...s, conversations: [conv, ...base] }, 'housing', `Message to ${withName}`, topic, 'Conversation opened', '/messages', `Conversation started with ${withName} about ${topic} (simulated).`);
      });
      return id;
    },
    [state.conversations, dataset.conversations, log],
  );

  const markAllRead = useCallback(() => setState((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) })), []);

  const resetDemo = useCallback(() => {
    removeKey(key);
    setState(EMPTY);
  }, [key]);

  const value: DemoContextValue = {
    dataset,
    rides,
    groups,
    meals,
    posts,
    events,
    housing,
    conversations,
    activity,
    notifications,
    unreadCount: state.notifications.filter((n) => !n.read).length,
    isRideRequested: (id) => state.rideRequests.includes(id),
    isGroupRequested: (id) => state.groupRequests.includes(id),
    isMealClaimed: (id) => state.mealClaims.includes(id),
    isRsvped: (id) => state.rsvps.includes(id),
    isLiked: (id) => state.likedPosts.includes(id),
    requestRide,
    offerRide,
    requestJoin,
    createGroup,
    claimMeal,
    shareMeal,
    toggleLike,
    addComment,
    createPost,
    toggleRsvp,
    createListing,
    sendMessage,
    openConversationFor,
    markAllRead,
    resetDemo,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
