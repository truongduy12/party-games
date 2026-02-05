# Score Management API Contract

**Feature**: 001-home-scoreboard  
**Date**: 2026-02-05  
**Purpose**: Define the public API interface for global score management

---

## API Overview

The Score Management API provides a type-safe interface for reading and modifying team scores. This API is exposed via React Context and consumed through the `useScores()` hook.

**Access Method**: React Hook  
**Provider**: `<ScoreProvider>` wraps App.tsx  
**Consumer**: Any component via `useScores()` hook

---

## TypeScript Interface

```typescript
interface ScoreContextType {
  // Current Scores (read-only state)
  scores: TeamScores;
  
  // Getter Methods
  getBlueScore: () => number;
  getRedScore: () => number;
  
  // Mutation Methods
  addBlueScore: (points: number) => void;
  addRedScore: (points: number) => void;
  resetScores: () => void;
  
  // Authorization
  canReset: boolean;
}

interface TeamScores {
  blue: number;
  red: number;
}
```

---

## Methods

### getBlueScore()

**Purpose**: Retrieve the current Blue Team score

**Signature**:
```typescript
getBlueScore(): number
```

**Parameters**: None

**Returns**: 
- `number` - Current Blue Team score (always >= 0)

**Example**:
```typescript
const { getBlueScore } = useScores();
const blueScore = getBlueScore(); // e.g., 15
```

**Errors**: None - always returns valid number

---

### getRedScore()

**Purpose**: Retrieve the current Red Team score

**Signature**:
```typescript
getRedScore(): number
```

**Parameters**: None

**Returns**: 
- `number` - Current Red Team score (always >= 0)

**Example**:
```typescript
const { getRedScore } = useScores();
const redScore = getRedScore(); // e.g., 20
```

**Errors**: None - always returns valid number

---

### addBlueScore(points)

**Purpose**: Add points to the Blue Team score

**Signature**:
```typescript
addBlueScore(points: number): void
```

**Parameters**:
- `points: number` - Points to add (can be positive or negative)
  - Positive: Adds to score
  - Negative: Subtracts from score (score will not go below 0)

**Returns**: `void` (mutates internal state)

**Side Effects**:
- Updates Blue Team score in React state
- Persists new score to localStorage
- Triggers re-render of all components using `useScores()`

**Example**:
```typescript
const { addBlueScore } = useScores();
addBlueScore(10);  // Blue score increases by 10
addBlueScore(-5);  // Blue score decreases by 5 (or to 0 if score < 5)
```

**Error Handling**:
- If localStorage write fails: Score still updates in memory, error logged to console
- If points is NaN: No-op (score unchanged)
- Final score is always clamped to >= 0

---

### addRedScore(points)

**Purpose**: Add points to the Red Team score

**Signature**:
```typescript
addRedScore(points: number): void
```

**Parameters**:
- `points: number` - Points to add (can be positive or negative)
  - Positive: Adds to score
  - Negative: Subtracts from score (score will not go below 0)

**Returns**: `void` (mutates internal state)

**Side Effects**:
- Updates Red Team score in React state
- Persists new score to localStorage
- Triggers re-render of all components using `useScores()`

**Example**:
```typescript
const { addRedScore } = useScores();
addRedScore(15);   // Red score increases by 15
addRedScore(-10);  // Red score decreases by 10 (or to 0 if score < 10)
```

**Error Handling**:
- If localStorage write fails: Score still updates in memory, error logged to console
- If points is NaN: No-op (score unchanged)
- Final score is always clamped to >= 0

---

### resetScores()

**Purpose**: Reset both team scores to 0 (only callable from home page)

**Signature**:
```typescript
resetScores(): void
```

**Parameters**: None

**Returns**: `void` (mutates internal state)

**Authorization**:
- Only callable when `canReset === true` (home page route)
- Calling from other pages will no-op or throw error (implementation choice)

**Side Effects**:
- Sets both Blue and Red scores to 0
- Persists reset state to localStorage
- Triggers re-render of all components using `useScores()`

**Example**:
```typescript
const { resetScores, canReset } = useScores();

if (canReset) {
  resetScores(); // Both scores become 0
}
```

**Error Handling**:
- If localStorage write fails: Scores still reset in memory, error logged to console
- If called when `canReset === false`: No-op (scores unchanged)

---

## Field: scores

**Purpose**: Direct access to current team scores (read-only)

**Type**: 
```typescript
scores: TeamScores
```

**Structure**:
```typescript
{
  blue: number;  // Current Blue Team score
  red: number;   // Current Red Team score
}
```

**Example**:
```typescript
const { scores } = useScores();
console.log(scores.blue);  // e.g., 10
console.log(scores.red);   // e.g., 15
```

**Note**: Direct mutation of `scores` object will not persist. Always use mutation methods.

---

## Field: canReset

**Purpose**: Indicates whether resetScores() can be called from current page

**Type**: `boolean`

**Behavior**:
- `true`: Current route is home page (`/` or `/home`)
- `false`: Current route is any other page (game pages, etc.)

**Example**:
```typescript
const { canReset } = useScores();

return (
  <button 
    onClick={resetScores} 
    disabled={!canReset}
  >
    Reset Scores
  </button>
);
```

---

