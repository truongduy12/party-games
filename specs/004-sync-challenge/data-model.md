# Data Model: Sync Challenge

## Game Configuration
- **Keywords**: `string[]` (Loaded from `src/data/sync-challenge.json`)

## Types

```typescript
export type Phase = 'WAITING' | 'PLAYING'; // Simplified since no countdown/explosion state needed? Or maybe just 'PLAYING' is enough.

export interface Question {
  id: string; // The keyword string itself serves as ID
  text: string;
}

export interface GameState {
  currentKeyword: Question | null;
  // Score is managed globally via ScoreContext
}
```

## State Transitions
1. **Start**: Load random keyword.
2. **Next/Pass**: Load new random keyword (ensure no immediate repeat).
3. **Score Blue**: Increment Blue Score -> Load new keyword.
4. **Score Red**: Increment Red Score -> Load new keyword.
