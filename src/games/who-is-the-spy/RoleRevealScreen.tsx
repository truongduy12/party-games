import { useState, useEffect } from 'react';
import { useGame } from './GameContext';
import { Eye, EyeOff, User } from 'lucide-react';

export function RoleRevealScreen() {
    const { state, dispatch } = useGame();
    const [isViewing, setIsViewing] = useState(false);

    const currentPlayer = state.players[state.currentPlayerIndex];

    // Reset local state when player changes
    useEffect(() => {
        setIsViewing(false);
    }, [state.currentPlayerIndex]);

    if (!currentPlayer) return null;

    const handleView = () => {
        setIsViewing(true);
        dispatch({ type: 'VIEW_WORD' });
    };

    const handleNext = () => {
        setIsViewing(false);
        dispatch({ type: 'NEXT_PLAYER' });
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto min-h-[400px] justify-center">

            {/* Step 1: Prompt to view */}
            {!isViewing && (
                <div className="bg-party-white text-party-black rounded-2xl p-8 w-full shadow-lg text-center animate-fade-in">
                    <div className="w-20 h-20 bg-party-black rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-10 h-10 text-party-white" />
                    </div>

                    <h2 className="text-3xl font-bold mb-2">Người chơi {currentPlayer.id}</h2>
                    <p className="text-gray-600 mb-8">Hãy cầm thiết bị và bấm xem từ khóa</p>

                    <button
                        onClick={handleView}
                        className="w-full bg-party-black text-party-white py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-opacity"
                    >
                        <Eye className="w-6 h-6" />
                        Xem từ khóa
                    </button>
                </div>
            )}

            {/* Step 2: Viewing word */}
            {isViewing && (
                <div className="bg-party-black border-2 border-party-white text-party-white rounded-2xl p-8 w-full shadow-lg text-center animate-fade-in">
                    <div className="w-20 h-20 bg-party-white rounded-full flex items-center justify-center mx-auto mb-6">
                        <Eye className="w-10 h-10 text-party-black" />
                    </div>

                    <h2 className="text-2xl font-bold mb-4">Từ khóa của bạn là:</h2>

                    <div className="bg-white/10 rounded-xl p-6 mb-8 backdrop-blur-sm">
                        <p className="text-4xl font-extrabold tracking-in-expand text-yellow-400">
                            {currentPlayer.word}
                        </p>
                    </div>

                    <p className="text-gray-400 text-sm mb-6">
                        Ghi nhớ từ khóa và bấm "Ẩn" để chuyển cho người tiếp theo.
                    </p>

                    <button
                        onClick={handleNext}
                        className="w-full bg-party-white text-party-black py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                        <EyeOff className="w-6 h-6" />
                        Ẩn & Chuyển máy
                    </button>
                </div>
            )}
        </div>
    );
}
