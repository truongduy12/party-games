import { MessageCircle, RotateCcw } from 'lucide-react';
import { GameProvider, useGame } from './GameContext';
import { SetupScreen } from './SetupScreen';
import { RoleRevealScreen } from './RoleRevealScreen';

const GameContainer = () => {
    const { state, dispatch } = useGame();

    const handleReset = () => {
        dispatch({ type: 'RESET_GAME' });
    };

    return (
        <div className="min-h-screen bg-party-black text-party-white flex flex-col items-center justify-center p-4">
            {state.phase === 'SETUP' && (
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-8 text-party-white">Ai là gián điệp</h1>
                    <SetupScreen />
                </div>
            )}

            {state.phase === 'REVEAL' && (
                <div className="text-center">
                    <RoleRevealScreen />
                </div>
            )}

            {state.phase === 'DISCUSSION' && (
                <div className="text-center w-full max-w-md bg-party-white text-party-black rounded-2xl p-8 shadow-lg animate-fade-in">
                    <div className="w-20 h-20 bg-party-black rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageCircle className="w-10 h-10 text-party-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Bắt đầu thảo luận!</h2>
                    <p className="text-lg mb-8 text-gray-600">
                        Tất cả người chơi đã xem từ khóa. Hãy bắt đầu mô tả và tìm ra Gián điệp!
                    </p>

                    <button
                        onClick={handleReset}
                        className="w-full border-2 border-party-black text-party-black py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Chơi ván mới
                    </button>
                </div>
            )}
        </div>
    );
};

export default function WhoIsTheSpy() {
    return (
        <GameProvider>
            <GameContainer />
        </GameProvider>
    );
}
