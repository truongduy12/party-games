import { type GameCardData } from '../types/GameCard';

export const GAMES: GameCardData[] = [
    {
        id: 'idiom-game',
        title: 'Mô Tả Thành Ngữ',
        status: 'available',
        icon: '/idiom-game.svg',
        route: '/idiom-game',
        hasScoring: true,
    },
    {
        id: 'who-is-the-spy',
        title: 'Ai là gián điệp',
        status: 'available',
        icon: '/who-is-the-spy.svg',
        route: '/who-is-the-spy',
        hasScoring: false,
    },
    {
        id: 'kings-cup',
        title: "King's Cup",
        status: 'available',
        icon: '/kings-cup.svg',
        route: '/kings-cup',
        hasScoring: false,
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

export function getGameByPath(path: string): GameCardData | undefined {
    return GAMES.find(game => game.route === path);
}
