import { useTickingBomb } from './useTickingBomb';
import { Bomb } from './components/Bomb';
import { QuestionCard } from './components/QuestionCard';
import { Play, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TickingBomb() {
    const { state, actions } = useTickingBomb();
    const { phase, currentQuestion } = state;

    return (
        <div className="min-h-screen bg-party-black text-party-white flex flex-col relative overflow-hidden">
            {/* Header */}
            <header className="p-4 flex justify-between items-center z-10">
                <Link to="/" className="p-2 bg-party-white/10 rounded-full hover:bg-party-white/20 transition-colors">
                    <Home size={24} />
                </Link>
                <h1 className="text-xl font-bold">Ticking Bomb</h1>
                <div className="w-10"></div> {/* Spacer for alignment */}
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 gap-8 pb-12 w-full max-w-md mx-auto z-20 relative">

                {/* Waiting State */}
                {phase === 'WAITING' && (
                    <div className="text-center animate-fade-in">
                        <div className="mb-8">
                            <Bomb isExploded={false} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Bom Hẹn Giờ</h2>
                        <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                            Trả lời câu hỏi và chuyền bom nhanh trước khi nó phát nổ! (15-60s)
                        </p>
                        <button
                            onClick={actions.startGame}
                            className="w-full bg-party-white text-party-black py-4 px-12 rounded-full font-bold text-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            <Play fill="currentColor" />
                            Bắt Đầu
                        </button>
                    </div>
                )}

                {/* Playing State */}
                {phase === 'PLAYING' && currentQuestion && (
                    <div className="w-full flex flex-col items-center gap-8">
                        <div className="animate-bounce-slow">
                            <Bomb isExploded={false} />
                        </div>

                        <QuestionCard
                            text={currentQuestion.text}
                            onPass={actions.passBomb}
                        />
                    </div>
                )}

                {/* Exploded State */}
                {phase === 'EXPLODED' && (
                    <div className="text-center animate-shake w-full h-full flex flex-col items-center justify-center">
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="mb-8">
                                <Bomb isExploded={true} />
                            </div>
                            <h2 className="text-4xl font-extrabold text-red-500 my-2 uppercase tracking-widest">BOOM!</h2>
                            <p className="text-xl text-gray-300 mb-8">Người đang cầm bom THUA CUỘC!</p>
                        </div>

                        <button
                            onClick={actions.resetGame}
                            className="absolute bottom-12 mb-12 left-6 right-6 bg-party-white text-party-black py-6 rounded-full font-bold text-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl border-4 border-party-black"
                        >
                            <RotateCcw size={32} />
                            Chơi Lại
                        </button>
                    </div>
                )}
            </main>

            {/* Background decoration */}
            <div className={`absolute inset-0 transition-colors duration-1000 ${phase === 'EXPLODED' ? 'bg-red-900/20' : 'bg-transparent'} pointer-events-none`}></div>
        </div>
    );
}
