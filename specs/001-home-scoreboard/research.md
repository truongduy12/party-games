# Research: Home Page with Team Scoreboard

**Feature**: 001-home-scoreboard  
**Date**: 2026-02-05  
**Purpose**: Resolve technical unknowns and establish best practices for foundation feature

## Research Overview

This is the first feature establishing the project foundation. Key research areas:
1. Vite + React + TypeScript + Tailwind CSS project setup
2. localStorage best practices for score persistence
3. React Context patterns for global score management
4. Tailwind CSS configuration for soft black/white minimalist design
5. Google Sans font integration
6. Eye-comfort color palette (soft tones vs pure black/white)

---

## Decision 1: Project Initialization

**Question**: How to initialize a Vite + React + TypeScript project with Tailwind CSS?

**Decision**: Use official Vite scaffolding with TypeScript template, then add Tailwind CSS

**Rationale**: 
- Vite official template provides optimal configuration for React + TypeScript
- Tailwind CSS installation is well-documented and straightforward
- This approach follows both Vite and Tailwind best practices

**Implementation**:
```bash
npm create vite@latest . -- --template react-ts
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Alternatives Considered**:
- Manual setup: Rejected - too error-prone, official tooling more reliable
- Create React App: Rejected - slower builds, Vite is constitutional requirement
- Pre-made boilerplate: Rejected - adds unnecessary dependencies

---

## Decision 2: Tailwind CSS Theme Configuration

**Question**: How to configure Tailwind CSS for black/white/grayscale minimalist design?

**Decision**: Custom theme in tailwind.config.js with locked color palette using soft black/white

**Rationale**:
- Tailwind's theme customization prevents accidental color usage
- Explicit palette definition enforces constitutional design constraints
- Soft black (#1A1A1A) and soft white (#FAFAFA) used instead of pure values for eye comfort
- Pure black/white cause eye strain - softer tones maintain minimalism while improving UX
- Google Sans font integration via theme.fontFamily

**Implementation**:
```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'party-black': '#1A1A1A',      // Soft black (not pure #000)
        'party-white': '#FAFAFA',      // Soft white (not pure #FFF)
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
}
```

**Rationale for Color Adjustments**:
- Pure black (#000000) and pure white (#FFFFFF) cause eye strain and visual discomfort
- Soft black (#1A1A1A) and soft white (#FAFAFA) maintain minimalist aesthetic while being more comfortable
- Still fully compliant with constitutional black/white palette requirement
- Better readability and reduced eye fatigue during extended gameplay

**Alternatives Considered**:
- Use default Tailwind colors: Rejected - allows non-constitutional colors
- CSS variables: Rejected - Tailwind theme provides better type safety
- Utility-only without theme: Rejected - harder to enforce palette constraints

---

## Decision 3: Google Sans Font Loading

**Question**: How to load Google Sans font for optimal performance?

**Decision**: Use Google Fonts CDN with preconnect optimization

**Rationale**:
- Google Fonts CDN is fast, reliable, and free
- Preconnect reduces DNS lookup time
- Supports font-display: swap for better perceived performance

**Implementation**:
```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap" rel="stylesheet">
```

**Alternatives Considered**:
- Self-hosted fonts: Rejected - adds complexity, Google CDN is faster globally
- System fonts only: Rejected - violates constitutional Google Sans requirement
- Font subsetting: Considered future optimization, not needed for MVP

---

## Decision 4: localStorage Score Persistence Pattern

**Question**: How to reliably persist and restore team scores from localStorage?

**Decision**: React Context + custom hook with localStorage sync and error handling

**Rationale**:
- React Context provides global state without prop drilling
- Custom hook encapsulates localStorage logic and error handling
- Graceful fallback to in-memory state if localStorage fails

**Implementation Pattern**:
```typescript
// src/lib/scoreManager.ts
interface TeamScores {
  blue: number;
  red: number;
}

const STORAGE_KEY = 'party-games-scores';

function loadScores(): TeamScores {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { blue: 0, red: 0 };
  } catch (error) {
    console.error('Failed to load scores:', error);
    return { blue: 0, red: 0 };
  }
}

