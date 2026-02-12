/**
 * Game-specific type definitions
 */

export interface KeywordPair {
    id: number;
    wordA: string; // Civilian word
    wordB: string; // Spy word
}

export type Role = 'CIVILIAN' | 'SPY';

export interface Player {
    id: number;
    role: Role;
    word: string;
    hasViewedWord: boolean;
}

export type GamePhase = 'SETUP' | 'REVEAL' | 'DISCUSSION';

export interface GameState {
    phase: GamePhase;
    players: Player[];
    currentPlayerIndex: number; // For REVEAL phase
    keywordPair: KeywordPair | null;
    playerCount: number;
}

export type GameAction =
    | { type: 'SET_PLAYER_COUNT'; payload: number }
    | { type: 'START_GAME'; payload: KeywordPair }
    | { type: 'VIEW_WORD' }
    | { type: 'HIDE_WORD' }
    | { type: 'NEXT_PLAYER' }
    | { type: 'START_DISCUSSION' }
    | { type: 'RESET_GAME' };
