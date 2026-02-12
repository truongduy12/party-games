import { useReducer, useEffect } from 'react';
import type { GameState, GameAction, Rule } from './types';
import { createDeck, shuffleDeck } from '../../lib/deck';
import rulesData from '../../data/kings-cup.json';

const STORAGE_KEY = 'kings-cup-state';

const initialState: GameState = {
    deck: [],
    drawnCards: [],
    currentCard: null,
    isWheelActive: false,
    modifier: 'NONE',
    wheelOutcome: null,
};

const WHEEL_OUTCOMES = [
    'DRINK_1',
    'PICK_PARTNER',
    'EVERYONE_DRINKS',
    'DOUBLE_NEXT',
    'LUCKY_ESCAPE',
] as const;

export const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'DRAW_CARD': {
            if (state.deck.length === 0) return state;
            if (state.isWheelActive) return state; // Block draw if wheel is active

            const newDeck = [...state.deck];
            const card = newDeck.pop()!;
            const newDrawnCards = [...state.drawnCards, card];

            // Determine if next card logic (modifier) applies or resets
            let nextModifier = state.modifier;
            if (state.modifier === 'DOUBLE') {
                // Consumed on this draw, so reset for next time (after UI displays it)
                // Actually, the requirement says "immediate next card drawn". 
                // So if modifier was DOUBLE, this card is doubled. We reset it AFTER calculation?
                // For state, we just reset it to NONE because it's used now.
                nextModifier = 'NONE';
            }

            // Check for King
            const isKing = card.rank === 'K';

            return {
                ...state,
                deck: newDeck,
                drawnCards: newDrawnCards,
                currentCard: card,
                isWheelActive: isKing,
                modifier: nextModifier,
            };
        }

        case 'RESET_GAME': {
            return {
                ...initialState,
                deck: shuffleDeck(createDeck()),
            };
        }

        case 'SPIN_WHEEL': {
            const randomOutcome = WHEEL_OUTCOMES[Math.floor(Math.random() * WHEEL_OUTCOMES.length)];
            let newModifier = state.modifier;

            if (randomOutcome === 'DOUBLE_NEXT') {
                newModifier = 'DOUBLE';
            }

            return {
                ...state,
                wheelOutcome: randomOutcome,
                modifier: newModifier,
                // Keep isWheelActive true until closed
            };
        }

        case 'CLOSE_WHEEL': {
            return {
                ...state,
                isWheelActive: false,
                wheelOutcome: null,
            };
        }

        default:
            return state;
    }
};

export const getRuleForCard = (rank: string): Rule => {
    const ruleData = (rulesData.rules as any)[rank];
    return {
        title: ruleData.title,
        action: ruleData.action,
        type: rank === 'K' ? 'WHEEL' : 'NORMAL',
    };
};

// Initializer to load from localStorage
export const initGame = (): GameState => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse saved game state', e);
        }
    }
    return {
        ...initialState,
        deck: shuffleDeck(createDeck()),
    };
};

export const useGameLogic = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState, initGame);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    return { state, dispatch };
};
