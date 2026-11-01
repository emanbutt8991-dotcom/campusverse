import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, RotateCcw } from 'lucide-react';
import { clearAllDemoState, removeKey, storageKeys } from '../../utils/storage';

const RELOAD_FLAG = 'campusverse:chunk-reload';

/** True when a lazily-loaded page chunk is missing, e.g. a tab opened before a redeploy replaced the hashed files. */
export function isChunkLoadError(error: unknown): boolean {
  const msg = error instanceof Error ? `${error.name} ${error.message}` : String(error);
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError|Unable to preload CSS/i.test(msg);
}

/** Reload once to pick up the latest deployment. Guarded so a genuinely broken deploy can't loop. */
export function reloadForNewDeploy(): boolean {
  try {
    if (sessionStorage.getItem(RELOAD_FLAG)) return false;
    sessionStorage.setItem(RELOAD_FLAG, '1');
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

/** Clear the one-shot reload guard once the app has rendered successfully. */
export function markAppHealthy() {
  try {
    sessionStorage.removeItem(RELOAD_FLAG);
  } catch {
    /* ignore */
  }
}

interface State {
  error: unknown;
}

/** App-wide safety net: shows a recovery screen instead of a blank page if anything throws while rendering. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: unknown): State {
    return { error };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('CampusVerse crashed:', error, info.componentStack);
    if (isChunkLoadError(error)) reloadForNewDeploy();
  }

  private healthyTimer = 0;

  componentDidMount() {
    // Only clear the reload guard once the app has stayed up for a while, so a broken first page can't reload-loop.
    this.healthyTimer = window.setTimeout(markAppHealthy, 10000);
  }

  componentWillUnmount() {
    window.clearTimeout(this.healthyTimer);
  }

  private resetDemo = () => {
    clearAllDemoState();
    removeKey(storageKeys.selected);
    removeKey(storageKeys.custom);
    window.location.assign(import.meta.env.BASE_URL);
  };

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center bg-uni-bg p-6 text-uni-text" role="alert">
        <div className="w-full max-w-md rounded-3xl border border-uni-border bg-white p-6 text-center shadow-card">
          <h1 className="font-display text-xl font-bold text-slate-900">Something went wrong</h1>
          <p className="mt-2 text-sm text-slate-600">CampusVerse hit an unexpected error. Reloading usually fixes it. If it keeps happening, reset the demo to clear saved data on this device.</p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button onClick={() => window.location.reload()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-uni-primary px-4 text-sm font-semibold text-uni-onprimary shadow-sm hover:brightness-110">
              <RefreshCw size={16} aria-hidden /> Reload
            </button>
            <button onClick={this.resetDemo} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-uni-border bg-white px-4 text-sm font-semibold text-uni-ink hover:bg-uni-soft">
              <RotateCcw size={16} aria-hidden /> Reset demo
            </button>
          </div>
        </div>
      </div>
    );
  }
}
