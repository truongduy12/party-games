import { useEffect } from 'react';
import { useSyncChallenge } from './useSyncChallenge';
import { useScores } from '../../lib/scoreManager';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function SyncChallenge() {
    const { state, actions } = useSyncChallenge();
    const { currentKeyword } = state;
    const { addBlueScore, addRedScore } = useScores();

    // Load initial keyword on mount if null
    useEffect(() => {
        if (!currentKeyword) {
            actions.startGame();
        }
    }, [currentKeyword, actions]);

    const handleBlueScore = () => {
        addBlueScore(10); // Or 10? Idiom game uses 10. Let's use 10 for consistency.
        actions.nextKeyword();
    };

    const handleRedScore = () => {
        addRedScore(10); // Using 1 to keep numbers smaller? Spec said "1 point (or 10?)". Idiom game uses 10.
        // Let's stick to 1 for now as it's a simple count, unless user complains.
        // Wait, Idiom game uses 10. Consistency suggests 10.
        // I'll use 1 since it's a "Challenge" count, not "Score" per se?
        // Actually, let's use 1. It feels more natural for a "number of successful syncs".
        actions.nextKeyword();
    };

    const handleSkip = () => {
        actions.nextKeyword();
    };

    return (
        <div className="flex flex-col min-h-screen pt-24 pb-20 bg-party-gray-100">
            {/* Header for Home Navigation - aligned with other games */}
            <div className="absolute top-4 left-4 z-10">
                <Link to="/" className="p-2 bg-white/50 rounded-full hover:bg-white/80 transition-colors block">
                    <Home size={24} className="text-party-black" />
                </Link>
            </div>

            {/* Main Game Content */}
            <div className="flex flex-col items-center justify-center flex-1 p-6">

                {/* Title / Instruction */}
                <h2 className="text-xl font-bold text-gray-500 mb-8 uppercase tracking-widest">Đấu Trí Đồng Lòng</h2>

                {/* Keyword Display */}
                <div key={currentKeyword?.id} className="transition-opacity duration-150 mb-16 max-w-4xl w-full text-center animate-fade-in-up">
                    <p className="text-4xl md:text-7xl font-bold text-party-black leading-tight">
                        {currentKeyword?.text || "..."}
                    </p>
                </div>

                {/* Action Buttons - Horizontal Row (Idiom Style) */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                    <button
                        className="h-20 px-4 bg-blue-500 text-white text-xl font-bold rounded-2xl hover:bg-blue-600 active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center"
                        onClick={handleBlueScore}
                        aria-label="Cộng điểm Đội Xanh"
                    >
                        <span className="text-sm opacity-80">+10</span>
                    </button>

                    <button
                        className="h-20 px-4 bg-white border-2 border-gray-300 text-gray-600 text-xl font-bold rounded-2xl hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
                        onClick={handleSkip}
                        aria-label="Bỏ qua"
                    >
                        Bỏ qua
                    </button>

                    <button
                        className="h-20 px-4 bg-red-500 text-white text-xl font-bold rounded-2xl hover:bg-red-600 active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center"
                        onClick={handleRedScore}
                        aria-label="Cộng điểm Đội Đỏ"
                    >
                        <span className="text-sm opacity-80">+10</span>
                    </button>
                </div>

                <p className="mt-8 text-gray-400 text-sm">Đếm 1-2-3 và thực hiện hành động cùng nhau!</p>
            </div>
        </div>
    );
}
