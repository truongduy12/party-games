# Research: Game Mô Tả Thành Ngữ

**Phase**: 0 - Outline & Research  
**Date**: 2026-02-06  
**Feature**: [spec.md](spec.md)

## Research Questions

From Technical Context and Feature Spec analysis:

1. **JSON Data Loading**: Best practices for importing and managing static JSON data in Vite + React
2. **Random Selection Algorithm**: Efficient method for random selection with no-repeat-last constraint
3. **Fade Transitions**: CSS/React patterns for 100-150ms opacity transitions
4. **Error Handling UI**: Standard patterns for retry mechanisms in React
5. **Button Layout Accessibility**: Touch target sizing for horizontal button rows on mobile
6. **localStorage Integration**: Best practices for integrating with existing score management context

---

## Decision 1: JSON Data Loading in Vite + React

**Context**: Feature requires loading 500 Vietnamese idioms from `thanh-ngu-tuc-ngu.json` file.

**Decision**: Use ES6 import with type assertion for static JSON bundling

**Implementation Pattern**:
```typescript
import idiomsData from '@/data/thanh-ngu-tuc-ngu.json';

interface Idiom {
  id: number;
  content: string;
}

const idioms: Idiom[] = idiomsData;
```

**Rationale**:
- Vite natively supports JSON imports without additional configuration
- Static import ensures data is bundled at build time (no runtime fetch overhead)
- Type-safe approach with TypeScript interface
- Data is cached by browser after first load
- No server request needed (aligns with static-first deployment)

**Alternatives Considered**:
- **Runtime fetch()**: Rejected because adds network latency, requires error handling for 404s, defeats Vite bundling optimization
- **Hardcoded array**: Rejected because 500 items would bloat component file, harder to update data
- **Dynamic import()**: Rejected because unnecessary async complexity for static data that's always needed

**Best Practices**:
- Place JSON in `src/data/` directory for clear organization
- Use TypeScript interface to validate JSON structure at compile time
- Configure tsconfig.json with `"resolveJsonModule": true` (already standard in Vite)

---

## Decision 2: Random Selection with No-Repeat Constraint

**Context**: Game must display random idiom from 500 items, avoiding immediate repetition (FR-010).

**Decision**: Use Fisher-Yates shuffle with index tracking for last-used idiom

**Implementation Pattern**:
```typescript
function getRandomIdiom(idioms: Idiom[], excludeId?: number): Idiom {
  const available = excludeId 
    ? idioms.filter(i => i.id !== excludeId)
    : idioms;
  
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

// Usage in component:
const [currentIdiom, setCurrentIdiom] = useState<Idiom>();
const [previousId, setPreviousId] = useState<number>();

const loadNextIdiom = () => {
  const next = getRandomIdiom(idioms, previousId);
  setCurrentIdiom(next);
  setPreviousId(next.id);
};
```

**Rationale**:
- Simple O(n) filtering is acceptable for 500 items (negligible performance impact)
- Filter + random selection ensures true randomness across all available idioms
- State tracking of previousId is minimal memory overhead (one integer)
- No need for complex shuffle algorithms given small dataset and no-sequential-repeat requirement

**Alternatives Considered**:
- **Full shuffle array**: Rejected because requires reshuffling when depleted, more complex state management
- **LRU cache (last N items)**: Rejected as over-engineering for simple "no immediate repeat" requirement
- **Seeded random with history**: Rejected because spec only requires avoiding last item, not full history

**Best Practices**:
- Use crypto.getRandomValues() for true randomness if needed (current Math.random() sufficient for games)
- Keep previousId in component state, not localStorage (spec confirms no session persistence)
- Handle edge case: if only 1 idiom in data, allow repeat (already addressed in edge cases)

---

## Decision 3: Fade Transition Implementation

**Context**: FR-021 requires 100-150ms opacity fade when idiom text changes.

**Decision**: Use Tailwind CSS transition utilities with React key-based remounting

**Implementation Pattern**:
```tsx
// Tailwind approach (preferred for consistency):
<div 
  key={currentIdiom.id} 
  className="transition-opacity duration-150 opacity-0 animate-fadeIn"
>
  {currentIdiom.content}
</div>

// Tailwind config addition (if needed):
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 150ms ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
}
```

