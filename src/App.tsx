import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UniversityProvider } from './context/UniversityContext';
import { DemoProvider } from './context/DemoContext';
import { ToastProvider } from './context/ToastContext';
import { useUniversityContext } from './hooks/useUniversity';
import { AppShell } from './components/layout/AppShell';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import UniversitySelection from './pages/UniversitySelection';
import Home from './pages/Home';
import VerseRide from './pages/VerseRide';
import VerseStudy from './pages/VerseStudy';

const VerseMeals = lazy(() => import('./pages/VerseMeals'));
const VerseConnect = lazy(() => import('./pages/VerseConnect'));
const VerseRoom = lazy(() => import('./pages/VerseRoom'));
const Messages = lazy(() => import('./pages/Messages'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Profile = lazy(() => import('./pages/Profile'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loading() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-uni-soft border-t-uni-primary" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/** Campus routes only render once a university has been chosen. Keyed by id so nothing leaks between universities. */
function CampusRoutes() {
  const { university } = useUniversityContext();
  if (!university) return <Navigate to="/select" replace />;
  return (
    <DemoProvider key={university.id} university={university}>
      <AppShell />
    </DemoProvider>
  );
}

function RootRedirect() {
  const { university } = useUniversityContext();
  return <Navigate to={university ? '/home' : '/select'} replace />;
}

export default function App() {
  return (
    <ErrorBoundary>
      {/* basename follows Vite's `base` (vite.config.ts), so routes resolve under /campusverse/ on GitHub Pages. */}
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <UniversityProvider>
          <ToastProvider>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<RootRedirect />} />
                <Route path="/select" element={<UniversitySelection />} />
                <Route element={<CampusRoutes />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/ride" element={<VerseRide />} />
                  <Route path="/study" element={<VerseStudy />} />
                  <Route path="/meals" element={<VerseMeals />} />
                  <Route path="/connect" element={<VerseConnect />} />
                  <Route path="/room" element={<VerseRoom />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </ToastProvider>
        </UniversityProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
