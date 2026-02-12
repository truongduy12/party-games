// @ts-ignore
import Card from '@heruka_urgyen/react-playing-cards';

interface CardDeckProps {
    deckCount: number;
    onDraw: () => void;
    disabled?: boolean;
}

export const CardDeck: React.FC<CardDeckProps> = ({ deckCount, onDraw, disabled }) => {
    return (
        <div className="relative w-32 h-48 flex items-center justify-center cursor-pointer" onClick={!disabled ? onDraw : undefined}>
            {deckCount > 0 ? (
                <div className={`transition-transform mb-4 hover:scale-105 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className="w-full h-full rounded-lg shadow-xl overflow-hidden">
                        <Card back height="192px" />
                    </div>

                    {/* Stack effect */}
                    {deckCount > 1 && (
                        <div className="absolute top-1 left-1 w-full h-full bg-blue-900 rounded-lg -z-10 border-2 border-gray-300"></div>
                    )}
                    {deckCount > 2 && (
                        <div className="absolute top-2 left-2 w-full h-full bg-blue-950 rounded-lg -z-20 border-2 border-gray-400"></div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-600 rounded-lg">
                    <span className="text-gray-500">Hết bài</span>
                </div>
            )}

            <div className="absolute -bottom-8 text-party-white font-medium">
                Còn lại: {deckCount}
            </div>
        </div>
    );
};
