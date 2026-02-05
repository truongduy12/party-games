# Implementation Plan: Game Mô Tả Thành Ngữ

**Branch**: `002-idiom-game` | **Date**: 2026-02-06 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-idiom-game/spec.md`

## Summary

**Primary Requirement**: Implement a Vietnamese idiom description game where players describe idioms in English for their team to guess. Game displays random idioms from a 500-item dataset, allows skipping without scoring, and awards +10 points to either team with auto-advance to next idiom.

**Technical Approach**: React functional component using static JSON import for idiom data, CSS Grid for horizontal button layout (Bỏ qua, +10 Blue, +10 Red), Tailwind CSS fade transitions (100-150ms), and integration with existing global score context from feature 001. No new dependencies required.

## Technical Context

**Language/Version**: TypeScript 5+ with React 18+
**Build Tool**: Vite 5+
**Primary Dependencies**: React Router 6+ (routing), NO new dependencies required
**Storage**: localStorage for score persistence (via existing scoreManager context), no game state persistence
**Testing**: Manual testing (default approach per constitution)
**Target Platform**: Modern browsers (Chrome 90+, Safari 14+, Firefox 88+), Mobile-first responsive (320px+)
**Design System**: Soft black (#1A1A1A) / soft white (#FAFAFA) palette, Google Sans font, Tailwind CSS utilities
**Performance Goals**: <2s game load, <200ms idiom transitions, 60fps, <500KB bundle (no significant impact expected)
**Constraints**: Static hosting only, client-side only, no server dependencies, no inline styles (Tailwind enforced)
**Scale/Scope**: Single game module (idiom description), self-contained with clear entry/exit points

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| **Game-First Architecture** | Game/feature is self-contained module with clear entry/exit points | ✅ PASS |
| **Visual Consistency** | Design uses only black/white/grayscale + Google Sans | ✅ PASS |
| **Static-First Deployment** | No server-side dependencies, client-side only | ✅ PASS |
| **Component Reusability** | Shared components have TypeScript interfaces, independently testable | ✅ PASS |
| **Performance & Accessibility** | Targets <3s load, 60fps, WCAG AA compliance | ✅ PASS |
| **Styling Architecture** | No inline styles, uses shared components, CSS separation enforced | ✅ PASS |

**Constitution Compliance**: ✅ **PASS** - All principles satisfied

**Details**:
- ✅ **Game-First**: Idiom game is independent module at `/idiom-game` route, uses global score context but otherwise self-contained
- ✅ **Visual Consistency**: Uses Tailwind soft black/white palette (#1A1A1A/#FAFAFA), Google Sans font, blue/red accents for team buttons only
- ✅ **Static-First**: JSON data bundled via Vite import, no server calls, fully client-side
- ✅ **Component Reusability**: Leverages existing ScoreProvider, ScoreDisplay, GameCard; new component has TypeScript interfaces
- ✅ **Performance & Accessibility**: Targets <2s load (stricter than constitution), 60fps transitions, WCAG AA with ARIA labels, keyboard nav
- ✅ **Styling Architecture**: Tailwind CSS only, no inline styles, ESLint rule enforced from feature 001

**Re-check after Phase 1**: ✅ **PASS** - Design maintains all constitutional principles. Horizontal button layout with CSS Grid uses Tailwind utilities, fade transition via Tailwind classes, all patterns align with established architecture.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── data/
│   └── thanh-ngu-tuc-ngu.json          # 500 Vietnamese idioms (user-provided data)
├── games/
│   └── idiom-game/
│       ├── IdiomGame.tsx               # Main game component
│       ├── types.ts                    # TypeScript interfaces (Idiom, GameState)
│       └── utils.ts                    # Random selection logic
├── components/                         # Existing shared components (reused)
│   ├── GameCard.tsx                    # Used on home page
│   └── ScoreDisplay.tsx                # Global score header
├── lib/                                # Existing utilities (reused)
│   └── scoreManager.tsx                # Global score context (useScores hook)
├── pages/
│   └── Home.tsx                        # UPDATED: Link first card to idiom game
├── App.tsx                             # UPDATED: Add /idiom-game route
└── main.tsx                            # Existing entry point (no changes)

public/                                 # Static assets (no changes needed)
```

**Structure Decision**: Following Party Games standard React + Vite structure with game modules in `src/games/[game-name]/`. Idiom game is fully self-contained in `idiom-game/` folder. Reuses existing score management infrastructure and shared components. JSON data placed in `src/data/` for Vite bundling optimization.

## Complexity Tracking

No constitutional violations detected. This section intentionally left empty.

---

## Phase Completion Status

### Phase 0: Outline & Research ✅ COMPLETE

**Generated Artifacts**:
- ✅ [research.md](research.md) - All technical unknowns resolved (6 decisions documented)

**Research Decisions**:
1. JSON Data Loading → ES6 import with type assertion (Vite-native)
2. Random Selection → Filter + Math.random() with previousId tracking
3. Fade Transitions → Tailwind CSS transition utilities (100-150ms)
4. Error Handling → Try-catch with error state + retry button
5. Button Layout → CSS Grid (grid-cols-3) with 48px touch targets
6. Score Integration → useScores hook from existing scoreManager

**NEEDS CLARIFICATION Count**: 0 - All unknowns resolved

---

### Phase 1: Design & Contracts ✅ COMPLETE

**Generated Artifacts**:
- ✅ [data-model.md](data-model.md) - Entity definitions, state management, data flows
- ✅ [contracts/IdiomGame.md](contracts/IdiomGame.md) - Component API and interface specification
- ✅ [quickstart.md](quickstart.md) - Developer implementation guide

**Key Deliverables**:
- **Entities**: Idiom (id, content), GameState (currentIdiom, previousIdiomId, isLoading, hasError)
- **Contracts**: Component interface, dependencies, state management, UI/UX specs, accessibility requirements
- **Quickstart**: 5-phase implementation roadmap (~1.5hr estimate)

**Agent Context Update**: ✅ GitHub Copilot context file updated with:
- Language: TypeScript 5+ with React 18+
- Framework: React Router 6+ (routing)
- Storage: localStorage (via scoreManager)

**Constitution Re-check**: ✅ **PASS** - All 6 principles maintained in design

---

## Next Steps

**Command**: ✅ `/speckit.tasks` **COMPLETE**

**Generated**: `specs/002-idiom-game/tasks.md` with:
- ✅ 59 tasks organized by user story priority
- ✅ Acceptance criteria per phase checkpoint
- ✅ Task dependencies and parallel opportunities documented
- ✅ Time estimates: ~1.5hr MVP, ~3hr full feature

**Ready to Implement**: ✅ Yes - All planning complete, tasks ready for execution

**Next Action**: Begin implementation following [tasks.md](tasks.md) starting with Phase 1 (Setup)

---

## Documentation Index

| Document | Purpose | Status |
|----------|---------|--------|
| [spec.md](spec.md) | Feature requirements, user stories, success criteria | ✅ Complete |
| [research.md](research.md) | Technical decisions and implementation patterns | ✅ Complete |
| [data-model.md](data-model.md) | Data structures, state management, flows | ✅ Complete |
| [contracts/IdiomGame.md](contracts/IdiomGame.md) | Component API, interface, testing contract | ✅ Complete |
| [quickstart.md](quickstart.md) | Developer implementation guide | ✅ Complete |
| [plan.md](plan.md) | This file - implementation plan overview | ✅ Complete |
| [tasks.md](tasks.md) | Detailed task breakdown | ✅ Complete |

---

**Plan Status**: ✅ **COMPLETE** - Ready for task generation and implementation
