# Research: Ai là gián điệp

**Feature**: `001-ai-la-gian-diep` | **Date**: 2026-02-12

## Decisions & Rationale

### 1. Score Display Handling
**Decision**: Conditionally render `ScoreDisplay` in `App.tsx` based on the current route.
**Rationale**: 
- The "Ai là gián điệp" game explicitly requires NO scoring UI (FR-007).
- `ScoreDisplay` is currently a global component in `App.tsx`.
- Modifying `App.tsx` to check `location.pathname` is the least intrusive way to hide it for specific routes without altering the component's internal logic or creating complex layouts for a simple app.
**Alternatives Considered**:
- passing a prop to `ScoreDisplay`: Requires `ScoreDisplay` to be aware of routing context or `App` to manage it. Similar to chosen approach but `useLocation` in `App` is more direct.
- CSS hiding: Cleaner JS logic but "display: none" might still affect accessibility tree. Conditional rendering is better.

### 2. State Management
**Decision**: Use `React.useState` and `React.useReducer` within the main `AiLaGianDiep` component, passing state down to sub-components (`SetupScreen`, `RoleReveal`, `Discussion`).
**Rationale**:
- Game state is local and ephemeral (one session).
- Complexity is low ( < 4 screens, linear flow).
- No need for global state managers like Zustand or Redux for this isolated feature.

### 3. Data Loading
**Decision**: Direct import of `data/ai-la-gian-diep.json`.
**Rationale**:
- Data is static and small.
- No need for async fetching or API calls.
- Keeps deployment static-friendly.

## Open Questions

None. Specification is clear and technical path is validated against Constitution.
