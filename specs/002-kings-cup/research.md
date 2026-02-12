# Research: King's Cup Implementation

## Decision: Card Rendering Library
- **Context**: Need to render standard playing cards.
- **Option A**: `@heruka_urgyen/react-playing-cards` (Requested by user).
- **Option B**: Custom SVG implementation.
- **Decision**: Use `@heruka_urgyen/react-playing-cards` as requested, but wrap in a container to control sizing and responsiveness via Tailwind.

## Decision: Wheel Animation
- **Context**: "King's Wheel" requires a spinning animation with 5 segments.
- **Option A**: External library (e.g., `react-roulette-pro`).
- **Option B**: Custom CSS/SVG implementation.
- **Decision**: **Custom CSS/SVG**. 
- **Rationale**: 
  - Keeps bundle size low (Constitution III).
  - Full control over styling to match specific Black/White aesthetic (Constitution II).
  - Simple 5-segment logic is easy to implement with CSS transforms.

## Decision: Persistence Strategy
- **Context**: Persistence required for refresh survival.
- **Choice**: `localStorage` with `useEffect` sync.
- **Key**: `party-games-kings-cup-v1`.
- **Structure**: serialized `GameState` object.