function saveScores(scores: TeamScores): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error('Failed to save scores:', error);
  }
}
```

**Alternatives Considered**:
- Direct localStorage access in components: Rejected - violates encapsulation
- IndexedDB: Rejected - overkill for simple key-value storage
- sessionStorage: Rejected - doesn't persist across browser restarts (requirement)

---

## Decision 5: Global Score Management API Design

**Question**: How to expose score management methods globally for future games?

**Decision**: React Context Provider with TypeScript interface

**Rationale**:
- Type-safe API via TypeScript interfaces
- React Context is idiomatic for global state
- Easy to consume from any component via useScores() hook

**API Interface**:
```typescript
interface ScoreManager {
  scores: TeamScores;
  getBlueScore: () => number;
  getRedScore: () => number;
  addBlueScore: (points: number) => void;
  addRedScore: (points: number) => void;
  resetScores: () => void;
}
```

**Alternatives Considered**:
- Redux/Zustand: Rejected - overkill for simple score state
- Window global: Rejected - not type-safe, anti-pattern in React
- Event emitter: Rejected - Context is simpler and more React-idiomatic

---

## Decision 6: Responsive Grid Layout

**Question**: How to implement 3-column (desktop) / 2-column (tablet) / 1-column (mobile) grid?

**Decision**: Tailwind CSS grid utilities with responsive breakpoints

**Rationale**:
- Tailwind's responsive utilities handle breakpoints cleanly
- CSS Grid provides precise control over card layout
- Mobile-first approach aligns with constitutional priority

**Implementation**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

**Breakpoints**:
- Mobile: < 768px (1 column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

**Alternatives Considered**:
- Flexbox: Rejected - CSS Grid better suited for card grids
- Media queries in CSS: Rejected - Tailwind responsive utilities cleaner
- Fixed layout: Rejected - violates responsive requirement

---

## Decision 7: "Coming Soon" Card Design

**Question**: How to design placeholder cards with "coming soon" state?

**Decision**: Grayed-out card with centered "Coming Soon" text and placeholder icon

**Rationale**:
- Clear visual indication that game is not yet available
- Maintains grid structure even with no real games
- Simple to implement, meets minimalist design requirement

**Visual Approach**:
- Background: white with gray border
- Text: "Coming Soon" in gray
- Icon: Generic placeholder icon (e.g., question mark or game controller)
- Hover state: Subtle opacity change (not clickable)

**Alternatives Considered**:
- Empty grid spaces: Rejected - looks broken/incomplete
- "Add Game" prompts: Rejected - not user-facing feature
- Animated placeholders: Rejected - adds complexity, may impact 60fps target

---

## Decision 8: Score Display Placement

**Question**: Where to place the always-visible score display (header vs status bar)?

**Decision**: Fixed header bar at top of viewport

**Rationale**:
- Header is conventional placement for persistent UI
- Top placement works well on both mobile and desktop
- Doesn't obstruct game content (games render below header)
- Easy to implement with fixed positioning

**Implementation**:
```tsx
<header className="fixed top-0 left-0 right-0 bg-party-black text-party-white z-50">
  <div className="flex justify-between items-center px-4 py-3">
    <div>Blue Team: {blueScore}</div>
    <div>Red Team: {redScore}</div>
  </div>
</header>
<main className="pt-16"> {/* Offset for fixed header */}
  {/* Page content */}
</main>
```

**Alternatives Considered**:
- Bottom status bar: Rejected - can interfere with mobile keyboards
- Sidebar: Rejected - takes up horizontal space, poor on mobile
- Floating widget: Rejected - can overlap game content

---

## Decision 9: ESLint Rule for Inline Style Detection

**Question**: How to prevent inline styles as required by constitution?

**Decision**: Add eslint-plugin-react with react/forbid-component-props configured

**Rationale**:
- Automated enforcement via linting
- Catches inline style violations during development
- Can be enforced in CI/CD pipeline

**Configuration**:
```json
// .eslintrc.json
{
  "rules": {
    "react/forbid-component-props": ["error", {
      "forbid": ["style"]
    }]
  }
}
```

**Alternatives Considered**:
- Manual code review only: Rejected - error-prone, not scalable
- Custom ESLint plugin: Rejected - existing plugin sufficient
- TypeScript-only enforcement: Rejected - linting catches more cases

---

## Decision 10: Initial Bundle Size Strategy

**Question**: How to ensure <500KB initial bundle target is met?

**Decision**: Use Vite's built-in code splitting and monitor with rollup-plugin-visualizer

**Rationale**:
- Vite automatically code-splits by route
- Visualizer plugin helps identify large dependencies
- Simple feature unlikely to exceed budget, but monitoring establishes baseline

**Implementation**:
```bash
npm install -D rollup-plugin-visualizer
```

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
});
```

