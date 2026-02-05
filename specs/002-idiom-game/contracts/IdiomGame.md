# Component Contract: IdiomGame

**Type**: React Functional Component (Game Module)  
**Path**: `src/games/idiom-game/IdiomGame.tsx`  
**Date**: 2026-02-06

## Interface

### Props

```typescript
interface IdiomGameProps {
  // No props required - game is self-contained
}
```

**Justification**: Game operates independently, all data loaded internally, scores managed via global context.

---

### Exports

```typescript
export default function IdiomGame(): JSX.Element;
```

**Usage**:
```tsx
import IdiomGame from '@/games/idiom-game/IdiomGame';

// In router configuration:
<Route path="/idiom-game" element={<IdiomGame />} />
```

---

## Public API

### Component Behavior

**On Mount**:
1. Load idioms from static JSON import
2. Validate data structure
3. Select random initial idiom
4. Render game UI with current idiom

**User Interactions**:

| Action | Trigger | Behavior | Side Effects |
|--------|---------|----------|--------------|
| Skip | Click "Bỏ qua" button | Display new random idiom (not same as previous) | None (no score change) |
| Score Blue | Click "+10 Đội Xanh" button | Add 10 points to blue team, display new idiom | Updates global score, persists to localStorage |
| Score Red | Click "+10 Đội Đỏ" button | Add 10 points to red team, display new idiom | Updates global score, persists to localStorage |
| Retry | Click "Thử lại" (on error) | Re-attempt data load, return to game UI | Clears error state |

---

## Dependencies

### Internal Dependencies

```typescript
// Hooks
import { useScores } from '@/lib/scoreManager';

// Types
import type { Idiom } from './types';

// Data
import idiomsData from '@/data/thanh-ngu-tuc-ngu.json';
```

### External Dependencies

**Global Context Required**:
- `ScoreProvider` from `src/lib/scoreManager.tsx` must wrap app (already configured in feature 001)

**Router Configuration**:
- React Router v6+ must have route: `<Route path="/idiom-game" element={<IdiomGame />} />`

---

## State Contract

### Internal State

```typescript
// Component manages these states internally:
const [currentIdiom, setCurrentIdiom] = useState<Idiom | null>(null);
const [previousIdiomId, setPreviousIdiomId] = useState<number | null>(null);
const [isLoading, setIsLoading] = useState(true);
const [hasError, setHasError] = useState(false);
```

**State Lifecycle**:
- Initialized on component mount
- Reset on component unmount
- NOT persisted across page reloads

### External State (Read/Write)

```typescript
// Accessed via useScores() hook:
const { addBlueScore, addRedScore } = useScores();

// Modifications:
addBlueScore(10);  // Increments blue team score by 10
addRedScore(10);   // Increments red team score by 10
```

**State Persistence**: Handled automatically by scoreManager (localStorage)

---

## UI Contract

### Layout Structure

```
┌─────────────────────────────────────┐
│  [ScoreDisplay - from feature 001]  │  ← Global header (outside component)
├─────────────────────────────────────┤
│                                     │
│         [Idiom Text Display]        │  ← Large, centered, readable
│      (fade transition on change)    │
│                                     │
├─────────────────────────────────────┤
│ ┌──────┐ ┌──────────┐ ┌──────────┐ │
│ │ Bỏ   │ │ +10 Đội  │ │ +10 Đội  │ │  ← 3 equal-width buttons
│ │ qua  │ │  Xanh    │ │   Đỏ     │ │     horizontal row
│ └──────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────┘

Error State:
┌─────────────────────────────────────┐
│                                     │
│  Không thể tải dữ liệu thành ngữ   │
│                                     │
│         ┌──────────┐                │
│         │ Thử lại  │                │
│         └──────────┘                │
└─────────────────────────────────────┘
```

### Visual Specifications

