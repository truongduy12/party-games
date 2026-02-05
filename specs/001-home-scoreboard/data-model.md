# Data Model: Home Page with Team Scoreboard

**Feature**: 001-home-scoreboard  
**Date**: 2026-02-05  
**Purpose**: Define entities, relationships, and state management for home page and scoreboard

---

## Entity Overview

This feature involves three primary entities:
1. **TeamScores** - Persistent score data for Blue and Red teams
2. **GameCardData** - Metadata for each game card displayed on home page
3. **ScoreDisplayState** - UI state for the always-visible score display

---

## Entity 1: TeamScores

**Purpose**: Represents the cumulative points for both teams, persisted across browser sessions

### Fields

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `blue` | `number` | >= 0, integer | Blue Team's current score |
| `red` | `number` | >= 0, integer | Red Team's current score |

### TypeScript Interface

```typescript
interface TeamScores {
  blue: number;
  red: number;
}
```

### Validation Rules

- Both scores MUST be non-negative integers
- Scores MUST be initialized to 0 if no localStorage data exists
- Invalid/corrupted localStorage data MUST default to { blue: 0, red: 0 }
- Score addition MUST accept only positive integers
- Maximum score: No explicit limit, but UI should handle up to 999,999 without layout breaks

### Storage

- **Primary Storage**: `localStorage` key `party-games-scores`
- **Format**: JSON string `{"blue":10,"red":15}`
- **Fallback**: In-memory state if localStorage fails
- **Persistence Trigger**: Immediately after any score change (add or reset)

### State Transitions

```
Initial State: { blue: 0, red: 0 }
  ↓
[addBlueScore(5)]
  ↓
Updated State: { blue: 5, red: 0 }
  ↓
[addRedScore(3)]
  ↓
Updated State: { blue: 5, red: 3 }
  ↓
[resetScores()] (only callable from home page)
  ↓
Reset State: { blue: 0, red: 0 }
```

---

## Entity 2: GameCardData

**Purpose**: Represents metadata for a single game card displayed on the home page

### Fields

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | `string` | unique, non-empty | Unique identifier for the game |
| `title` | `string` | non-empty | Display name of the game |
| `status` | `'coming-soon' \| 'available'` | enum | Current availability status |
| `icon` | `string` | valid path/URL | Path to game icon/image |
| `route` | `string \| null` | valid route or null | Navigation route (null if coming-soon) |

### TypeScript Interface

```typescript
type GameStatus = 'coming-soon' | 'available';

interface GameCardData {
  id: string;
  title: string;
  status: GameStatus;
  icon: string;
  route: string | null;
}
```

### Initial Data (6 Placeholder Cards)

```typescript
const PLACEHOLDER_GAMES: GameCardData[] = [
  {
    id: 'game-1',
    title: 'Game 1',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
  {
    id: 'game-2',
    title: 'Game 2',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
  {
    id: 'game-3',
    title: 'Game 3',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
  {
    id: 'game-4',
    title: 'Game 4',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
  {
    id: 'game-5',
    title: 'Game 5',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
  {
    id: 'game-6',
    title: 'Game 6',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
];
```

### Validation Rules

- `id` MUST be unique across all cards
- `title` MUST not be empty
- `status` MUST be one of the defined enum values
- `icon` MUST point to a valid asset (validation at runtime via 404 handling)
- `route` MUST be null when status is 'coming-soon'
- `route` MUST be non-null when status is 'available'

### Storage

- **Initial MVP**: Hardcoded array in source code
- **Future**: Could be moved to JSON file or API endpoint

---

## Entity 3: ScoreDisplayState

**Purpose**: UI state for the always-visible score display header

### Fields

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `isVisible` | `boolean` | - | Whether score display is shown (always true for MVP) |
| `animationState` | `'idle' \| 'updating'` | enum | Animation state for score changes |

### TypeScript Interface

```typescript
type AnimationState = 'idle' | 'updating';

interface ScoreDisplayState {
  isVisible: boolean;
  animationState: AnimationState;
}
```

### Default State

```typescript
const defaultScoreDisplayState: ScoreDisplayState = {
  isVisible: true,
  animationState: 'idle',
};
```

### State Transitions

```
Default: { isVisible: true, animationState: 'idle' }
  ↓
[Score changes]
  ↓
Updating: { isVisible: true, animationState: 'updating' }
  ↓
[Animation complete (100ms)]
  ↓
Back to Idle: { isVisible: true, animationState: 'idle' }
```

---

## Relationships

### Entity Relationship Diagram

```
TeamScores (1) ←─── manages ───→ (1) ScoreDisplayState
                                      ↑
                                      │ displays
                                      │
                                  (1) App.tsx
                                      │
                                      │ renders
                                      ↓
                                  (1) Home.tsx
                                      │
                                      │ contains
                                      ↓
                                  (6) GameCardData
```

