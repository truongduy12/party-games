# Data Model: Game Mô Tả Thành Ngữ

**Phase**: 1 - Design & Contracts  
**Date**: 2026-02-06  
**Feature**: [spec.md](spec.md)

## Overview

This document defines the data structures and state management for the Idiom Game. The game has minimal state complexity - primarily managing the current idiom display and leveraging existing global score state.

---

## Entities

### 1. Idiom (Thành Ngữ)

**Source**: Static JSON file (`src/data/thanh-ngu-tuc-ngu.json`)

**Structure**:
```typescript
interface Idiom {
  id: number;        // Unique identifier for each idiom
  content: string;   // Vietnamese idiom/proverb text
}
```

**Validation Rules**:
- `id` must be unique positive integer
- `content` must be non-empty string
- File must contain array of at least 1 idiom

**Sample Data**:
```json
[
  { "id": 1, "content": "Có công mài sắt có ngày nên kim" },
  { "id": 2, "content": "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao" },
  { "id": 3, "content": "Ăn quả nhớ kẻ trồng cây" }
]
```

**Relationships**: None - idioms are independent entities

---

### 2. Game State

**Scope**: Component-level state (React useState)

**Structure**:
```typescript
interface GameState {
  currentIdiom: Idiom | null;    // Currently displayed idiom
  previousIdiomId: number | null; // ID of last idiom (for no-repeat logic)
  isLoading: boolean;             // Initial data load state
  hasError: boolean;              // Error flag for data load failure
}
```

**State Transitions**:

```
Initial Load:
  [Empty] → isLoading=true → Success: currentIdiom=random, isLoading=false
                          → Error: hasError=true, isLoading=false

Skip Action:
  [Current Idiom] → previousIdiomId=current.id → currentIdiom=new random

Score Action (+10 Blue/Red):
  [Current Idiom] → addScore(10) → previousIdiomId=current.id → currentIdiom=new random

Retry (after error):
  [Error State] → hasError=false, isLoading=true → [Initial Load flow]
```

**Persistence**: 
- ❌ Game state is NOT persisted (resets on page reload per spec edge case)
- ✅ Scores persisted via global scoreManager context (existing feature 001)

---

### 3. Score State (External Dependency)

**Source**: Global context from `src/lib/scoreManager.tsx` (feature 001)

**Interface** (consumed by this game):
```typescript
interface ScoreContextValue {
  scores: {
    blue: number;   // Current blue team score
    red: number;    // Current red team score
  };
  addBlueScore: (points: number) => void;   // Add points to blue team
  addRedScore: (points: number) => void;    // Add points to red team
  resetScores: () => void;                   // Reset both scores to 0
}

// Usage in game:
const { addBlueScore, addRedScore } = useScores();
```

**Persistence**: Automatically handled by scoreManager via localStorage

**Responsibilities**: Game component only calls `addBlueScore(10)` / `addRedScore(10)`, does not manage score state

---

## State Management Architecture

### Component Hierarchy

```
<App>
  <ScoreProvider>          // Global score context (feature 001)
    <Router>
      <ScoreDisplay />     // Header showing team scores
      <Routes>
        <Route path="/idiom-game">
          <IdiomGame />    // Game component (this feature)
        </Route>
      </Routes>
    </Router>
  </ScoreProvider>
</App>
```

### IdiomGame Component State

```typescript
function IdiomGame() {
  // Local game state
  const [currentIdiom, setCurrentIdiom] = useState<Idiom | null>(null);
  const [previousIdiomId, setPreviousIdiomId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Global score context
  const { addBlueScore, addRedScore } = useScores();

  // Game logic functions
  const loadNextIdiom = () => { /* ... */ };
  const handleSkip = () => { /* ... */ };
  const handleBlueScore = () => { /* ... */ };
  const handleRedScore = () => { /* ... */ };
  const handleRetry = () => { /* ... */ };
}
```

