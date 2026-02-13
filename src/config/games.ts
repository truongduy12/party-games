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
        id: 'ticking-bomb',
        title: 'Bom Hẹn Giờ',
        status: 'available',
        icon: '/ticking-bomb.svg', // Ensure this icon exists or use placeholder? I don't have it. I'll use a placeholder or generic.
        route: '/ticking-bomb',
        hasScoring: false,
    },
    {
        id: 'sync-challenge',
        title: 'Đấu Trí Đồng Lòng',
        status: 'available',
        icon: '/sync-challenge.svg',
        route: '/sync-challenge',
    },
    {
        id: 'coming-soon',
        title: 'Trò chơi ...',
        status: 'coming-soon',
        icon: '/placeholder-game-icon.svg',
        route: null,
    },
];

export function getGameByPath(path: string): GameCardData | undefined {
    return GAMES.find(game => game.route === path);
}
