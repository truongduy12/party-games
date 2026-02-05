// GameCardData interface - metadata for a single game card
export interface GameCardData {
  id: string;
  title: string;
  status: 'coming-soon' | 'available';
  icon: string;
  route: string | null;
}
