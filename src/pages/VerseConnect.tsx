import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarDays, Clock, Copy, ImagePlus, MapPin, Send, Users, X } from 'lucide-react';
import { useUniversity } from '../hooks/useUniversity';
import { useDemoData } from '../hooks/useDemoData';
import { useToast } from '../context/ToastContext';
import { POST_CATEGORIES, type CampusEvent, type Post, type PostCategory, type PostImage } from '../types/content';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { SearchBar } from '../components/common/SearchBar';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { Avatar } from '../components/common/Avatar';
import { PostCard, PostImageArt } from '../components/cards/PostCard';
import { EventCard, DateBadge } from '../components/cards/EventCard';
import { SponsoredAd } from '../components/advertisements/SponsoredAd';
import { matches } from '../utils/filters';
import { formatDate, formatTime } from '../utils/format';

type Cat = 'All Posts' | PostCategory;
const INTERESTS = ['Art', 'Anime', 'Music', 'Coding', 'Sports', 'Salsa'];
const IMAGES: PostImage[] = ['campus', 'event', 'study', 'food', 'sale'];

export default function VerseConnect() {
  const u = useUniversity();
  const demo = useDemoData();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [cat, setCat] = useState<Cat>('All Posts');
  const [eventDetails, setEventDetails] = useState<CampusEvent | null>(() => demo.events.find((e) => e.id === params.get('event')) ?? null);
  const [share, setShare] = useState<Post | null>(null);

  // composer
  const [text, setText] = useState('');
  const [postCat, setPostCat] = useState<PostCategory>('General');
  const [image, setImage] = useState<PostImage | undefined>();
  const [pickImage, setPickImage] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.get('event') || params.get('q')) setParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const posts = useMemo(
    () => demo.posts.filter((p) => (cat === 'All Posts' || p.category === cat) && matches([p.content, p.author, p.program, p.category], q)),
    [demo.posts, cat, q],
  );
  const events = useMemo(() => {
    const f = demo.events.filter((e) => matches([e.title, e.location, e.description, 'event events campus'], q));
    return f.length ? f : demo.events;
  }, [demo.events, q]);

  const publish = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 3) {
      setError('Write at least a few words before publishing.');
      return;
    }
    demo.createPost({ content: text.trim(), category: postCat, image });
    setText('');
    setImage(undefined);
    setError('');
    setCat('All Posts');
    setQ('');
    toast({ title: 'Post published!', description: `Shared to the ${u.shortName} community feed (demo).` });
  };

  const rsvp = (e: CampusEvent) => {
    const going = demo.toggleRsvp(e);
    toast(going ? { title: 'RSVP confirmed!', description: `You're going to ${e.title}. Added to your Upcoming Activity.` } : { title: 'RSVP cancelled', description: e.title, tone: 'info' });
  };

  const shareLink = share ? `${window.location.origin}/connect?q=${encodeURIComponent(share.content.slice(0, 24))}` : '';

  return (
    <div>
      <PageHeader icon={<Users size={24} aria-hidden />} eyebrow={`${u.shortName} community`} title="VerseConnect" subtitle="Posts, events and people from your campus" />

      <div className="mb-6 rounded-3xl border border-uni-border bg-white p-3 shadow-card">
        <SearchBar value={q} onChange={setQ} label="Search events and posts" placeholder="Search events and posts…" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_320px]">
        {/* Browse */}
        <aside aria-label="Browse categories" className="lg:sticky lg:top-24 lg:h-fit">
          <div className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:rounded-3xl lg:border lg:border-uni-border lg:bg-white lg:p-4 lg:shadow-card">
            <h2 className="mb-2 hidden font-display text-lg font-bold text-slate-900 lg:block">Browse</h2>
            {(['All Posts', ...POST_CATEGORIES] as Cat[]).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`shrink-0 rounded-full px-4 py-2 text-left text-sm font-semibold transition lg:block lg:w-full lg:rounded-xl ${cat === c ? 'bg-uni-primary text-uni-onprimary' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-uni-soft lg:bg-transparent lg:ring-0'}`}
              >
                {c}
              </button>
            ))}
            <div className="hidden pt-4 lg:block">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-uni-muted">Interests</h3>
              <div className="flex flex-wrap gap-1.5">
                {INTERESTS.map((i) => (
                  <button key={i} onClick={() => setQ(i)} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-uni-primary/40 hover:bg-uni-soft">
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Feed */}
        <section aria-labelledby="feed-h" className="min-w-0 space-y-4">
          <form onSubmit={publish} className="rounded-3xl border border-uni-border bg-white p-4 shadow-card">
            <div className="flex gap-3">
              <Avatar name="Alex Morgan" size={42} />
              <div className="min-w-0 flex-1">
                <label htmlFor="composer" className="sr-only">What's happening on your campus?</label>
                <textarea
                  id="composer"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="What's happening on your campus?"
                  rows={2}
                  aria-invalid={!!error}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[15px] focus:border-uni-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-uni-primary/15"
                />
                {error && <p className="mt-1 text-xs font-medium text-rose-700" role="alert">{error}</p>}
                {image && (
                  <div className="relative">
                    <PostImageArt kind={image} />
                    <button type="button" onClick={() => setImage(undefined)} className="absolute right-2 top-5 rounded-full bg-white/90 p-1.5 text-slate-700 shadow" aria-label="Remove image">
                      <X size={14} />
                    </button>
                  </div>
                )}
                {pickImage && (
                  <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Choose a demo image">
                    {IMAGES.map((img) => (
                      <button key={img} type="button" onClick={() => { setImage(img); setPickImage(false); }} className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold capitalize text-slate-700 hover:bg-uni-soft">
                        {img}
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Button variant="secondary" size="sm" icon={<ImagePlus size={16} aria-hidden />} onClick={() => setPickImage((p) => !p)} aria-expanded={pickImage}>Photo</Button>
                  <label className="sr-only" htmlFor="post-cat">Category</label>
                  <select id="post-cat" value={postCat} onChange={(e) => setPostCat(e.target.value as PostCategory)} className="h-9 rounded-xl border border-slate-200 bg-white px-2 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-uni-primary/15">
                    {POST_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <Button type="submit" size="sm" className="ml-auto" icon={<Send size={15} aria-hidden />}>Post</Button>
                </div>
              </div>
            </div>
          </form>

          <h2 id="feed-h" className="font-display text-lg font-bold text-slate-900" aria-live="polite">
            {cat === 'All Posts' ? 'Student posts' : cat} ({posts.length})
          </h2>
          {posts.length === 0 ? (
            <EmptyState title="No posts here yet" description={q ? `No ${cat === 'All Posts' ? '' : cat + ' '}posts mention “${q}”.` : `Be the first to post in ${cat}!`} action={<Button onClick={() => { setQ(''); setCat('All Posts'); }}>Show all posts</Button>} />
          ) : (
            posts.map((p, i) => (
              <div key={p.id} className="space-y-4">
                <PostCard post={p} liked={demo.isLiked(p.id)} onLike={() => demo.toggleLike(p.id)} onComment={(t) => demo.addComment(p.id, t)} onShare={() => setShare(p)} />
                {i === 1 && demo.dataset.ads[2] && (
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-uni-muted">Sponsored · sample ad</p>
                    <SponsoredAd ad={demo.dataset.ads[2]} variant="banner" />
                  </div>
                )}
              </div>
            ))
          )}
        </section>

        {/* Events */}
        <aside aria-labelledby="events-h" className="lg:col-span-2 xl:col-span-1 xl:sticky xl:top-24 xl:h-fit">
          <div className="rounded-3xl border border-uni-border bg-white p-4 shadow-card">
            <h2 id="events-h" className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-900"><CalendarDays size={18} aria-hidden /> Upcoming Events</h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {events.map((e) => (
                <EventCard key={e.id} event={e} going={demo.isRsvped(e.id)} onRsvp={() => rsvp(e)} onDetails={() => setEventDetails(e)} />
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Modal
        open={!!eventDetails}
        onClose={() => setEventDetails(null)}
        title={eventDetails?.title ?? ''}
        description={eventDetails ? `Hosted by ${eventDetails.host}` : ''}
        icon={<CalendarDays size={20} />}
        footer={
          eventDetails && (
            <>
              <Button variant="secondary" onClick={() => setEventDetails(null)}>Close</Button>
              <Button variant={demo.isRsvped(eventDetails.id) ? 'success' : 'primary'} onClick={() => rsvp(eventDetails)}>
                {demo.isRsvped(eventDetails.id) ? '✓ Going — cancel RSVP' : 'RSVP'}
              </Button>
            </>
          )
        }
      >
        {eventDetails && (() => {
          const live = demo.events.find((e) => e.id === eventDetails.id) ?? eventDetails;
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <DateBadge iso={live.date} />
                <div className="text-sm text-slate-700">
                  <p className="flex items-center gap-1.5"><CalendarDays size={15} aria-hidden /> {formatDate(live.date, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  <p className="flex items-center gap-1.5"><Clock size={15} aria-hidden /> {formatTime(live.time)}</p>
                  <p className="flex items-center gap-1.5"><MapPin size={15} aria-hidden /> {live.location}</p>
                </div>
              </div>
              <p className="text-slate-700">{live.description}</p>
              <div>
                <div className="mb-1 flex justify-between text-sm"><span className="font-semibold text-slate-800">{live.going} going</span><span className="text-slate-600">{Math.max(0, live.capacity - live.going)} of {live.capacity} spots left</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-uni-primary" style={{ width: `${Math.min(100, (live.going / live.capacity) * 100)}%` }} /></div>
              </div>
            </div>
          );
        })()}
      </Modal>

      <Modal open={!!share} onClose={() => setShare(null)} title="Share post" description="Simulated share — links only work inside this prototype." size="sm" icon={<Copy size={20} />}>
        <div className="flex gap-2">
          <input readOnly value={shareLink} aria-label="Demo share link" className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700" />
          <Button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(shareLink);
              } catch {
                /* clipboard unavailable — still show confirmation */
              }
              setShare(null);
              toast({ title: 'Link copied', description: 'Demo link copied to your clipboard.' });
            }}
          >
            Copy
          </Button>
        </div>
      </Modal>
    </div>
  );
}
