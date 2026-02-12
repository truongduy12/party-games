import data from '../../data/who-is-the-spy.json';
import type { KeywordPair, Player, Role } from './types';

/**
 * Get a random keyword pair from the data
 */
export const getRandomKeywordPair = (): KeywordPair => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex] as KeywordPair;
};

/**
 * Assign roles and keywords to players
 * One player is the SPY (B), the rest are CIVILIANS (A)
 */
export const assignRoles = (playerCount: number, keywordPair: KeywordPair): Player[] => {
    // Create an array of roles: 1 Spy, rest Civilians
    const roles: Role[] = Array(playerCount).fill('CIVILIAN');
    const spyIndex = Math.floor(Math.random() * playerCount);
    roles[spyIndex] = 'SPY';

    // Create players with assigned roles and words
    return roles.map((role, index) => ({
        id: index + 1,
        role,
        word: role === 'SPY' ? keywordPair.wordB : keywordPair.wordA,
        hasViewedWord: false,
    }));
};
