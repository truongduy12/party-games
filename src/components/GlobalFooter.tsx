import { Link, useLocation } from 'react-router-dom';
import { useScores } from '../lib/scoreManager';
import { Home, RotateCcw } from 'lucide-react';

export function GlobalFooter() {
  const { resetScores, canReset } = useScores();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-party-black text-party-white z-50 shadow-md">
      <div className="flex items-center justify-center gap-4 px-6 py-4 max-w-7xl mx-auto">
        {!isHomePage && (
          <Link
            to="/"
            className="flex flex-1 items-center gap-2 px-4 py-2 text-white rounded hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none transition-colors"
            aria-label="Về trang chủ"
          >
            <Home size={20} />
            <span>Trang chủ</span>
          </Link>
        )}
        <button
          onClick={resetScores}
          disabled={!canReset}
          className="flex flex-1 items-center gap-2 px-4 py-2 text-white rounded hover:bg-white/20 disabled:bg-white/5 disabled:text-gray-400 disabled:cursor-not-allowed focus:ring-2 focus:ring-white/50 focus:outline-none transition-colors"
          aria-label="Reset điểm"
        >
          <RotateCcw size={20} />
          <span>Reset điểm</span>
        </button>
      </div>
    </footer>
  );
}
