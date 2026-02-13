import { Bomb as BombIcon } from 'lucide-react';

interface BombProps {
    isExploded: boolean;
}

export const Bomb: React.FC<BombProps> = ({ isExploded }) => {
    return (
        <div className={`relative flex items-center justify-center transition-all duration-500 ${isExploded ? 'scale-150' : 'scale-100'}`}>
            {/* Background Pulse */}
            {!isExploded && (
                <div className="absolute w-48 h-48 bg-red-500/20 rounded-full animate-ping"></div>
            )}

            {/* Explosion Effect */}
            {isExploded && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 bg-red-600 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute w-56 h-56 bg-orange-500 rounded-full animate-ping delay-75 opacity-75"></div>
                </div>
            )}

            {/* Main Icon */}
            <div className={`relative z-10 p-8 rounded-full bg-party-white shadow-xl border-4 ${isExploded ? 'border-red-600 bg-red-100' : 'border-party-black'}`}>
                <BombIcon
                    size={80}
                    className={`${isExploded ? 'text-red-600 animate-bounce' : 'text-party-black animate-pulse'}`}
                />
            </div>

            {/* Fuse Spark (Visual Polish) */}
            {!isExploded && (
                <div className="absolute top-0 right-10 w-4 h-4 bg-orange-500 rounded-full animate-bounce"></div>
            )}
        </div>
    );
};
