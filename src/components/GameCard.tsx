import { type GameCardData } from '../types/GameCard';

export function GameCard({ title, icon, status }: GameCardData) {
  const isComingSoon = status === 'coming-soon';

  return (
    <div
      className={`
        bg-party-white border-2 border-party-gray-300 rounded-lg p-6
        flex flex-col items-center justify-center gap-4
        transition-all duration-200
        ${
          isComingSoon
            ? 'opacity-60 cursor-not-allowed'
            : 'hover:border-party-black hover:shadow-lg cursor-pointer'
        }
      `}
      role="article"
      aria-label={`${title} - ${isComingSoon ? 'Sắp ra mắt' : 'Sẵn sàng'}`}
      tabIndex={isComingSoon ? -1 : 0}
    >
      <div className="aspect-square bg-party-gray-200 rounded flex items-center justify-center w-24 h-24">
        <img src={icon} alt={`${title} icon`} className="w-full h-full object-contain" />
      </div>

      <h3 className="text-xl font-medium text-party-black">{title}</h3>

      {isComingSoon && <span className="text-sm text-party-gray-600 font-medium">Sắp ra mắt</span>}
    </div>
  );
}