**Relationships**:
- `TeamScores` ↔ `ScoreDisplayState`: 1:1 - One score state drives one display state
- `Home.tsx` ↔ `GameCardData`: 1:N - Home page renders multiple game cards
- `App.tsx` renders `ScoreDisplayState` globally (visible on all pages)

---

## State Management Architecture

### React Context Structure

```typescript
// src/lib/scoreManager.ts

interface ScoreContextType {
  scores: TeamScores;
  getBlueScore: () => number;
  getRedScore: () => number;
  addBlueScore: (points: number) => void;
  addRedScore: (points: number) => void;
  resetScores: () => void;
  canReset: boolean; // Only true on home page
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
  // Implementation with localStorage sync
}

export function useScores(): ScoreContextType {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScores must be used within ScoreProvider');
  }
  return context;
}
```

### Data Flow

```
User Action (e.g., click reset button on home page)
  ↓
Component calls resetScores() from useScores()
  ↓
ScoreContext updates internal state { blue: 0, red: 0 }
  ↓
Sync to localStorage.setItem('party-games-scores', '{"blue":0,"red":0}')
  ↓
React re-renders all components using useScores()
  ↓
ScoreDisplay shows updated scores
```

---

## Indexing Strategy

### localStorage Keys

| Key | Value Format | Purpose |
|-----|--------------|---------|
| `party-games-scores` | `{"blue":0,"red":0}` | Persistent team scores |

**Future Considerations**:
- If score history needed: Add `party-games-score-history` key with array of score snapshots
- If multi-session support: Add `party-games-session-id` key

---

## Data Migration Strategy

**V1 (Current)**: Simple key-value with TeamScores object

**Future Versions**:
- **V2 (if team names become customizable)**: Add `teamNames` field to localStorage
  ```typescript
  interface TeamScoresV2 {
    blue: { name: string; score: number };
    red: { name: string; score: number };
  }
  ```
  Migration: Read V1 data, transform to V2 format with default names "Blue Team" / "Red Team"

- **V3 (if score history needed)**: Separate key for history array
  ```typescript
  interface ScoreHistoryEntry {
    timestamp: number;
    blue: number;
    red: number;
  }
  ```
  Migration: V2 data remains, add new history key starting fresh

**Migration Pattern**:
```typescript
function loadScores(): TeamScores {
  const stored = localStorage.getItem('party-games-scores');
  if (!stored) return { blue: 0, red: 0 };
  
  const parsed = JSON.parse(stored);
  
  // V1 format (current)
  if (typeof parsed.blue === 'number') {
    return parsed;
  }
  
  // V2 format (future)
  if (typeof parsed.blue === 'object') {
    return {
      blue: parsed.blue.score,
      red: parsed.red.score,
    };
  }
  
  // Fallback
  return { blue: 0, red: 0 };
}
```

---

## Error Handling

### localStorage Errors

**Error Type**: QuotaExceededError (storage full)
- **Handling**: Log error, fallback to in-memory state, show no user-facing error
- **Impact**: Scores work during session but don't persist

**Error Type**: SecurityError (private browsing)
- **Handling**: Detect via try-catch, fallback to in-memory state
- **Impact**: Scores work during session but don't persist

**Error Type**: Corrupted JSON
- **Handling**: JSON.parse fails → catch error, return default { blue: 0, red: 0 }
- **Impact**: Previous scores lost, starts fresh

### Data Validation Errors

**Error Type**: Negative score increment
- **Handling**: Clamp to 0 or reject operation (spec allows negatives for deductions)
- **Decision**: Allow negatives, but ensure final score never goes below 0

**Error Type**: Non-integer score
- **Handling**: Math.floor() to convert to integer
- **Impact**: Decimal scores not supported

---

## Performance Considerations

### localStorage Read/Write Frequency

- **Reads**: Once on app initialization
- **Writes**: After every score change (addBlue, addRed, reset)
- **Optimization**: localStorage writes are synchronous but fast (<1ms typically)

### State Update Batching

- React 18 automatic batching handles multiple score updates efficiently
- No manual batching needed for current scope

### Memory Footprint

- TeamScores: ~16 bytes (2 numbers)
- GameCardData array (6 items): ~500 bytes
- Total in-memory state: <1 KB (negligible)

---

## Conclusion

Data model is simple and well-suited to the feature scope. Three entities (TeamScores, GameCardData, ScoreDisplayState) with clear responsibilities and minimal complexity. localStorage provides sufficient persistence for MVP with clear error handling paths.

**Next Steps**: Generate API contracts for score management methods and create quickstart.md
