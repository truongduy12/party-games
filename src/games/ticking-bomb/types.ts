export type Phase = 'WAITING' | 'PLAYING' | 'EXPLODED';

export interface Question {
    id: string; // generated or index-based
    text: string;
}

export interface GameState {
    phase: Phase;
    currentQuestion: Question | null;
    duration: number; // For reference/debug
    hasExploded: boolean;
}

export type GameAction =
    | { type: 'START_GAME' }
    | { type: 'PASS_BOMB' }
    | { type: 'EXPLODE' }
    | { type: 'RESET_GAME' };
