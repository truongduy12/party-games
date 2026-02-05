# Quickstart: Game Mô Tả Thành Ngữ

**Feature**: 002-idiom-game  
**Date**: 2026-02-06  
**For**: Developers implementing the Idiom Description Game

## Prerequisites

✅ **Required** (already completed in feature 001):
- React 18+ with TypeScript 5+
- Vite 5+ configured and running
- Tailwind CSS 3+ installed and configured
- React Router 6+ installed
- ScoreProvider context configured in App.tsx
- Google Sans font loaded via CDN

✅ **Data File** (user provided):
- `data/thanh-ngu-tuc-ngu.json` - 500 Vietnamese idioms

---

## Implementation Phases

### Phase 0: Setup ✅ COMPLETE

- [x] Feature spec created: `specs/002-idiom-game/spec.md`
- [x] Research completed: `specs/002-idiom-game/research.md`
- [x] Data model defined: `specs/002-idiom-game/data-model.md`
- [x] Contract specified: `specs/002-idiom-game/contracts/IdiomGame.md`

### Phase 1: Data & Types (Priority: P1 - MVP)

**Goal**: Prepare data file and TypeScript interfaces

**Files to create**:
1. `src/data/thanh-ngu-tuc-ngu.json` - Move data file from `data/` to `src/data/`
2. `src/games/idiom-game/types.ts` - Type definitions

**Validation**:
```bash
# Verify JSON is valid:
node -e "console.log(JSON.parse(require('fs').readFileSync('src/data/thanh-ngu-tuc-ngu.json')))"

# Check TypeScript compilation:
npm run build
```

**Time estimate**: 5 minutes

---

### Phase 2: Core Game Logic (Priority: P1 - MVP)

**Goal**: Implement main game component with idiom display and navigation

**Files to create**:
1. `src/games/idiom-game/IdiomGame.tsx` - Main component
2. `src/games/idiom-game/utils.ts` - Random selection logic

**Key functionality**:
- ✅ Load idioms from JSON
- ✅ Display random idiom
- ✅ Skip button (change idiom, no score)
- ✅ Score buttons (+10 Blue/Red, change idiom)
- ✅ No-repeat-last constraint

**Test manually**:
1. Navigate to `/idiom-game` (add route first)
2. Verify idiom displays
3. Click skip → new idiom appears
4. Click +10 Blue → score increases, new idiom appears
5. Check header score display updates

**Time estimate**: 30 minutes

---

### Phase 3: Routing Integration (Priority: P2)

**Goal**: Add game to React Router and update home page

**Files to edit**:
1. `src/App.tsx` - Add `/idiom-game` route
2. `src/pages/Home.tsx` - Update first GameCard to link to idiom game

**Changes**:

**App.tsx**:
```tsx
import IdiomGame from '@/games/idiom-game/IdiomGame';

// In <Routes>:
<Route path="/idiom-game" element={<IdiomGame />} />
```

**Home.tsx**:
```tsx
// Update first card (was placeholder):
<GameCard
  title="Mô Tả Thành Ngữ"
  description="Mô tả thành ngữ bằng tiếng Anh cho đội bạn đoán"
  route="/idiom-game"
  status="available"  // Changed from "coming-soon"
/>
```

**Test**:
1. Go to home page
2. Click "Mô Tả Thành Ngữ" card
3. Verify navigation to game
4. Verify game loads and works

**Time estimate**: 10 minutes

---

### Phase 4: Visual Polish (Priority: P2)

**Goal**: Implement transitions, responsive design, accessibility

**Enhancements**:
- ✅ Fade transition (100-150ms) on idiom change
- ✅ Responsive button layout (mobile, tablet, desktop)
- ✅ ARIA labels for screen readers
- ✅ Hover states on buttons
- ✅ Focus rings for keyboard navigation

**Files to update**:
1. `src/games/idiom-game/IdiomGame.tsx` - Add Tailwind transition classes, ARIA attributes

**Test**:
1. DevTools responsive mode → test 320px, 768px, 1024px widths
2. Tab through buttons → verify focus rings
3. Lighthouse accessibility audit → target 95+ score

**Time estimate**: 20 minutes

---

### Phase 5: Error Handling (Priority: P2)

**Goal**: Graceful error handling with retry mechanism

**Functionality**:
- ✅ Catch JSON load failures
- ✅ Display user-friendly error message
- ✅ Retry button to re-attempt load
- ✅ No app crash on error

**Files to update**:
1. `src/games/idiom-game/IdiomGame.tsx` - Add error state and retry UI

**Test scenarios**:
1. Temporarily rename JSON file → verify error UI appears
2. Click retry → verify error persists (file still missing)
3. Restore JSON file → click retry → verify game loads successfully

**Time estimate**: 15 minutes

---

## File Structure (Final State)

