import { useReducer, useEffect, useRef, useCallback } from 'react';
import type { GameState, GameAction, Question } from './types';
import questionData from '../../data/ticking-bomb.json'; // Direct import of JSON array

const TICK_SOUND_URL = '/assets/sounds/tick.mp3'; // Placeholder
const EXPLOSION_SOUND_URL = '/assets/sounds/explosion.mp3'; // Placeholder

// Helper to get random duration 15-60s
const getRandomDuration = () => Math.floor(Math.random() * (60 - 15 + 1)) + 15;

// Helper to get random question
const getRandomQuestion = (excludeId?: string): Question => {
    const questions = questionData as string[];
    let validQuestions = questions;
    if (excludeId) {
        validQuestions = questions.filter(q => q !== excludeId);
    }
    // Fallback if filter leaves empty (unlikely with big list)
    if (validQuestions.length === 0) validQuestions = questions;

    const text = validQuestions[Math.floor(Math.random() * validQuestions.length)];
    return { id: text, text }; // Using text as ID for simplicity since they are unique strings
};

const initialState: GameState = {
    phase: 'WAITING',
    currentQuestion: null,
    duration: 0,
    hasExploded: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'START_GAME':
            return {
                ...state,
                phase: 'PLAYING',
                currentQuestion: getRandomQuestion(),
                duration: getRandomDuration(),
                hasExploded: false,
            };
        case 'PASS_BOMB':
            return {
                ...state,
                currentQuestion: getRandomQuestion(state.currentQuestion?.id),
            };
        case 'EXPLODE':
            return {
                ...state,
                phase: 'EXPLODED',
                hasExploded: true,
            };
        case 'RESET_GAME':
            return initialState;
        default:
            return state;
    }
}

export const useTickingBomb = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // Refs for audio and timer to access inside effects/callbacks
    const tickAudioRef = useRef<HTMLAudioElement | null>(null);
    const explosionAudioRef = useRef<HTMLAudioElement | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startTimeRef = useRef<number>(0);

    // Initialize Audio
    useEffect(() => {
        tickAudioRef.current = new Audio(TICK_SOUND_URL);
        tickAudioRef.current.loop = true;
        explosionAudioRef.current = new Audio(EXPLOSION_SOUND_URL);

        return () => {
            if (tickAudioRef.current) {
                tickAudioRef.current.pause();
                tickAudioRef.current = null;
            }
            if (explosionAudioRef.current) {
                explosionAudioRef.current.pause();
                explosionAudioRef.current = null;
            }
        };
    }, []);

    // Timer Logic
    useEffect(() => {
        if (state.phase === 'PLAYING') {
            startTimeRef.current = Date.now();
            const durationMs = state.duration * 1000;

            // Start Audio
            tickAudioRef.current?.play().catch(e => console.warn('Audio play failed', e));

            // Vibrate pattern (pulse)
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

            // Set explosion timer
            timerRef.current = setTimeout(() => {
                dispatch({ type: 'EXPLODE' });
            }, durationMs);

            // Animation loop for fuse? (Handled in UI via CSS based on duration? No, logic handles state)
            // We can expose progress if needed, but "hidden timer" requirement means we don't need precise updates.
        } else if (state.phase === 'EXPLODED') {
            // Stop Tick, Play Boom
            tickAudioRef.current?.pause();
            if (tickAudioRef.current) tickAudioRef.current.currentTime = 0;

            explosionAudioRef.current?.play().catch(e => console.warn('Explosion play failed', e));

            // Long Vibrate
            if (navigator.vibrate) navigator.vibrate(1000);
        } else {
            // WAITING / RESET
            if (timerRef.current) clearTimeout(timerRef.current);
            tickAudioRef.current?.pause();
            if (tickAudioRef.current) tickAudioRef.current.currentTime = 0;
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [state.phase, state.duration]);

    // Public Actions
    const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
    const passBomb = useCallback(() => {
        if (state.phase === 'PLAYING') {
            dispatch({ type: 'PASS_BOMB' });
            // Feedback for pass?
            if (navigator.vibrate) navigator.vibrate(50);
        }
    }, [state.phase]);
    const resetGame = useCallback(() => dispatch({ type: 'RESET_GAME' }), []);

    return {
        state,
        actions: {
            startGame,
            passBomb,
            resetGame,
        }
    };
};
