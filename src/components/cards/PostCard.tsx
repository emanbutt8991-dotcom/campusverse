import { useState, type FormEvent } from 'react';
import { Heart, MessageCircle, Send, Share2 } from 'lucide-react';
import type { Post, PostImage } from '../../types/content';
import { Avatar } from '../common/Avatar';
import { timeAgo } from '../../utils/format';

const IMAGE_EMOJI: Record<PostImage, [string, string]> = {
  campus: ['🏛️', 'Campus scene'],
  food: ['🍲', 'Food'],
  event: ['🎉', 'Event'],
  study: ['📚', 'Study session'],
  sale: ['🏷️', 'Item for sale'],
};

export function PostImageArt({ kind }: { kind: PostImage }) {
  const [emoji, label] = IMAGE_EMOJI[kind];
  return (
    <div className="relative mt-3 grid h-40 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-uni-primary to-uni-accent" role="img" aria-label={`${label} illustration`}>
      <div className="pattern-dots absolute inset-0 text-white opacity-20" aria-hidden />
      <div className="absolute -right-6 -top-8 h-32 w-32 rounded-full bg-uni-highlight opacity-40 blur-xl" aria-hidden />
      <span className="relative text-6xl" aria-hidden>{emoji}</span>
    </div>
  );
}

interface Props {
  post: Post;
  liked: boolean;
  onLike: () => void;
  onComment: (text: string) => void;
  onShare: () => void;
  compact?: boolean;
}

export function PostCard({ post: p, liked, onLike, onComment, onShare, compact }: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onComment(text.trim());
    setText('');
  };
  return (
    <article className="rounded-3xl border border-uni-border bg-white p-4 shadow-card sm:p-5" aria-label={`Post by ${p.author}`}>
      <header className="flex items-start gap-3">
        <Avatar name={p.author} size={42} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <p className="font-semibold text-slate-900">{p.author}</p>
            <span className="rounded-full bg-uni-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-uni-ink">{p.userCreated ? 'You' : 'Demo community member'}</span>
          </div>
          <p className="text-xs text-slate-600">{p.program} · {timeAgo(p.minutesAgo)}</p>
        </div>
        <span className="shrink-0 rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-700">{p.category}</span>
      </header>
      <p className={`mt-3 whitespace-pre-line text-[15px] leading-relaxed text-slate-800 ${compact ? 'line-clamp-3' : ''}`}>{p.content}</p>
      {p.image && !compact && <PostImageArt kind={p.image} />}
      {!compact && (
        <>
          <div className="mt-4 flex items-center gap-1 border-t border-slate-100 pt-2">
            <button onClick={onLike} aria-pressed={liked} className={`inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold transition hover:bg-rose-50 ${liked ? 'text-rose-600' : 'text-slate-600'}`}>
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} aria-hidden /> {p.likes} <span className="sr-only">likes, {liked ? 'unlike' : 'like'}</span>
            </button>
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-slate-600 hover:bg-uni-soft">
              <MessageCircle size={18} aria-hidden /> {p.comments.length} <span className="sr-only">comments</span>
            </button>
            <button onClick={onShare} className="ml-auto inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-slate-600 hover:bg-uni-soft">
              <Share2 size={18} aria-hidden /> Share
            </button>
          </div>
          {open && (
            <div className="mt-2 space-y-3">
              {p.comments.map((c) => (
                <div key={c.id} className="flex gap-2">
                  <Avatar name={c.author} size={28} />
                  <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm">
                    <p className="font-semibold text-slate-900">{c.author}</p>
                    <p className="text-slate-700">{c.text}</p>
                  </div>
                </div>
              ))}
              <form onSubmit={submit} className="flex gap-2">
                <input value={text} onChange={(e) => setText(e.target.value)} aria-label="Write a comment" placeholder="Write a comment…" className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-sm focus:border-uni-primary focus:outline-none focus:ring-4 focus:ring-uni-primary/15" />
                <button type="submit" disabled={!text.trim()} className="grid h-10 w-10 place-items-center rounded-xl bg-uni-primary text-uni-onprimary disabled:opacity-40" aria-label="Post comment">
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </article>
  );
}
