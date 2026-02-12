// @ts-ignore
import Card from '@heruka_urgyen/react-playing-cards';
import type { Card as CardType, Rule } from '../types';
import { getLibraryCardCode } from '../cardUtils';

interface CardRevealProps {
    card: CardType;
    rule: Rule;
    modifier: 'NONE' | 'DOUBLE';
}

export const CardReveal: React.FC<CardRevealProps> = ({ card, rule, modifier }) => {
    const cardCode = getLibraryCardCode(card);

    return (
        <div className="flex flex-col items-center animate-fade-in w-full">
            <div className="mb-4 transform transition-all hover:scale-110">
                <div className="flex items-center justify-center">
                    <Card card={cardCode} deckType="basic" height="200px" />
                </div>
            </div>

            <div className="text-center w-full bg-party-white text-party-black p-4 rounded-xl shadow-lg border-2 border-party-black">
                <h2 className="text-2xl font-bold mb-2 uppercase tracking-wide">{rule.title}</h2>

                {modifier === 'DOUBLE' && (
                    <div className="mb-2 inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        x2 PENALTY
                    </div>
                )}

                <p className="text-lg leading-relaxed">
                    {rule.action}
                </p>
            </div>
        </div>
    );
};