## Usage Examples

### Basic Score Display (ScoreDisplay Component)

```typescript
import { useScores } from '../lib/scoreManager';

export function ScoreDisplay() {
  const { scores } = useScores();
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-party-black text-party-white z-50">
      <div className="flex justify-between items-center px-4 py-3">
        <div>Blue Team: {scores.blue}</div>
        <div>Red Team: {scores.red}</div>
      </div>
    </header>
  );
}
```

### Adding Points from a Game

```typescript
import { useScores } from '../lib/scoreManager';

export function TicTacToeGame() {
  const { addBlueScore, addRedScore } = useScores();
  
  const handleWin = (winner: 'blue' | 'red') => {
    if (winner === 'blue') {
      addBlueScore(10); // Award 10 points to Blue Team
    } else {
      addRedScore(10); // Award 10 points to Red Team
    }
  };
  
  // Game logic...
}
```

### Reset Button on Home Page

```typescript
import { useScores } from '../lib/scoreManager';

export function Home() {
  const { resetScores, canReset, scores } = useScores();
  
  return (
    <div>
      <h1>Party Games</h1>
      
      {/* Only show reset button on home page */}
      {canReset && (
        <button 
          onClick={resetScores}
          className="bg-party-black text-party-white px-4 py-2"
        >
          Reset All Scores
        </button>
      )}
      
      {/* Game cards grid */}
    </div>
  );
}
```

---

## Browser Console Access (Development/Testing)

For testing purposes, scores can be manipulated from browser console:

```javascript
// Access via React DevTools or window object (if exposed)
// Example if exposed as window.partyGames:

window.partyGames.addBlueScore(100);
window.partyGames.addRedScore(50);
window.partyGames.resetScores();
console.log(window.partyGames.getBlueScore()); // 0
```

**Note**: Window exposure is optional and for development only.

---

## Error Scenarios

### Scenario 1: localStorage Unavailable (Private Browsing)

**Trigger**: User in private/incognito mode  
**Behavior**: 
- API methods continue to work
- Scores update in memory
- Scores DO NOT persist across page refreshes
- No user-facing error shown

**Detection**:
```typescript
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  return true; // Available
} catch {
  return false; // Unavailable
}
```

### Scenario 2: localStorage Quota Exceeded

**Trigger**: Browser storage limit reached  
**Behavior**:
- `QuotaExceededError` thrown on write
- Catch error, log to console
- Scores continue to work in memory
- User sees no error (graceful degradation)

### Scenario 3: Corrupted localStorage Data

**Trigger**: Manual editing or storage corruption  
**Behavior**:
- JSON.parse fails on load
- Catch error, return default `{ blue: 0, red: 0 }`
- Previous scores lost, starts fresh
- No crash, no user-facing error

### Scenario 4: Calling resetScores() from Non-Home Page

**Trigger**: Game attempts to reset scores  
**Behavior**:
- Method call no-ops (scores unchanged)
- OR throws error (implementation choice)
- `canReset` flag prevents UI from showing reset button

---

## Performance Characteristics

| Operation | Time Complexity | localStorage Access | Re-renders Triggered |
|-----------|----------------|---------------------|---------------------|
| `getBlueScore()` | O(1) | Read on init only | 0 |
| `getRedScore()` | O(1) | Read on init only | 0 |
| `addBlueScore()` | O(1) | Write once | All consumers |
| `addRedScore()` | O(1) | Write once | All consumers |
| `resetScores()` | O(1) | Write once | All consumers |

**localStorage I/O**:
- Reads: 1x on app initialization (~1-2ms)
- Writes: 1x per score mutation (~1-2ms each)

**React Re-renders**:
- Context updates trigger re-render of all components using `useScores()`
- React 18 automatic batching optimizes multiple mutations in same event

---

## Security Considerations

**localStorage Security**:
- Data stored in plaintext (acceptable for game scores)
- No sensitive information stored
- Accessible to all JavaScript on same origin
- User can manually edit via DevTools (non-critical data)

**Authorization**:
- `resetScores()` restricted to home page via `canReset` flag
- No authentication required (single-device party game)

**XSS Risk**:
- Minimal - scores are numbers, not user-generated content
- No innerHTML or dangerouslySetInnerHTML used in score display

---

## Future Enhancements

### V2: Score History

```typescript
interface ScoreHistoryEntry {
  timestamp: number;
  blue: number;
  red: number;
}

interface ScoreContextTypeV2 extends ScoreContextType {
  getScoreHistory: () => ScoreHistoryEntry[];
}
```

### V3: Undo/Redo

```typescript
interface ScoreContextTypeV3 extends ScoreContextTypeV2 {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
```

### V4: Custom Team Names

```typescript
interface TeamScoresV4 {
  blue: { name: string; score: number };
  red: { name: string; score: number };
}

interface ScoreContextTypeV4 extends ScoreContextType {
  setTeamName: (team: 'blue' | 'red', name: string) => void;
}
```

---

## Conclusion

This API contract defines a simple, type-safe interface for global score management. All methods have clear purposes, error handling, and performance characteristics. The contract supports the MVP requirements while remaining extensible for future enhancements.

**Ready for Implementation**: All contracts defined, proceed to quickstart.md generation.
