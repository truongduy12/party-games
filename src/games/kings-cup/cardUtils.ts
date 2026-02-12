import type { Card } from './types';

export const getLibraryCardCode = (card: Card): string => {
    const suitMap: Record<string, string> = {
        'H': 'h',
        'D': 'd',
        'C': 'c',
        'S': 's'
    };

    const rankMap: Record<string, string> = {
        '10': 'T',
        'A': 'A',
        'J': 'J',
        'Q': 'Q',
        'K': 'K'
    };

    // For 2-9, the rank string is the same.
    // For 10, uses 'T'.
    const rank = rankMap[card.rank] || card.rank;
    const suit = suitMap[card.suit];

    return `${rank}${suit}`;
};