**Idiom Display**:
- Font: Google Sans (inherited from design system)
- Size: Large (responsive, e.g., text-2xl on mobile, text-4xl on desktop)
- Color: Soft black (#1A1A1A)
- Alignment: Center
- Transition: 100-150ms opacity fade

**Buttons**:
- Layout: CSS Grid (`grid-cols-3`)
- Height: 48px minimum (touch target accessibility)
- Spacing: 16px gap between buttons
- Border radius: 8px (rounded)

**Button Colors**:
- "Bỏ qua": Gray outline (`border-gray-300`, `hover:border-gray-400`)
- "+10 Đội Xanh": Blue solid (`bg-blue-500`, `hover:bg-blue-600`)
- "+10 Đội Đỏ": Red solid (`bg-red-500`, `hover:bg-red-600`)

**Responsive Breakpoints**:
- Mobile (320px+): Stack vertically if needed, maintain 48px button height
- Tablet (768px+): Horizontal layout
- Desktop (1024px+): Max-width container (e.g., max-w-2xl)

---

## Accessibility Contract

### Keyboard Navigation

```typescript
// Tab order:
1. "Bỏ qua" button
2. "+10 Đội Xanh" button  
3. "+10 Đội Đỏ" button

// Activation:
- Enter or Space key triggers button onClick
```

### ARIA Labels

```tsx
<button aria-label="Bỏ qua câu hiện tại">Bỏ qua</button>
<button aria-label="Cộng 10 điểm cho Đội Xanh">+10 Đội Xanh</button>
<button aria-label="Cộng 10 điểm cho Đội Đỏ">+10 Đội Đỏ</button>

<div role="status" aria-live="polite">
  {currentIdiom?.content}  // Screen reader announces idiom changes
</div>
```

### Focus Management

- Visible focus rings on all buttons (Tailwind default `focus:ring`)
- No keyboard traps
- Logical tab order (left to right)

---

## Performance Contract

### Metrics (from Success Criteria)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial Load | <2s from home page click | Time to interactive |
| Idiom Change | <200ms transition | Click to new idiom visible |
| Button Response | <100ms visual feedback | Hover/click to state change |
| Frame Rate | 60fps during transitions | DevTools performance profiler |

### Optimization Strategies

- ✅ Static JSON import (bundled, no network request)
- ✅ Simple state updates (no complex computations)
- ✅ CSS transitions (GPU-accelerated)
- ✅ No unnecessary re-renders (React.memo not needed for single component)

---

## Error Handling Contract

### Error States

```typescript
type ErrorType = 
  | 'DATA_LOAD_FAILED'    // JSON import/validation error
  | 'EMPTY_DATA'          // Array length === 0
  | 'INVALID_STRUCTURE';  // Missing id/content fields
```

### Error UI

**Display Conditions**:
- `hasError === true`

**User Actions**:
- Retry button: Re-attempt data load
- No automatic error dismissal

**Error Message** (Vietnamese):
```
Không thể tải dữ liệu thành ngữ
[Thử lại]
```

### Recovery Flow

```
Error State
    ↓
User clicks "Thử lại"
    ↓
setHasError(false)
setIsLoading(true)
    ↓
Re-run data load logic
    ↓
Success → Normal game UI
Failure → Return to error state
```

---

## Testing Contract

### Unit Test Coverage (if testing requested)

```typescript
describe('IdiomGame', () => {
  test('displays random idiom on mount', () => {});
  test('changes idiom on skip button click', () => {});
  test('calls addBlueScore(10) on blue button click', () => {});
  test('calls addRedScore(10) on red button click', () => {});
  test('loads new idiom after scoring', () => {});
  test('does not repeat previous idiom', () => {});
  test('shows error UI when data fails to load', () => {});
  test('retry button re-attempts data load', () => {});
});
```

### Manual Test Scenarios (from spec)

1. ✅ Initial load shows random idiom
2. ✅ Skip button changes idiom without score change
3. ✅ Blue button adds 10 to blue score and changes idiom
4. ✅ Red button adds 10 to red score and changes idiom
5. ✅ Previous idiom not immediately repeated
6. ✅ Scores persist after page refresh
7. ✅ Error UI displays on data load failure
8. ✅ Retry button works after error

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-06 | Initial contract definition |

---

**Contract Status**: ✅ Complete - Ready for implementation
