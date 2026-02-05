# Quickstart: Home Page with Team Scoreboard

**Feature**: 001-home-scoreboard  
**Date**: 2026-02-05  
**Audience**: Developers implementing this feature  
**Estimated Time**: 4-6 hours for full implementation

---

## Overview

This feature establishes the foundation of the Party Games project:
- Vite + React + TypeScript + Tailwind CSS project setup
- Home page with 6 placeholder game cards in responsive grid
- Global team scoreboard (Blue Team vs Red Team)
- Persistent scores via localStorage
- Always-visible score display header

**Priority**: P1 (MVP) - This must be implemented before any games can be added

---

## Prerequisites

### System Requirements

- **Node.js**: 18+ (check: `node --version`)
- **npm**: 9+ (check: `npm --version`)
- **Git**: Any recent version
- **Code Editor**: VS Code recommended (with ESLint + Prettier extensions)

### Knowledge Requirements

- TypeScript basics (interfaces, types, generics)
- React 18+ (hooks, context, functional components)
- Tailwind CSS (utility classes, responsive design)
- localStorage API

---

## Quick Setup (5 minutes)

### Step 1: Initialize Project

```bash
# Navigate to project root
cd /Users/lavish/Documents/party-games

# Initialize Vite + React + TypeScript
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install React Router
npm install react-router-dom
npm install -D @types/react-router-dom
```

### Step 2: Configure Tailwind CSS

**File**: `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'party-black': '#1A1A1A',      // Soft black for eye comfort
        'party-white': '#FAFAFA',      // Soft white for eye comfort
        'party-gray': {
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      fontFamily: {
        sans: ['Google Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**File**: `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 3: Add Google Sans Font

**File**: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Google Sans Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap" rel="stylesheet">
    
    <title>Party Games</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Step 4: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` - you should see the default Vite React page.

---

## Implementation Guide

### Phase 1: Score Management (1-2 hours)

**File**: `src/lib/scoreManager.tsx`

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TeamScores {
  blue: number;
  red: number;
}

interface ScoreContextType {
  scores: TeamScores;
  getBlueScore: () => number;
  getRedScore: () => number;
  addBlueScore: (points: number) => void;
  addRedScore: (points: number) => void;
  resetScores: () => void;
  canReset: boolean;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);
const STORAGE_KEY = 'party-games-scores';

export function ScoreProvider({ 
  children, 
  canReset 
}: { 
  children: ReactNode; 
  canReset: boolean;
}) {
  const [scores, setScores] = useState<TeamScores>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : { blue: 0, red: 0 };
    } catch (error) {
      console.error('Failed to load scores:', error);
      return { blue: 0, red: 0 };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch (error) {
      console.error('Failed to save scores:', error);
    }
  }, [scores]);

  const getBlueScore = () => scores.blue;
  const getRedScore = () => scores.red;

  const addBlueScore = (points: number) => {
    if (isNaN(points)) return;
    setScores(prev => ({
      ...prev,
      blue: Math.max(0, prev.blue + points),
    }));
  };

  const addRedScore = (points: number) => {
    if (isNaN(points)) return;
    setScores(prev => ({
      ...prev,
      red: Math.max(0, prev.red + points),
    }));
  };

  const resetScores = () => {
    if (canReset) {
      setScores({ blue: 0, red: 0 });
    }
  };

  return (
    <ScoreContext.Provider
      value={{
        scores,
        getBlueScore,
        getRedScore,
        addBlueScore,
        addRedScore,
        resetScores,
        canReset,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export function useScores() {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScores must be used within ScoreProvider');
  }
  return context;
}
```

---

### Phase 2: Score Display Component (30 minutes)

**File**: `src/components/ScoreDisplay.tsx`