**Alternative (CSS transition on state change)**:
```tsx
const [fade, setFade] = useState(true);

const changeIdiom = (newIdiom: Idiom) => {
  setFade(false);
  setTimeout(() => {
    setCurrentIdiom(newIdiom);
    setFade(true);
  }, 150);
};

<div className={`transition-opacity duration-150 ${fade ? 'opacity-100' : 'opacity-0'}`}>
  {currentIdiom.content}
</div>
```

**Rationale**:
- Tailwind provides declarative transition utilities (aligns with Principle VI)
- Key-based approach is simpler than manual fade state management
- 150ms within SC-002 requirement (<200ms)
- No JavaScript animation libraries needed (keeps bundle small)

**Alternatives Considered**:
- **React Spring / Framer Motion**: Rejected due to bundle size overhead for simple opacity fade
- **CSS animations (@keyframes)**: Alternative shown above, acceptable if Tailwind insufficient
- **JavaScript requestAnimationFrame**: Rejected as over-engineering for simple opacity change

**Best Practices**:
- Use Tailwind's built-in duration scales (duration-150 = 150ms)
- Test on 60fps target devices to ensure smooth animation
- Prefer declarative CSS over imperative JS for simple transitions

---

## Decision 4: Error Handling with Retry UI

**Context**: FR-020 requires error display with retry button when JSON fails to load.

**Decision**: Use React Error Boundary pattern with fallback retry component

**Implementation Pattern**:
```tsx
// Error state component:
function IdiomLoadError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <p className="text-center text-lg">
        Không thể tải dữ liệu thành ngữ
      </p>
      <button 
        onClick={onRetry}
        className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Thử lại
      </button>
    </div>
  );
}

// Main component with error handling:
const [loadError, setLoadError] = useState(false);

const loadIdioms = () => {
  try {
    const data = idiomsData; // Static import (rarely fails)
    if (!data || data.length === 0) throw new Error('Empty data');
    setLoadError(false);
    return data;
  } catch (err) {
    setLoadError(true);
    return [];
  }
};
```

**Rationale**:
- Static JSON import via Vite rarely fails (bundled at build time), but spec requires error handling
- Simple try-catch with boolean error state is sufficient for this use case
- Retry button triggers re-initialization without full page reload
- User-friendly Vietnamese error message

**Alternatives Considered**:
- **React Error Boundary**: Overkill for JSON import error (Error Boundaries for component render errors)
- **Toast notification**: Rejected because error blocks entire game functionality (not dismissible)
- **Redirect to home**: User mentioned but less user-friendly than in-place retry

**Best Practices**:
- Validate JSON structure (non-empty array) to catch data corruption
- Log error to console for debugging while showing user-friendly message
- Ensure retry button has adequate touch target (min 44x44px for mobile)

---

## Decision 5: Horizontal Button Layout Accessibility

**Context**: Three buttons ("Bỏ qua", "+10 Đội Xanh", "+10 Đội Đỏ") in horizontal row with equal width (Session 2026-02-06).

**Decision**: Use CSS Grid with 3 equal columns, min 48px height for touch targets

**Implementation Pattern**:
```tsx
<div className="grid grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
  <button className="h-12 px-4 border-2 border-gray-300 rounded hover:border-gray-400">
    Bỏ qua
  </button>
  <button className="h-12 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
    +10 Đội Xanh
  </button>
  <button className="h-12 px-4 bg-red-500 text-white rounded hover:bg-red-600">
    +10 Đội Đỏ
  </button>
</div>
```

**Rationale**:
- CSS Grid `grid-cols-3` ensures equal width distribution automatically
- 48px (h-12) height meets WCAG 2.1 AA minimum touch target (44x44px)
- Gap (gap-4 = 16px) provides adequate spacing to prevent mis-taps
- Blue/red colors for team buttons provide clear visual distinction
- Neutral gray for "Bỏ qua" (secondary action)