**Alternatives Considered**:
- No monitoring: Rejected - can't optimize what you don't measure
- Dynamic imports for everything: Rejected - premature optimization
- Webpack Bundle Analyzer: Rejected - not applicable to Vite

---

## Technology Choices Summary

| Technology | Version | Purpose | Constitutional Alignment |
|------------|---------|---------|--------------------------|
| React | 18+ | UI framework | ✅ Locked in constitution |
| TypeScript | 5+ | Type safety | ✅ Locked in constitution |
| Vite | 5+ | Build tool | ✅ Locked in constitution |
| Tailwind CSS | 3+ | Styling framework | ✅ Locked by this feature |
| React Router | 6+ | Routing | ✅ Static-first, client-side |
| Google Fonts | - | Font delivery | ✅ Google Sans requirement |
| ESLint | 8+ | Code quality | ✅ Quality gates |
| Prettier | 3+ | Code formatting | ✅ Quality gates |

---

## Decision 11: Soft Color Palette for Eye Comfort

**Question**: Should we use pure black (#000000) and pure white (#FFFFFF) or softer tones?

**Decision**: Use soft black (#1A1A1A) and soft white (#FAFAFA) instead of pure values

**Rationale**:
- Pure black on pure white creates harsh contrast that causes eye strain and discomfort
- Soft tones reduce eye fatigue during extended gameplay sessions
- #1A1A1A and #FAFAFA maintain the minimalist aesthetic while being gentler on eyes
- Still fully compliant with constitutional black/white/grayscale requirement
- Industry best practice for UI design (most modern apps avoid pure extremes)

**Color Values**:
- Primary dark: `#1A1A1A` (soft black) instead of `#000000`
- Primary light: `#FAFAFA` (soft white) instead of `#FFFFFF`
- Grayscale range: `#F5F5F5` to `#212121` (unchanged)

**Visual Impact**:
- Header background: `#1A1A1A` (dark, but not harsh)
- Page background: `#FAFAFA` or `#F5F5F5` (light, comfortable)
- Text on dark: `#FAFAFA` (readable without glare)
- Text on light: `#1A1A1A` (readable without strain)

**Alternatives Considered**:
- Pure black/white: Rejected - causes eye discomfort, especially in dark mode or bright environments
- Even softer tones (#333/#EEE): Rejected - too close to gray, loses minimalist impact
- Dynamic contrast: Rejected - adds complexity, static palette sufficient

---

## Open Questions for Future Features

1. **Multi-tab score synchronization**: Edge case identified in spec but out of scope. Future research needed if becomes requirement.
2. **Score history/analytics**: Currently out of scope. If needed, consider IndexedDB or additional localStorage keys.
3. **Offline PWA support**: Not currently required. If static hosting evolves to PWA, research service workers and cache strategies.

---

## Conclusion

All technical unknowns resolved (11 decisions documented). No "NEEDS CLARIFICATION" items remain in Technical Context. Ready to proceed to Phase 1 (Design & Contracts).

**Key Architectural Decisions**:
- Soft color palette (#1A1A1A/#FAFAFA) for eye comfort while maintaining minimalist aesthetic
- React Context + localStorage for global score management
- Tailwind CSS with custom theme enforcing design constraints
- Fixed header for always-visible scores
- Graceful localStorage error handling with in-memory fallback

**Next Phase**: Generate data-model.md, contracts/, and quickstart.md
