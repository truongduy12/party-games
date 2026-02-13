import { ArrowRight } from 'lucide-react';

interface QuestionCardProps {
    text: string;
    onPass: () => void;
    disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ text, onPass, disabled }) => {
    return (
        <div className="w-full max-w-sm animate-fade-in-up">
            <div className="bg-party-white border-2 border-party-black rounded-2xl p-6 shadow-lg text-center mb-6">
                <h3 className="text-xl font-bold leading-relaxed text-party-black">{text}</h3>
            </div>

            <button
                onClick={onPass}
                disabled={disabled}
                className="w-full bg-party-black text-party-white py-6 rounded-xl font-bold text-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
                <span>Xong & Chuyền</span>
                <ArrowRight size={32} />
            </button>
        </div>
    );
};
