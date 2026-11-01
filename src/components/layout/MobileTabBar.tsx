import { NavLink } from 'react-router-dom';
import { HOME_ITEM, MODULES } from '../../config/navigation';

/** Bottom tab bar for phones: Home + the five Verse services. */
export function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-uni-border bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Quick navigation">
      <ul className="grid grid-cols-6">
        {[HOME_ITEM, ...MODULES].map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              data-tour={item.to.slice(1)}
              className={({ isActive }) => `flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition ${isActive ? 'text-uni-ink' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {({ isActive }) => (
                <>
                  <span className={`grid h-8 w-12 place-items-center rounded-full transition ${isActive ? 'bg-uni-primary text-uni-onprimary' : ''}`}>
                    <item.icon size={19} aria-hidden />
                  </span>
                  {item.short}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
