import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { Navbar } from './Navbar';
import { MobileTabBar } from './MobileTabBar';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ThemeEditor } from '../university/ThemeEditor';
import { useUniversity } from '../../hooks/useUniversity';
import { useDemoData } from '../../hooks/useDemoData';
import { useToast } from '../../context/ToastContext';
import { DISCLAIMER } from '../../config/universities';

export function AppShell() {
  const u = useUniversity();
  const { resetDemo } = useDemoData();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [resetOpen, setResetOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-uni-bg text-uni-text">
      <a href="#main" className="sr-only z-[80] rounded-lg bg-white px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
        Skip to content
      </a>
      <Navbar onReset={() => setResetOpen(true)} onEditTheme={() => setThemeOpen(true)} />
      <main id="main" key={u.id} className="mx-auto max-w-[1400px] px-3 pb-28 pt-5 sm:px-5 lg:pb-12">
        <Outlet />
        <p className="mt-12 text-center text-xs text-uni-muted">{DISCLAIMER} All people, listings and businesses shown are fictional demo data.</p>
      </main>
      <MobileTabBar />
      <ConfirmDialog
        open={resetOpen}
        title="Reset demo?"
        description={`This restores the original ${u.shortName} sample data and clears your requests, posts, listings and messages on this device.`}
        confirmLabel="Reset Demo"
        icon={<RefreshCw size={20} />}
        onCancel={() => setResetOpen(false)}
        onConfirm={() => {
          resetDemo();
          setResetOpen(false);
          toast({ title: 'Demo reset', description: 'All sample data has been restored.' });
          navigate('/home');
        }}
      />
      {u.isCustom && <ThemeEditor key={`${u.id}-${themeOpen}`} open={themeOpen} onClose={() => setThemeOpen(false)} />}
    </div>
  );
}
