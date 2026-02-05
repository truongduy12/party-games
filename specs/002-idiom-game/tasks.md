# Tasks: Game Mô Tả Thành Ngữ

**Input**: Design documents from `/specs/002-idiom-game/`
**Prerequisites**: ✅ plan.md, spec.md, research.md, data-model.md, contracts/IdiomGame.md

**Tests**: NOT requested - Manual testing approach per constitution

**Organization**: Tasks grouped by user story to enable independent implementation and testing

---

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **[P]**: Parallelizable (different files, no dependencies)
- **[Story]**: User story label (US1, US2, US3, US4)
- File paths included in all task descriptions

---

## Phase 1: Setup (Project Already Initialized)

**Purpose**: Feature-specific setup

**Status**: ✅ Most setup complete from feature 001-home-scoreboard

- [x] T001 Vite + React + TypeScript project configured
- [x] T002 Tailwind CSS 3+ installed and configured
- [x] T003 React Router 6+ installed
- [x] T004 Google Sans font loaded via CDN
- [x] T005 Design system with soft black/white palette (#1A1A1A/#FAFAFA)
- [x] T006 ScoreProvider context and useScores hook implemented
- [x] T007 ESLint configured with inline style prohibition

**New setup for this feature**:

- [x] T008 Create `src/games/idiom-game/` directory structure
- [x] T009 Move `data/thanh-ngu-tuc-ngu.json` to `src/data/thanh-ngu-tuc-ngu.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure needed before game implementation

**⚠️ CRITICAL**: Complete before any user story implementation begins

- [x] T010 [P] Create TypeScript interfaces in `src/games/idiom-game/types.ts` (Idiom, GameState)
- [x] T011 [P] Implement random selection utility with no-repeat logic in `src/games/idiom-game/utils.ts`
- [x] T012 Validate JSON data structure on import (array non-empty, valid id/content fields)

**Checkpoint**: ✅ Foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Hiển Thị Thành Ngữ Ngẫu Nhiên (Priority: P1) 🎯 MVP

**Goal**: Display random Vietnamese idiom from 500-item dataset when game page loads

**Independent Test**: Navigate to `/idiom-game` (manually via URL), verify random idiom displays, refresh page multiple times to confirm randomness

### Implementation for User Story 1

- [x] T013 [US1] Create main IdiomGame component scaffold in `src/games/idiom-game/IdiomGame.tsx` with basic structure
- [x] T014 [US1] Implement JSON data loading with ES6 import in `src/games/idiom-game/IdiomGame.tsx`
- [x] T015 [US1] Add state management (currentIdiom, previousIdiomId, isLoading, hasError) in IdiomGame component
- [x] T016 [US1] Implement initial random idiom selection on component mount
- [x] T017 [US1] Create idiom display UI with large centered text using Tailwind (text-2xl mobile, text-4xl desktop)
- [x] T018 [US1] Apply Google Sans font and soft black color (#1A1A1A) to idiom text
- [x] T019 [US1] Add fade transition (100-150ms opacity) on idiom change using Tailwind transition utilities
- [x] T020 [US1] Test responsive display on 320px, 768px, 1024px+ widths

**Checkpoint**: Random idiom displays on page load with proper styling and transitions

---

## Phase 4: User Story 2 - Bỏ Qua Câu Hiện Tại (Priority: P2)

**Goal**: Add skip button to change idiom without affecting score

**Independent Test**: Load game, note current idiom, click "Bỏ qua" button, verify new idiom appears and score unchanged in header

### Implementation for User Story 2

- [x] T021 [US2] Create "Bỏ qua" button in horizontal layout (will be part of 3-button grid later)
- [x] T022 [US2] Implement handleSkip function that updates previousIdiomId and calls getRandomIdiom
- [x] T023 [US2] Wire "Bỏ qua" button onClick to handleSkip
- [x] T024 [US2] Apply gray outline styling (border-gray-300, hover:border-gray-400) to "Bỏ qua" button
- [x] T025 [US2] Add ARIA label "Bỏ qua câu hiện tại" to skip button
- [x] T026 [US2] Test skip button changes idiom without score change (verify header score display)
- [x] T027 [US2] Verify no immediate repeat: click skip multiple times, previous idiom not shown consecutively

**Checkpoint**: Skip button functional, idiom changes without scoring

---

## Phase 5: User Story 3 - Cộng Điểm Cho Đội (Priority: P1) 🎯 MVP

**Goal**: Add +10 score buttons for both teams with auto-advance to next idiom

**Independent Test**: Load game, note score (e.g., 0-0), click "+10 Đội Xanh", verify blue score increases to 10 in header, new idiom appears, score persists after page refresh

### Implementation for User Story 3

- [x] T028 [US3] Import useScores hook from `src/lib/scoreManager.tsx` in IdiomGame component
- [x] T029 [P] [US3] Create "+10 Đội Xanh" button with blue styling (bg-blue-500, hover:bg-blue-600, text-white)
- [x] T030 [P] [US3] Create "+10 Đội Đỏ" button with red styling (bg-red-500, hover:bg-red-600, text-white)
- [x] T031 [US3] Implement handleBlueScore function: call addBlueScore(10), then load next idiom
- [x] T032 [US3] Implement handleRedScore function: call addRedScore(10), then load next idiom
- [x] T033 [US3] Wire "+10 Đội Xanh" button onClick to handleBlueScore
- [x] T034 [US3] Wire "+10 Đội Đỏ" button onClick to handleRedScore
- [x] T035 [US3] Arrange all 3 buttons (Bỏ qua, +10 Xanh, +10 Đỏ) in CSS Grid horizontal row (grid-cols-3 gap-4)
- [x] T036 [US3] Ensure buttons have 48px minimum height (h-12) for touch targets
- [x] T037 [US3] Add ARIA labels: "Cộng 10 điểm cho Đội Xanh" and "Cộng 10 điểm cho Đội Đỏ"
- [x] T038 [US3] Add ScoreDisplay component to game page layout (import from `src/components/ScoreDisplay.tsx`)
- [x] T039 [US3] Test blue score button: verify +10 points, new idiom, localStorage persistence (check after refresh)
- [x] T040 [US3] Test red score button: verify +10 points, new idiom, localStorage persistence
- [x] T041 [US3] Verify auto-advance: clicking score button loads new idiom with no manual action needed

**Checkpoint**: Both score buttons functional, scores persist, auto-advance works

---

## Phase 6: User Story 4 - Truy Cập Game Từ Home Page (Priority: P2)

**Goal**: Enable navigation from home page to idiom game

**Independent Test**: Go to http://localhost:5173/, click "Mô Tả Thành Ngữ" card, verify navigation to `/idiom-game` and game loads

### Implementation for User Story 4

- [x] T042 [US4] Add `/idiom-game` route to React Router in `src/App.tsx` with IdiomGame component
- [x] T043 [US4] Update first GameCard in `src/pages/Home.tsx` with title "Mô Tả Thành Ngữ"
- [x] T044 [US4] Set GameCard description to "Mô tả thành ngữ bằng tiếng Anh cho đội bạn đoán"
- [x] T045 [US4] Set GameCard route to "/idiom-game"
- [x] T046 [US4] Change GameCard status from "coming-soon" to "available"
- [x] T047 [US4] Test navigation: click card on home page, verify route change and game loads
- [x] T048 [US4] Verify ScoreDisplay header persists across home ↔ game navigation

**Checkpoint**: Full navigation flow working, game accessible from home page

---

## Phase 7: Polish & Cross-Cutting Concerns (Priority: P2)

**Purpose**: Error handling, accessibility, performance, and final validation

### Error Handling

- [x] T049 [P] Implement try-catch for JSON data loading with error state management in IdiomGame
- [x] T050 [P] Create error UI component: "Không thể tải dữ liệu thành ngữ" message with "Thử lại" button
- [x] T051 Implement retry mechanism: clicking "Thử lại" re-attempts data load without page refresh
- [x] T052 Test error scenario: temporarily rename JSON file, verify error UI, restore and test retry

### Accessibility & Keyboard Navigation

- [x] T053 [P] Verify tab order: Bỏ qua → +10 Đội Xanh → +10 Đội Đỏ
- [x] T054 [P] Test keyboard activation: Enter and Space keys trigger button onClick
- [x] T055 [P] Add focus rings to all buttons (Tailwind default focus:ring)
- [x] T056 Test with screen reader (VoiceOver/NVDA): verify ARIA labels announce correctly

### Performance & Optimization

- [ ] T057 Run Lighthouse audit: target >90 performance, >95 accessibility
- [ ] T058 Test on 3G throttling: verify <2s load time from home page click
- [ ] T059 Test rapid clicking: verify 60fps, no race conditions, smooth transitions
- [ ] T060 Verify bundle size impact: run `npm run build`, confirm total <500KB

### Edge Cases & Final Validation

- [ ] T061 Test single idiom scenario: temporarily reduce JSON to 1 item, verify game allows repeat
- [ ] T062 Test large scores: add 9999 points, verify UI doesn't break layout
- [ ] T063 Test page refresh mid-game: verify scores persist, new random idiom loads
- [ ] T064 Run full checklist from `quickstart.md`: all 21 FRs and 8 SCs
- [ ] T065 Cross-browser testing: Chrome, Safari, Firefox on desktop
- [ ] T066 Real device testing: iPhone and Android, verify touch targets and layout

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)**: T008-T009 - No blockers, can start immediately
2. **Foundational (Phase 2)**: T010-T012 - Depends on Setup - **BLOCKS all user stories**
3. **User Story 1 (Phase 3)**: T013-T020 - Depends on Foundational - Can run **independently**
4. **User Story 2 (Phase 4)**: T021-T027 - Depends on Foundational + US1 UI scaffold - Can integrate with US1
5. **User Story 3 (Phase 5)**: T028-T041 - Depends on Foundational + US1 UI + US2 skip button - Completes MVP
6. **User Story 4 (Phase 6)**: T042-T048 - Depends on US1-US3 complete (full game functional)
7. **Polish (Phase 7)**: T049-T066 - Depends on all user stories complete

### User Story Completion Order

**MVP Path** (P1 features only):
1. Setup → Foundational → **US1** (display) → **US3** (scoring) → Validate MVP
2. Total: ~9 tasks (T008-T012 + US1 core + US3 core)

**Full Feature Path** (P1 + P2):
1. Setup → Foundational → US1 → US2 (skip) → US3 (scoring) → US4 (navigation) → Polish
2. Total: 66 tasks

### Within Each User Story

- **US1**: T013 (scaffold) → T014-T016 (data/state) → T017-T020 (UI/styling) - Sequential
- **US2**: T021-T022 (button logic) → T023-T027 (styling/testing) - Sequential
- **US3**: T028 (import hook) → T029-T030 **[P]** (buttons) → T031-T034 (handlers) → T035-T041 (layout/integration)
- **US4**: T042-T046 **[P]** (routing + home update) → T047-T048 (testing)
- **Polish**: T049-T050 **[P]** (error UI) → Tests can run in parallel

### Parallel Opportunities

**Phase 2 (Foundational)**:
- T010 (types) and T011 (utils) can run in **parallel** ✅

**Phase 5 (US3)**:
- T029 (+10 Blue button) and T030 (+10 Red button) can run in **parallel** ✅

**Phase 6 (US4)**:
- T042 (route), T043-T046 (home updates) can run in **parallel** ✅

**Phase 7 (Polish)**:
- T049 (error try-catch) and T050 (error UI) can run in **parallel** ✅
- T053 (tab order), T054 (keyboard), T055 (focus) can run in **parallel** ✅

---

## Parallel Example: User Story 3 (Scoring)

```bash
# Can run in parallel (different aspects):
T029: Create "+10 Đội Xanh" button with blue styling
T030: Create "+10 Đội Đỏ" button with red styling

# Must run sequentially:
T028: Import useScores hook (first)
T031-T034: Implement handlers (after hook import)
T035: Layout all buttons (after buttons exist)
```

---

## Implementation Strategy

### MVP First (P1 User Stories Only)

**Goal**: Get playable game with scoring ASAP

1. ✅ Complete Phase 1: Setup (T008-T009) - **5 min**
2. ✅ Complete Phase 2: Foundational (T010-T012) - **10 min**
3. ✅ Complete Phase 3: User Story 1 (T013-T020) - **30 min**
4. ✅ Complete Phase 5: User Story 3 (T028-T041) - **35 min**
5. **STOP and VALIDATE**: Test MVP independently (display + scoring works)
6. Deploy/demo if ready

**Total MVP Time**: ~1.5 hours

### Incremental Delivery (All Features)

1. MVP (US1 + US3) → **Test independently** → Deploy ✅
2. Add US2 (Skip) → **Test independently** → Deploy
3. Add US4 (Navigation) → **Test independently** → Deploy
4. Add Polish (Error handling, accessibility) → **Final validation** → Deploy

**Total Full Feature Time**: ~3 hours

### Parallel Team Strategy

With 2 developers:
1. Both complete Setup + Foundational together (20 min)
2. Once Foundational done:
   - **Dev A**: User Story 1 (display) - 30 min
   - **Dev B**: User Story 3 (prepare handlers/buttons) - start when US1 UI ready
3. Integrate US1 + US3 for MVP
4. Split remaining: Dev A does US2, Dev B does US4
5. Both collaborate on Polish phase

---

## Notes

- **[P]** = Tasks can run in parallel (different files, no data dependencies)
- **[Story]** = Maps task to user story for traceability (US1-US4)
- Each user story independently completable and testable per spec requirements
- No tests written (manual testing approach per constitution)
- Commit after each logical group or phase completion
- Stop at any checkpoint to validate story independently
- Focus on MVP first (US1 + US3), then add enhancements (US2 + US4 + Polish)

---

## Task Count Summary

- **Phase 1 (Setup)**: 2 tasks (T008-T009)
- **Phase 2 (Foundational)**: 3 tasks (T010-T012)
- **Phase 3 (US1)**: 8 tasks (T013-T020)
- **Phase 4 (US2)**: 7 tasks (T021-T027)
- **Phase 5 (US3)**: 14 tasks (T028-T041)
- **Phase 6 (US4)**: 7 tasks (T042-T048)
- **Phase 7 (Polish)**: 18 tasks (T049-T066)

**Total**: 59 tasks

**MVP Subset** (P1 only): ~20 tasks (Setup + Foundational + US1 + US3)
**Full Feature**: 59 tasks (all user stories + polish)