```typescript
import { useScores } from '../lib/scoreManager';

export function ScoreDisplay() {
  const { scores } = useScores();

  return (
    <header className="fixed top-0 left-0 right-0 bg-party-black text-party-white z-50 shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="font-medium">Đội Xanh: {scores.blue}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-medium">Đội Đỏ: {scores.red}</span>
          <div className="w-3 h-3 bg-red-500 rounded-full" />
        </div>
      </div>
    </header>
  );
}
```

---

### Phase 3: Game Card Component (45 minutes)

**File**: `src/components/GameCard.tsx`

```typescript
interface GameCardProps {
  title: string;
  icon: string;
  status: 'coming-soon' | 'available';
  route?: string | null;
}

export function GameCard({ title, icon, status }: GameCardProps) {
  const isComingSoon = status === 'coming-soon';

  return (
    <div
      className={`
        bg-party-white border-2 border-party-gray-300 rounded-lg p-6
        flex flex-col items-center justify-center gap-4
        transition-all duration-200
        ${isComingSoon 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:border-party-black hover:shadow-lg cursor-pointer'
        }
      `}
    >
      <img 
        src={icon} 
        alt={title} 
        className="w-24 h-24 object-contain"
      />
      
      <h3 className="text-xl font-medium text-party-black">
        {title}
      </h3>
      
      {isComingSoon && (
        <span className="text-sm text-party-gray-600 font-medium">
          Sắp ra mắt
        </span>
      )}
    </div>
  );
}
```

**File**: `public/placeholder-game-icon.svg`

```svg
<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="48" cy="48" r="40" stroke="#9E9E9E" stroke-width="2" fill="none"/>
  <text x="48" y="58" font-family="system-ui" font-size="48" fill="#9E9E9E" text-anchor="middle">?</text>
</svg>
```

---

### Phase 4: Home Page (1 hour)

**File**: `src/pages/Home.tsx`

```typescript
import { useScores } from '../lib/scoreManager';
import { GameCard } from '../components/GameCard';

interface GameCardData {
  id: string;
  title: string;
  status: 'coming-soon' | 'available';
  icon: string;
  route: string | null;
}

const PLACEHOLDER_GAMES: GameCardData[] = [
  { id: 'game-1', title: 'Trò chơi 1', status: 'coming-soon', icon: '/placeholder-game-icon.svg', route: null },
  { id: 'game-2', title: 'Trò chơi 2', status: 'coming-soon', icon: '/placeholder-game-icon.svg', route: null },
  { id: 'game-3', title: 'Trò chơi 3', status: 'coming-soon', icon: '/placeholder-game-icon.svg', route: null },
  { id: 'game-4', title: 'Trò chơi 4', status: 'coming-soon', icon: '/placeholder-game-icon.svg', route: null },
  { id: 'game-5', title: 'Trò chơi 5', status: 'coming-soon', icon: '/placeholder-game-icon.svg', route: null },
  { id: 'game-6', title: 'Trò chơi 6', status: 'coming-soon', icon: '/placeholder-game-icon.svg', route: null },
];

export function Home() {
  const { resetScores, canReset, scores } = useScores();

  return (
    <div className="min-h-screen bg-party-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-party-black">
            Party Games
          </h1>
          
          {canReset && (scores.blue > 0 || scores.red > 0) && (
            <button
              onClick={resetScores}
              className="bg-party-black text-party-white px-6 py-2 rounded-lg hover:bg-party-gray-800 transition-colors"
            >
              Reset điểm
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_GAMES.map(game => (
            <GameCard
              key={game.id}
              title={game.title}
              icon={game.icon}
              status={game.status}
              route={game.route}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

### Phase 5: App Setup with Routing (30 minutes)

**File**: `src/App.tsx`

```typescript
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ScoreProvider } from './lib/scoreManager';
import { ScoreDisplay } from './components/ScoreDisplay';
import { Home } from './pages/Home';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <ScoreProvider canReset={isHomePage}>
      <ScoreDisplay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </ScoreProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
