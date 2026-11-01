import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { reloadForNewDeploy } from './components/common/ErrorBoundary';

// A tab opened before a redeploy can request page chunks that no longer exist; reload once to fetch the new build.
window.addEventListener('vite:preloadError', (event) => {
  if (reloadForNewDeploy()) event.preventDefault();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
