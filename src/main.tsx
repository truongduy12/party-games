import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ScoreProvider } from './lib/scoreManager.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScoreProvider canReset={true}>
      <App />
    </ScoreProvider>
  </StrictMode>
);
