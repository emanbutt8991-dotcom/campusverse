import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Info, LogOut, Menu, MessagesSquare, Palette, RefreshCw, Repeat, User, X } from 'lucide-react';
import { HOME_ITEM, MODULES } from '../../config/navigation';
import { useUniversity } from '../../hooks/useUniversity';
import { useDemoData } from '../../hooks/useDemoData';
import { Logo, PrototypeBadge } from '../common/Logo';
import { Avatar } from '../common/Avatar';
import { MascotArt } from '../university/MascotArt';
import { buildTokens } from '../../config/themeTokens';
import { timeAgo } from '../../utils/format';
import { HelpMenu } from '../help/HelpMenu';

interface Props {
  onReset: () => void;
  onEditTheme: () => void;
}

function useOutside<T extends HTMLElement>(open: boolean, close: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && close();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);
  return ref;
}

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `relative inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold transition ${isActive ? 'bg-uni-primary text-uni-onprimary shadow-sm' : 'text-slate-700 hover:bg-uni-soft hover:text-uni-ink'}`;

export function Navbar({ onReset, onEditTheme }: Props) {
  const u = useUniversity();
  const t = buildTokens(u.colours);
  const navigate = useNavigate();
  const { notifications, unreadCount, markAllRead, conversations } = useDemoData();
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const bellRef = useOutside<HTMLDivElement>(bellOpen, () => setBellOpen(false));
  const profileRef = useOutside<HTMLDivElement>(profileOpen, () => setProfileOpen(false));
  const unreadMsgs = conversations.filter((c) => c.unread).length;

  const go = (to: string) => {
    setProfileOpen(false);
    setDrawer(false);
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-uni-border bg-white/90 backdrop-blur-md">
      <div className="h-1 w-full bg-uni-primary" aria-hidden>
        <div className="h-full w-1/3 bg-uni-highlight" />
      </div>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-3 sm:px-5">
        <button className="rounded-xl p-2 text-slate-700 hover:bg-uni-soft lg:hidden" onClick={() => setDrawer(true)} aria-label="Open navigation menu">
          <Menu size={22} />
        </button>
        <Link to="/home" className="flex shrink-0 items-center gap-2 rounded-xl" aria-label="CampusVerse home">
          <span className="hidden sm:inline">
            <Logo />
          </span>
          <span className="sm:hidden">
            <Logo compact />
          </span>
        </Link>
        <Link to="/profile" className="hidden shrink-0 items-center gap-2 rounded-full border border-uni-border bg-uni-soft py-1 pl-1 pr-3 text-xs font-semibold text-uni-ink md:inline-flex lg:hidden xl:inline-flex" title={u.name}>
          <MascotArt kind={u.mascot} primary={t.primary} highlight={t.highlight} monogram={u.monogram} size={24} label="" />
          <span className="max-w-[140px] truncate">{u.shortName}</span>
        </Link>

        <nav className="no-scrollbar ml-2 hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto lg:flex" aria-label="Main">
          {[HOME_ITEM, ...MODULES].map((item) => (
            <NavLink key={item.to} to={item.to} className={(a) => `${linkCls(a)} shrink-0`} data-tour={item.to.slice(1)} aria-label={item.label}>
              <item.icon size={16} aria-hidden />
              {/* Short labels on narrower desktops so the right-hand actions (Help, Messages, profile) always fit. */}
              <span className="min-[1440px]:hidden">{item.short}</span>
              <span className="hidden min-[1440px]:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="flex-1 lg:hidden" />

        <div className="flex shrink-0 items-center gap-1">
          <PrototypeBadge className="mr-1 hidden xl:inline-flex" />
          <HelpMenu />
          <NavLink to="/messages" data-tour="messages" className={({ isActive }) => `relative rounded-xl p-2.5 transition ${isActive ? 'bg-uni-primary text-uni-onprimary' : 'text-slate-700 hover:bg-uni-soft'}`} aria-label={`Messages${unreadMsgs ? `, ${unreadMsgs} unread` : ''}`}>
            <MessagesSquare size={20} />
            {unreadMsgs > 0 && <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />}
          </NavLink>

          <div className="relative" ref={bellRef}>
            <button
              className="relative rounded-xl p-2.5 text-slate-700 hover:bg-uni-soft"
              aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
              aria-expanded={bellOpen}
              onClick={() => setBellOpen((o) => !o)}
            >
              <Bell size={20} />
              {unreadCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">{unreadCount}</span>}
            </button>
            {bellOpen && (
              <div className="absolute right-0 mt-2 w-[min(22rem,calc(100vw-1.5rem))] animate-pop overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lift">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <p className="font-semibold text-slate-900">Notifications</p>
                  <button className="text-xs font-semibold text-uni-ink hover:underline disabled:opacity-40" onClick={markAllRead} disabled={!unreadCount}>
                    Mark all read
                  </button>
                </div>
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className={`flex gap-3 px-4 py-3 text-sm ${n.read ? '' : 'bg-uni-soft/70'}`}>
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-slate-300' : 'bg-uni-primary'}`} aria-hidden />
                      <div>
                        <p className="text-slate-800">{n.text}</p>
                        <p className="text-xs text-slate-500">{n.createdAt ? timeAgo(Math.round((Date.now() - n.createdAt) / 60000)) : 'Earlier'}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={() => { setBellOpen(false); navigate('/notifications'); }} className="block w-full border-t border-slate-100 py-2.5 text-center text-sm font-semibold text-uni-ink hover:bg-uni-soft">
                  View all activity
                </button>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button className="flex items-center gap-1 rounded-full p-1 pr-1.5 hover:bg-uni-soft" aria-label="Profile menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((o) => !o)}>
              <Avatar name="Alex Morgan" size={34} />
              <ChevronDown size={16} className="hidden text-slate-500 sm:block" aria-hidden />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 animate-pop overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lift" role="menu">
                <div className="flex items-center gap-3 border-b border-slate-100 p-4">
                  <Avatar name="Alex Morgan" size={44} />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">Alex Morgan</p>
                    <p className="text-xs text-slate-600">Third-Year Student · {u.shortName}</p>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-700">Demo Account</p>
                  </div>
                </div>
                <MenuItem icon={<User size={16} />} label="My profile" onClick={() => go('/profile')} />
                <MenuItem icon={<Info size={16} />} label="About CampusVerse" onClick={() => go('/about')} />
                {u.isCustom && <MenuItem icon={<Palette size={16} />} label="Edit University Theme" onClick={() => { setProfileOpen(false); onEditTheme(); }} />}
                <MenuItem icon={<Repeat size={16} />} label="Switch University" onClick={() => go('/select')} />
                <MenuItem icon={<RefreshCw size={16} />} label="Reset Demo" onClick={() => { setProfileOpen(false); onReset(); }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collapsible sidebar drawer for small screens */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setDrawer(false)} aria-hidden />
          <aside className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs animate-[fadeUp_.2s_ease-out] flex-col bg-white shadow-lift" aria-label="Navigation menu">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <Logo />
              <button className="rounded-xl p-2 hover:bg-slate-100" onClick={() => setDrawer(false)} aria-label="Close navigation menu">
                <X size={20} />
              </button>
            </div>
            <div className="border-b border-slate-100 p-4">
              <div className="flex items-center gap-3">
                <MascotArt kind={u.mascot} primary={t.primary} highlight={t.highlight} monogram={u.monogram} size={40} label="" />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">{u.name}</p>
                  <p className="text-xs text-slate-600">{u.athleticIdentity}</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Mobile main">
              {[HOME_ITEM, ...MODULES, { to: '/messages', label: 'Messages', short: '', icon: MessagesSquare }, { to: '/notifications', label: 'Notifications', short: '', icon: Bell }, { to: '/profile', label: 'Profile', short: '', icon: User }].map((item) => (
                <NavLink key={item.to} to={item.to} onClick={() => setDrawer(false)} className={({ isActive }) => `${linkCls({ isActive })} h-12 w-full`}>
                  <item.icon size={18} aria-hidden /> {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="space-y-1 border-t border-slate-100 p-3">
              <button onClick={() => go('/select')} className="flex h-11 w-full items-center gap-2 rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-uni-soft">
                <LogOut size={18} aria-hidden /> Switch University
              </button>
              <button onClick={() => { setDrawer(false); onReset(); }} className="flex h-11 w-full items-center gap-2 rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-uni-soft">
                <RefreshCw size={18} aria-hidden /> Reset Demo
              </button>
              <PrototypeBadge className="mt-2" />
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

function MenuItem({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button role="menuitem" onClick={onClick} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-uni-soft hover:text-uni-ink">
      <span className="text-slate-500">{icon}</span>
      {label}
    </button>
  );
}
