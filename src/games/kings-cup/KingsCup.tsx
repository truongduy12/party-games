import { useGameLogic, getRuleForCard } from './gameLogic';
import { CardDeck } from './components/CardDeck';
import { CardReveal } from './components/CardReveal';
import { KingsWheel } from './components/KingsWheel';
import { RotateCcw, Trophy } from 'lucide-react';

export default function KingsCup() {
    const { state, dispatch } = useGameLogic();
    const { deck, currentCard, isWheelActive, modifier, wheelOutcome } = state;

    const handleDraw = () => {
        dispatch({ type: 'DRAW_CARD' });
    };

    const handleReset = () => {
        if (window.confirm('Bạn có chắc chắn muốn chơi lại từ đầu?')) {
            dispatch({ type: 'RESET_GAME' });
        }
    };

    const handleSpin = () => {
        dispatch({ type: 'SPIN_WHEEL' });
    };

    const handleCloseWheel = () => {
        dispatch({ type: 'CLOSE_WHEEL' });
    };

    // Derived state
    const isGameOver = deck.length === 0;
    // If game is over, we stick with the last card shown.
    // The deck component shows "Empty".

    return (
        <div className="min-h-screen bg-party-black text-party-white flex flex-col items-center py-4 px-4 relative overflow-hidden">

            {/* Header */}
            <header className="w-full max-w-md flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Trophy className="text-yellow-500" />
                    King's Cup
                </h1>
                <button
                    onClick={handleReset}
                    className="p-2 hover:bg-party-gray-800 rounded-full transition-colors"
                    aria-label="Reset Game"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-4">

                {/* Deck Area */}
                <div className="mb-2">
                    <CardDeck
                        deckCount={deck.length}
                        onDraw={handleDraw}
                        disabled={isWheelActive || isGameOver}
                    />
                </div>

                {/* Action / Reveal Area */}
                <div className="flex-1 w-full flex flex-col items-center justify-start min-h-[300px] mt-4">
                    {currentCard ? (
                        <CardReveal
                            card={currentCard}
                            rule={getRuleForCard(currentCard.rank)}
                            modifier={modifier === 'DOUBLE' ? 'DOUBLE' : 'NONE'} // Apply modifier visually
                        />
                    ) : (
                        <div className="text-center text-party-gray-400 mt-12 animate-pulse">
                            <p className="text-xl">Bấm vào bộ bài để bắt đầu rút</p>
                        </div>
                    )}

                    {/* Game Over Message */}
                    {isGameOver && (
                        <div className="mt-8 text-center animate-fade-in-up">
                            <h3 className="text-3xl font-bold text-yellow-500 mb-2">Hết Bài!</h3>
                            <p className="mb-4 text-gray-400">Trò chơi đã kết thúc.</p>
                            <button
                                onClick={() => dispatch({ type: 'RESET_GAME' })}
                                className="bg-party-white text-party-black px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform"
                            >
                                Chơi Ván Mới
                            </button>
                        </div>
                    )}
                </div>

            </main>

            {/* Modals */}
            {isWheelActive && (
                <KingsWheel
                    outcome={wheelOutcome}
                    onSpin={handleSpin}
                    onClose={handleCloseWheel}
                    isSpinning={false} // Internal state in component
                />
            )}
        </div>
    );
}
