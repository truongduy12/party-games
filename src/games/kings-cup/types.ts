export type Suit = 'H' | 'D' | 'C' | 'S';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
    suit: Suit;
    rank: Rank;
    code: string; // e.g., 'AH', '10D'
}

export type RuleType = 'NORMAL' | 'WHEEL';

export interface Rule {
    title: string;
    action: string;
    type: RuleType;
}

export type WheelOutcome =
    | 'DRINK_1'
    | 'PICK_PARTNER'
    | 'EVERYONE_DRINKS'
    | 'DOUBLE_NEXT'
    | 'LUCKY_ESCAPE';

export interface GameState {
    deck: Card[];
    drawnCards: Card[];
    currentCard: Card | null;
    isWheelActive: boolean;
    modifier: 'NONE' | 'DOUBLE';
    wheelOutcome: WheelOutcome | null;
}

export type GameAction =
    | { type: 'DRAW_CARD' }
    | { type: 'RESET_GAME' }
    | { type: 'SPIN_WHEEL' }
    | { type: 'CLOSE_WHEEL' };