**State Location Rationale**:
- **Local state**: Game-specific (currentIdiom, previousId) - no need to share across app
- **Global context**: Scores - shared across all games and home page
- **No Redux/Zustand needed**: Simple state structure fits React useState + Context perfectly

---

## Data Flow Diagrams

### Initial Load Flow

```
Component Mount
    ↓
Load idioms from JSON import
    ↓
Validation (array non-empty)
    ├─ Success → setCurrentIdiom(random)
    │            setIsLoading(false)
    │
    └─ Failure → setHasError(true)
                 setIsLoading(false)
```

### Skip Action Flow

```
User clicks "Bỏ qua"
    ↓
setPreviousIdiomId(currentIdiom.id)
    ↓
newIdiom = getRandomIdiom(idioms, previousIdiomId)
    ↓
setCurrentIdiom(newIdiom)
    ↓
UI re-renders with fade transition
```

### Score Action Flow

```
User clicks "+10 Đội Xanh"
    ↓
addBlueScore(10)  // Global context update
    ↓              // → localStorage persist
    ↓              // → ScoreDisplay re-renders
setPreviousIdiomId(currentIdiom.id)
    ↓
newIdiom = getRandomIdiom(idioms, previousIdiomId)
    ↓
setCurrentIdiom(newIdiom)
    ↓
UI re-renders with fade transition
```

---

## Validation & Constraints

### Data Validation

**On JSON Load**:
```typescript
function validateIdioms(data: unknown): Idiom[] {
  if (!Array.isArray(data)) {
    throw new Error('Idiom data must be an array');
  }
  
  if (data.length === 0) {
    throw new Error('Idiom data cannot be empty');
  }
  
  // Type guard for each idiom
  const validated = data.every(item => 
    typeof item === 'object' &&
    typeof item.id === 'number' &&
    typeof item.content === 'string' &&
    item.content.length > 0
  );
  
  if (!validated) {
    throw new Error('Invalid idiom structure');
  }
  
  return data as Idiom[];
}
```

**Validation Rules**:
- ✅ Array must contain at least 1 idiom
- ✅ Each idiom must have valid id (number) and content (non-empty string)
- ✅ IDs should be unique (not enforced in code, assumed from data source)

### Business Rules

1. **No Immediate Repeat**: `previousIdiomId` excludes last idiom from next random selection
2. **Score Increment**: Always +10 points (fixed per spec)
3. **Auto-Next on Score**: Scoring automatically triggers next idiom load
4. **No Session History**: Game does not track full play history (only last idiom)

---

## Edge Case Handling

| Scenario | Handling |
|----------|----------|
| Only 1 idiom in data | Allow repeat (filter returns empty, use all idioms) |
| JSON load fails | Show error UI with retry button |
| Empty JSON array | Treat as load failure, show error |
| Malformed JSON structure | Validation error, show error UI |
| Rapid button clicks | React state batching prevents race conditions |
| Page refresh mid-game | Game state resets, scores persist via localStorage |

---

## Performance Considerations

**Data Loading**:
- JSON bundled at build time via Vite import (no runtime fetch)
- 500 idioms ~50KB (assuming avg 100 chars per idiom) → negligible bundle impact

**State Updates**:
- Single idiom object in state (minimal memory footprint)
- No list rendering (only current idiom displayed) → no virtualization needed

**Random Selection**:
- O(n) filter operation on 500 items = <1ms on modern devices
- No optimization needed for this scale

---

## Type Definitions Summary

**File**: `src/games/idiom-game/types.ts`

```typescript
// Core data structure
export interface Idiom {
  id: number;
  content: string;
}

// Component state type
export interface GameState {
  currentIdiom: Idiom | null;
  previousIdiomId: number | null;
  isLoading: boolean;
  hasError: boolean;
}

// Utility function types
export type GetRandomIdiomFn = (
  idioms: Idiom[], 
  excludeId?: number
) => Idiom;

export type LoadNextIdiomFn = () => void;
```

---

**Data Model Complete**: All entities, relationships, and state flows defined. Ready for contract generation (Phase 1 continued).