```

**File**: `src/main.tsx`

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

## Testing Checklist

### Manual Testing (30 minutes)

- [ ] **Home Page Loads**: Visit `http://localhost:5173`, see 6 game cards
- [ ] **Score Display Visible**: Header shows "Blue Team: 0" and "Red Team: 0"
- [ ] **Responsive Grid**: Resize browser to test 1/2/3 column layouts
- [ ] **Reset Button Shows**: Reset button visible on home page when scores > 0
- [ ] **Score Persistence**: 
  - Open browser console
  - Run: `window.localStorage.getItem('party-games-scores')`
  - Should see: `{"blue":0,"red":0}`
- [ ] **Add Scores via Console**:
  ```javascript
  // Test from console (if window.partyGames exposed, or via React DevTools)
  // Manually add via Components tab in DevTools
  ```
- [ ] **Refresh Persistence**: Add scores, refresh page, scores should remain
- [ ] **Mobile View**: Test on mobile device or Chrome DevTools mobile emulation
- [ ] **Google Sans Font**: Verify font loads (check Network tab for fonts.googleapis.com)

---

## Performance Validation

### Bundle Size Check

```bash
npm run build
```

Check output - initial bundle should be well under 500KB gzipped.

### Lighthouse Audit

1. Build production version: `npm run build`
2. Preview: `npm run preview`
3. Open Chrome DevTools → Lighthouse
4. Run audit (Performance + Accessibility)
5. Target Scores:
   - Performance: >90
   - Accessibility: >90

---

## Common Issues & Solutions

### Issue 1: Tailwind Classes Not Working

**Symptom**: Elements have no styling  
**Solution**: 
1. Check `tailwind.config.js` content paths include your files
2. Ensure `@tailwind` directives are in `src/index.css`
3. Restart dev server: `npm run dev`

### Issue 2: Google Sans Font Not Loading

**Symptom**: Default system font appears  
**Solution**:
1. Check Network tab - fonts.googleapis.com should load
2. Verify `<link>` tags in `index.html`
3. Clear browser cache
4. Check tailwind.config.js fontFamily setting

### Issue 3: localStorage Not Persisting

**Symptom**: Scores reset on page refresh  
**Solution**:
1. Check browser console for errors
2. Verify not in private/incognito mode
3. Check Application tab → localStorage in DevTools
4. Ensure STORAGE_KEY matches: `party-games-scores`

### Issue 4: TypeScript Errors

**Symptom**: Red squiggles, type errors  
**Solution**:
1. Ensure `"strict": true` in `tsconfig.json`
2. Install missing types: `npm install -D @types/react @types/react-dom`
3. Restart TypeScript server in VS Code

---

## Next Steps

After completing this feature:

1. **Commit Your Work**:
   ```bash
   git add .
   git commit -m "feat: implement home page with team scoreboard"
   ```

2. **Generate Tasks**: Run `/speckit.tasks` to break down implementation into specific tasks

3. **Add First Game**: Next feature will add an actual game that uses the score management API

4. **Deploy Preview**: Test static build on hosting platform (Vercel, Netlify, etc.)

---

## Support & Resources

### Documentation

- [React 18 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Project Files

- [spec.md](./spec.md) - Full feature specification
- [data-model.md](./data-model.md) - Entity and state management details
- [contracts/score-management-api.md](./contracts/score-management-api.md) - API reference

### Need Help?

- Check constitution: `.specify/memory/constitution.md`
- Review research decisions: `research.md`
- Consult spec for acceptance criteria

---

## Estimated Timeline

| Phase | Task | Estimated Time |
|-------|------|----------------|
| 1 | Project setup (Vite + Tailwind + dependencies) | 30 min |
| 2 | Score management (Context + localStorage) | 1-2 hours |
| 3 | Score display component | 30 min |
| 4 | Game card component | 45 min |
| 5 | Home page implementation | 1 hour |
| 6 | App setup with routing | 30 min |
| 7 | Testing & validation | 30 min |
| **Total** | | **4-6 hours** |

---

**Ready to implement!** Follow the phases above, refer to contracts for API details, and test against the checklist.
