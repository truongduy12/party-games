import { useReducer, useCallback } from 'react';
import type { GameState, GameAction, Question } from './types';
import syncData from '../../data/sync-challenge.json';

// Helper to get random keyword
const getRandomKeyword = (excludeId?: string): Question => {
    const keywords = syncData as string[];
    let validKeywords = keywords;

    if (excludeId) {
        validKeywords = keywords.filter(k => k !== excludeId);
    }

    // Create a new set if we run out (unlikely)
    if (validKeywords.length === 0) validKeywords = keywords;

    const text = validKeywords[Math.floor(Math.random() * validKeywords.length)];
    return { id: text, text };
};

const initialState: GameState = {
    currentKeyword: null, // Start null, or pre-load one? Let's start with one for immediate play or null for "Start" screen.
    // Actually, Idiom game loads one immediately. Let's do that.
    // But for cleaner init, let's use a function or effect. 
    // For simplicity: start null, let comprehensive init handle it or just load one.
};

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'START_GAME':
            return {
                ...state,
                currentKeyword: getRandomKeyword(),
            };
        case 'NEXT_KEYWORD':
            return {
                ...state,
                currentKeyword: getRandomKeyword(state.currentKeyword?.id),
            };
        case 'RESET_GAME':
            return {
                ...state,
                currentKeyword: getRandomKeyword(), // Reset with new word
            };
        default:
            return state;
    }
}

export const useSyncChallenge = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
    const nextKeyword = useCallback(() => dispatch({ type: 'NEXT_KEYWORD' }), []);
    const resetGame = useCallback(() => dispatch({ type: 'RESET_GAME' }), []);

    return {
        state,
        actions: {
            startGame,
            nextKeyword,
            resetGame,
        }
    };
};
