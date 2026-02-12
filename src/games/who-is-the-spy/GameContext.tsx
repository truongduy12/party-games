import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { GameState, GameAction } from './types';
import { assignRoles } from './utils';

const initialState: GameState = {
    phase: 'SETUP',
    players: [],
    currentPlayerIndex: 0,
    keywordPair: null,
    playerCount: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'SET_PLAYER_COUNT':
            return { ...state, playerCount: action.payload };

        case 'START_GAME':
            const pair = action.payload;
            const players = assignRoles(state.playerCount, pair);
            return {
                ...state,
                phase: 'REVEAL',
                keywordPair: pair,
                players,
                currentPlayerIndex: 0,
            };

        case 'VIEW_WORD':
            const updatedPlayersView = [...state.players];
            if (updatedPlayersView[state.currentPlayerIndex]) {
                updatedPlayersView[state.currentPlayerIndex] = {
                    ...updatedPlayersView[state.currentPlayerIndex],
                    hasViewedWord: true,
                };
            }
            return { ...state, players: updatedPlayersView };

        case 'HIDE_WORD':
            return state; // No state change needed, just a UI signal or transition to next step

        case 'NEXT_PLAYER':
            const nextIndex = state.currentPlayerIndex + 1;
            if (nextIndex >= state.players.length) {
                return { ...state, phase: 'DISCUSSION' };
            }
            return { ...state, currentPlayerIndex: nextIndex };

        case 'START_DISCUSSION':
            return { ...state, phase: 'DISCUSSION' };

        case 'RESET_GAME':
            return initialState;

        default:
            return state;
    }
}

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
