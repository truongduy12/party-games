export type Phase = 'WAITING' | 'PLAYING';

export interface Question {
    id: string; // The keyword string itself serves as ID
    text: string;
}

export interface GameState {
    currentKeyword: Question | null;
    // Score is managed globally via ScoreContext, so we don't need it here
    // But we might want to track local round state if needed
}

export type GameAction =
    | { type: 'START_GAME' }
    | { type: 'NEXT_KEYWORD' }
    | { type: 'RESET_GAME' };
