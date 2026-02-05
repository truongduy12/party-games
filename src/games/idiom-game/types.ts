// Core data structure from JSON
export interface Idiom {
  id: number;
  content: string;
}

// Component state type
export interface GameState {
  currentIdiom: Idiom | null;
  previousIdiomId: number | null;
  isLoading: boolean;
  hasError: boolean;
}

// Utility function types
export type GetRandomIdiomFn = (idioms: Idiom[], excludeId?: number) => Idiom;

export type LoadNextIdiomFn = () => void;
