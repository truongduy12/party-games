# Tasks: King's Cup

## Phase 1: Setup & Logic
- [ ] T001 Install dependencies: `@heruka_urgyen/react-playing-cards`, `lucide-react` <!-- id: 100 -->
- [ ] T002 Create `src/games/kings-cup/types.ts` with Card, Rule, GameState interfaces <!-- id: 101 -->
- [ ] T003 Create `src/lib/deck.ts` (or game-specific util) for Fisher-Yates shuffle <!-- id: 102 -->
- [ ] T004 Create `src/games/kings-cup/gameLogic.ts` (reducer/context) for state management and local storage syncing <!-- id: 103 -->
- [ ] T005 [P] Register game in `src/config/games.ts` (already done, verify) <!-- id: 104 -->

## Phase 2: Core Components
- [ ] T006 Create `src/games/kings-cup/components/CardDeck.tsx` to render the deck and handle drawing <!-- id: 105 -->
- [ ] T007 Create `src/games/kings-cup/components/CardReveal.tsx` to show drawn card and rule <!-- id: 106 -->
- [ ] T008 Create `src/games/kings-cup/components/KingsWheel.tsx` modal with spinning animation <!-- id: 107 -->

## Phase 3: Integration
- [ ] T009 Create `src/games/kings-cup/KingsCup.tsx` main container assembly <!-- id: 108 -->
- [ ] T010 Implement "Game Over" screen with Reset functionality <!-- id: 109 -->
- [ ] T011 Verify persistence (refresh page check) <!-- id: 110 -->

## Phase 4: Polish
- [ ] T012 Add "Double Next Card" visual indicator <!-- id: 111 -->
- [ ] T013 Polish King's Wheel animation and confetti effects (optional) <!-- id: 112 -->
- [ ] T014 Final Constitution Check & Linting <!-- id: 113 -->