**Alternatives Considered**:
- **Flexbox with flex-1**: Acceptable alternative, Grid chosen for explicit column control
- **Individual width percentages**: Rejected because Grid is cleaner and more maintainable
- **Stacked on mobile**: Rejected per spec requirement for horizontal layout

**Best Practices**:
- Test on 320px width (iPhone SE) to ensure no button label truncation
- Use semantic `<button>` elements (not divs) for keyboard accessibility
- Ensure sufficient color contrast for blue/red on white background (WCAG AA)
- Add focus rings for keyboard navigation (Tailwind's default focus:ring)

**Accessibility Enhancements**:
- Add ARIA labels: `aria-label="Bỏ qua câu hiện tại"`, `aria-label="Cộng 10 điểm cho Đội Xanh"`
- Keyboard navigation: Tab through buttons, Enter/Space to activate
- Screen reader: Button role and labels automatically announced

---

## Decision 6: Integration with Score Management Context

**Context**: Game must use existing `useScores` hook from feature 001-home-scoreboard (FR-007, FR-008).

**Decision**: Import and consume global score context, no local score state needed

**Implementation Pattern**:
```tsx
import { useScores } from '@/lib/scoreManager';

function IdiomGame() {
  const { addBlueScore, addRedScore } = useScores();

  const handleBlueScore = () => {
    addBlueScore(10);
    loadNextIdiom();
  };

  const handleRedScore = () => {
    addRedScore(10);
    loadNextIdiom();
  };

  return (
    <>
      <button onClick={handleBlueScore}>+10 Đội Xanh</button>
      <button onClick={handleRedScore}>+10 Đội Đỏ</button>
    </>
  );
}
```

**Rationale**:
- Reuses existing infrastructure (Principle IV: Component Reusability)
- Score persistence to localStorage already handled by scoreManager context
- No need to duplicate score logic in game component
- Header ScoreDisplay component automatically updates (reactive context)

**Alternatives Considered**:
- **Local score state + sync to context**: Rejected as unnecessary complexity
- **Direct localStorage manipulation**: Rejected because violates single source of truth
- **New scoring system**: Rejected because existing system meets all requirements

**Best Practices**:
- Import hook, not direct context (encapsulation)
- Call score update before loading next idiom (ensures visual feedback)
- No need to track score in component state (read from context if needed via `scores` property)

**Dependencies**:
- Assumes `useScores` hook exports `addBlueScore(points: number)` and `addRedScore(points: number)`
- Assumes ScoreProvider wraps entire app (already true from feature 001)

---

## Summary of Technology Choices

| Aspect | Technology/Pattern | Rationale |
|--------|-------------------|-----------|
| Data Loading | ES6 import with type assertion | Vite-native, type-safe, bundled at build time |
| Random Selection | Filter + Math.random() with previousId | Simple, performant for 500 items, meets no-repeat requirement |
| Transitions | Tailwind CSS transition utilities | Lightweight, declarative, aligns with styling architecture |
| Error Handling | Try-catch with error state + retry button | Sufficient for static import, user-friendly |
| Button Layout | CSS Grid (grid-cols-3) with 48px height | Equal width, accessible touch targets, responsive |
| Score Integration | useScores hook from scoreManager | Reuses existing infrastructure, no duplication |

**No new dependencies required** - all solutions use existing tech stack (React, TypeScript, Tailwind, Vite).

---

## Open Questions / Edge Cases Resolved

**Q1**: What if idiom content is too long for mobile screens?  
**A**: Use CSS text truncation or scrolling container if needed (test with actual data)

**Q2**: Should game track which idioms have been played in current session?  
**A**: No - spec only requires avoiding immediate repeat, not session history tracking

**Q3**: Color accessibility for blue/red buttons on white background?  
**A**: Use Tailwind's blue-500 (#3B82F6) and red-500 (#EF4444) - both pass WCAG AA contrast ratio (4.5:1 minimum)

**Q4**: Performance with 500 items in array?  
**A**: Negligible - modern browsers handle arrays of this size efficiently, no virtualization needed

---

**Research Complete**: All technical unknowns resolved. Ready for Phase 1 (Data Model & Contracts).
