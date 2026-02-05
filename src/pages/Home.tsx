import { GameCard } from '../components/GameCard';
import { type GameCardData } from '../types/GameCard';
import { useScores } from '../lib/scoreManager';

// Placeholder game data - 6 cards with Vietnamese titles
const PLACEHOLDER_GAMES: GameCardData[] = [
  {
    id: 'idiom-game',
    title: 'Mô Tả Thành Ngữ',
    status: 'available',
    icon: '/placeholder-game-icon.svg',
    route: '/idiom-game',
  },
  {
    id: 'game-2',
    title: 'Trò chơi 2',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
  {
    id: 'game-3',
    title: 'Trò chơi 3',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
  {
    id: 'game-4',
    title: 'Trò chơi 4',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
  {
    id: 'game-5',
    title: 'Trò chơi 5',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
  {
    id: 'game-6',
    title: 'Trò chơi 6',
    status: 'coming-soon',
    icon: '/placeholder-game-icon.svg',
    route: null,
  },
];

export function Home() {
  const { resetScores, canReset, scores } = useScores();

  return (
    <div className="min-h-screen bg-party-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-party-black">Party Games</h1>

          {canReset && (scores.blue > 0 || scores.red > 0) && (
            <button
              onClick={resetScores}
              className="bg-party-black text-party-white px-6 py-2 rounded-lg hover:bg-party-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-party-gray-500"
              aria-label="Reset điểm về 0"
            >
              Reset điểm
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_GAMES.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
}
