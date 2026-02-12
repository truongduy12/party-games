import { useState } from 'react';
import { useGame } from './GameContext';
import { getRandomKeywordPair } from './utils';
import { Users, Play } from 'lucide-react';

export function SetupScreen() {
    const { dispatch } = useGame();
    const [count, setCount] = useState<number>(5);
    const [error, setError] = useState<string>('');

    const handleStart = () => {
        if (count < 3) {
            setError('Cần tối thiểu 3 người chơi');
            return;
        }

        // 1. Set player count
        dispatch({ type: 'SET_PLAYER_COUNT', payload: count });

        // 2. Select keyword and start game
        const pair = getRandomKeywordPair();
        dispatch({ type: 'START_GAME', payload: pair });
    };

    const handleIncrement = () => {
        setCount(prev => prev + 1);
        setError('');
    };

    const handleDecrement = () => {
        if (count > 3) {
            setCount(prev => prev - 1);
            setError('');
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
            <div className="bg-party-white text-party-black rounded-2xl p-8 w-full shadow-lg text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-party-black" />
                <h2 className="text-2xl font-bold mb-6">Chọn số người chơi</h2>

                <div className="flex items-center justify-center gap-6 mb-8">
                    <button
                        onClick={handleDecrement}
                        className="w-12 h-12 rounded-full border-2 border-party-black flex items-center justify-center text-2xl font-bold active:bg-gray-200 transition-colors disabled:opacity-50"
                        disabled={count <= 3}
                        aria-label="Giảm số người chơi"
                    >
                        -
                    </button>

                    <span className="text-4xl font-bold tabular-nums">{count}</span>

                    <button
                        onClick={handleIncrement}
                        className="w-12 h-12 rounded-full border-2 border-party-black flex items-center justify-center text-2xl font-bold active:bg-gray-200 transition-colors"
                        aria-label="Tăng số người chơi"
                    >
                        +
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 mb-4 font-medium animate-pulse">{error}</p>
                )}

                <button
                    onClick={handleStart}
                    className="w-full bg-party-black text-party-white py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-opacity"
                >
                    <Play className="w-5 h-5 fill-current" />
                    Bắt đầu
                </button>
            </div>

            <div className="mt-8 text-center max-w-sm px-4">
                <h3 className="font-bold mb-2">Cách chơi:</h3>
                <ul className="text-sm text-gray-400 space-y-2 text-left list-disc list-inside">
                    <li>Mỗi người sẽ nhận được một từ khóa bí mật.</li>
                    <li>Có 1 người là <strong>Gián điệp</strong> (từ khóa khác), còn lại là <strong>Dân thường</strong>.</li>
                    <li>Lần lượt mô tả từ khóa của mình mà không nói lộ liễu.</li>
                    <li>Sau khi tất cả mô tả, cùng bình chọn ai là Gián điệp!</li>
                </ul>
            </div>

            <p className="mt-8 text-gray-400 text-sm max-w-xs text-center">
                Trò chơi yêu cầu tối thiểu 3 người: 1 Gián điệp và 2 Dân thường.
            </p>
        </div>
    );
}
