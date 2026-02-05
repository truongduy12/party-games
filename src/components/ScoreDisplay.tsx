import { useScores } from '../lib/scoreManager';

export function ScoreDisplay() {
  const { scores } = useScores();

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-party-black text-party-white z-50 shadow-md"
      role="banner"
      aria-label="Bảng điểm đội"
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2" aria-label={`Đội Xanh: ${scores.blue} điểm`}>
          <div className="w-3 h-3 bg-blue-500 rounded-full" aria-hidden="true" />
          <span className="font-medium">Đội Xanh: {scores.blue}</span>
        </div>

        <div className="flex items-center gap-2" aria-label={`Đội Đỏ: ${scores.red} điểm`}>
          <span className="font-medium">Đội Đỏ: {scores.red}</span>
          <div className="w-3 h-3 bg-red-500 rounded-full" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