```
src/
├── data/
│   └── thanh-ngu-tuc-ngu.json          # 500 Vietnamese idioms
├── games/
│   └── idiom-game/
│       ├── IdiomGame.tsx               # Main game component
│       ├── types.ts                    # TypeScript interfaces
│       └── utils.ts                    # Random selection logic
├── pages/
│   └── Home.tsx                        # Updated with game card link
└── App.tsx                             # Updated with /idiom-game route
```

---

## Development Commands

```bash
# Start dev server
npm run dev

# Navigate to game
# Browser: http://localhost:5173/idiom-game

# Build for production
npm run build

# Preview production build
npm run preview

# Lint check
npm run lint

# Type check
npx tsc --noEmit
```

---

## Testing Checklist

### Functional Requirements

- [ ] **FR-001**: Random idiom displays on page load
- [ ] **FR-003**: "Bỏ qua" button changes idiom without scoring
- [ ] **FR-004**: "+10 Đội Xanh" button adds 10 to blue score
- [ ] **FR-005**: "+10 Đội Đỏ" button adds 10 to red score
- [ ] **FR-006**: Auto-next idiom after scoring
- [ ] **FR-007**: Uses `useScores` hook from scoreManager
- [ ] **FR-008**: Scores persist to localStorage
- [ ] **FR-009**: Random selection (not sequential)
- [ ] **FR-010**: No immediate repeat of last idiom
- [ ] **FR-011**: ScoreDisplay header visible on game page
- [ ] **FR-012**: Game card on home has "available" status
- [ ] **FR-013**: Game card navigates to `/idiom-game`
- [ ] **FR-014**: Error handling with fallback UI
- [ ] **FR-015**: Uses soft black/white palette, Google Sans
- [ ] **FR-016**: Keyboard accessible (tab, enter/space)
- [ ] **FR-017**: Responsive on 320px, 768px, 1024px+
- [ ] **FR-018**: UI text in Vietnamese
- [ ] **FR-019**: Buttons in horizontal row, equal width
- [ ] **FR-020**: Error UI has retry button
- [ ] **FR-021**: Fade transition 100-150ms

### Success Criteria

- [ ] **SC-001**: Game loads in <2s from home page click
- [ ] **SC-002**: Idiom changes in <200ms after button click
- [ ] **SC-003**: 100% score persistence (verify with refresh)
- [ ] **SC-004**: Smooth 60fps when clicking rapidly
- [ ] **SC-005**: Readable on 320px width mobile
- [ ] **SC-006**: Full round (view → score → next) <5s
- [ ] **SC-007**: Screen reader compatible (test with VoiceOver/NVDA)
- [ ] **SC-008**: 0% crash rate (handle all error scenarios)

### Edge Cases

- [ ] JSON load failure → error UI appears
- [ ] Rapid button clicks → no race conditions
- [ ] Single idiom in data → allows repeat
- [ ] Unlimited skip clicks → always random
- [ ] Large score values (9999+) → UI intact
- [ ] Page refresh mid-game → scores persist, new idiom

---

## Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| Bundle Size | <500KB total | `npm run build` (check dist/ size) |
| Initial Load | <3s on 3G | Chrome DevTools Network throttling |
| Lighthouse Performance | >90 | Chrome DevTools Lighthouse |
| Lighthouse Accessibility | >95 | Chrome DevTools Lighthouse |
| Frame Rate | 60fps | Chrome DevTools Performance |

---

## Troubleshooting

### Issue: JSON import error "Cannot find module"

**Solution**: Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

### Issue: "useScores is not defined"

**Solution**: Verify:
1. `ScoreProvider` wraps `<App>` in `main.tsx`
2. Import path is correct: `import { useScores } from '@/lib/scoreManager'`

### Issue: Buttons not equal width on mobile

**Solution**: Check parent container has `w-full` and grid has `grid-cols-3` class

### Issue: Idiom text not fading

**Solution**: Ensure Tailwind transition utilities are applied:
```tsx
<div className="transition-opacity duration-150">
```

### Issue: Score not persisting

**Solution**: Check browser localStorage in DevTools (Application tab). Verify `useScores` hook is calling correct context methods.

---

## Next Steps After Implementation

1. **Run full test checklist** (above)
2. **Lighthouse audit** → target >90 performance, >95 accessibility
3. **Cross-browser test** → Chrome, Safari, Firefox
4. **Mobile device test** → Real iPhone/Android, not just DevTools
5. **Create pull request** → Link to spec, include test results
6. **Update constitution** if new patterns emerge

---

## Quick Reference: Key Files

| File | Purpose |
|------|---------|
| [spec.md](spec.md) | Feature requirements and acceptance criteria |
| [research.md](research.md) | Technical decisions and patterns |
| [data-model.md](data-model.md) | State structure and data flows |
| [contracts/IdiomGame.md](contracts/IdiomGame.md) | Component API and interface |
| Constitution | Design system rules and tech standards |

---

**Total Estimated Time**: ~1.5 hours for full implementation (P1 + P2 features)

**Status**: Ready to start Phase 1 (Data & Types) → Run `/speckit.tasks` to generate detailed task breakdown.
