import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, FlaskConical, MessagesSquare, Send } from 'lucide-react';
import { useDemoData } from '../hooks/useDemoData';
import { useUniversity } from '../hooks/useUniversity';
import { useToast } from '../context/ToastContext';
import { Avatar } from '../components/common/Avatar';
import { PageHeader } from '../components/common/PageHeader';
import { EmptyState } from '../components/common/EmptyState';

export default function Messages() {
  const u = useUniversity();
  const { conversations, sendMessage } = useDemoData();
  const toast = useToast();
  const [params] = useSearchParams();
  const [activeId, setActiveId] = useState<string | null>(params.get('c') ?? null);
  const [mobileThread, setMobileThread] = useState(!!params.get('c'));
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [active?.messages.length, active?.id]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!active || !text.trim()) return;
    sendMessage(active.id, text.trim());
    setText('');
    if (active.topic.startsWith('Housing')) toast({ title: 'Message sent (simulated)', description: `Saved locally — ${active.with} is a demo student and won't receive it.` });
  };

  return (
    <div>
      <PageHeader icon={<MessagesSquare size={24} aria-hidden />} eyebrow={`${u.shortName} · Inbox`} title="Messages" subtitle="Chat with students about rides, rooms and study groups" />
      <p className="mb-4 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
        <FlaskConical size={16} aria-hidden /> Simulated messaging — conversations are stored on this device and no real person receives them.
      </p>
      {conversations.length === 0 ? (
        <EmptyState title="No conversations" description="Message a housing lister from VerseRoom to start one." />
      ) : (
        <div className="grid h-[calc(100vh-330px)] min-h-[460px] overflow-hidden rounded-3xl border border-uni-border bg-white shadow-card md:grid-cols-[300px_1fr]">
          <aside className={`${mobileThread ? 'hidden md:block' : 'block'} overflow-y-auto border-r border-slate-100`} aria-label="Conversations">
            <ul>
              {conversations.map((c) => {
                const last = c.messages[c.messages.length - 1];
                const isActive = c.id === active?.id;
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => { setActiveId(c.id); setMobileThread(true); }}
                      aria-current={isActive}
                      className={`flex w-full items-start gap-3 border-b border-slate-50 px-4 py-3.5 text-left transition ${isActive ? 'bg-uni-soft' : 'hover:bg-slate-50'}`}
                    >
                      <Avatar name={c.with} size={42} />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate font-semibold text-slate-900">{c.with}</span>
                          <span className="shrink-0 text-[11px] text-slate-500">{last?.time}</span>
                        </span>
                        <span className="block truncate text-xs font-semibold text-uni-ink">{c.topic}</span>
                        <span className="block truncate text-sm text-slate-600">{last?.from === 'me' ? 'You: ' : ''}{last?.text}</span>
                      </span>
                      {c.unread && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-uni-primary" aria-label="Unread" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
          {active && (
            <section className={`${mobileThread ? 'flex' : 'hidden md:flex'} min-h-0 flex-col`} aria-label={`Conversation with ${active.with}`}>
              <header className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
                <button className="rounded-xl p-2 hover:bg-slate-100 md:hidden" onClick={() => setMobileThread(false)} aria-label="Back to conversations"><ArrowLeft size={18} /></button>
                <Avatar name={active.with} size={38} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">{active.with}</p>
                  <p className="truncate text-xs text-slate-600">{active.topic} · Demo student</p>
                </div>
              </header>
              <div className="flex-1 space-y-3 overflow-y-auto bg-uni-bg/60 p-4" aria-live="polite">
                {active.messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${m.from === 'me' ? 'rounded-br-md bg-uni-primary text-uni-onprimary' : 'rounded-bl-md bg-white text-slate-800'}`}>
                      <p>{m.text}</p>
                      <p className={`mt-1 text-[10px] ${m.from === 'me' ? 'opacity-75' : 'text-slate-500'}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              <form onSubmit={submit} className="flex gap-2 border-t border-slate-100 p-3">
                <label htmlFor="composer-msg" className="sr-only">Type a message</label>
                <input id="composer-msg" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-3.5 text-sm focus:border-uni-primary focus:outline-none focus:ring-4 focus:ring-uni-primary/15" />
                <button type="submit" disabled={!text.trim()} className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-uni-primary px-4 text-sm font-semibold text-uni-onprimary disabled:opacity-40" aria-label="Send message">
                  <Send size={16} aria-hidden /> <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
