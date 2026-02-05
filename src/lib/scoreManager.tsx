import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// TeamScores interface - represents cumulative points for both teams
interface TeamScores {
  blue: number;
  red: number;
}

// ScoreContextType - public API interface for score management
interface ScoreContextType {
  // Current scores (read-only state)
  scores: TeamScores;

  // Getter methods
  getBlueScore: () => number;
  getRedScore: () => number;

  // Mutation methods
  addBlueScore: (points: number) => void;
  addRedScore: (points: number) => void;
  resetScores: () => void;

  // Authorization
  canReset: boolean;
}

// Create React Context for score management
const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

// localStorage key for persisting scores
const STORAGE_KEY = 'party-games-scores';

// ScoreProvider component - wraps app to provide global score state
interface ScoreProviderProps {
  children: ReactNode;
  canReset: boolean; // Controls whether reset button should be enabled
}

export function ScoreProvider({ children, canReset }: ScoreProviderProps) {
  // Initialize scores from localStorage or default to {blue: 0, red: 0}
  const [scores, setScores] = useState<TeamScores>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate parsed data
        if (
          typeof parsed.blue === 'number' &&
          typeof parsed.red === 'number' &&
          parsed.blue >= 0 &&
          parsed.red >= 0
        ) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Failed to load scores from localStorage:', error);
    }
    // Default to 0 if no valid data found
    return { blue: 0, red: 0 };
  });

  // Persist scores to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch (error) {
      console.error('Failed to save scores to localStorage:', error);
      // Fallback to in-memory state (already in React state)
    }
  }, [scores]);

  // Getter methods
  const getBlueScore = () => scores.blue;
  const getRedScore = () => scores.red;

  // Mutation methods
  const addBlueScore = (points: number) => {
    if (points > 0 && Number.isInteger(points)) {
      setScores((prev) => ({ ...prev, blue: prev.blue + points }));
    }
  };

  const addRedScore = (points: number) => {
    if (points > 0 && Number.isInteger(points)) {
      setScores((prev) => ({ ...prev, red: prev.red + points }));
    }
  };

  const resetScores = () => {
    if (canReset) {
      setScores({ blue: 0, red: 0 });
    }
  };

  const contextValue: ScoreContextType = {
    scores,
    getBlueScore,
    getRedScore,
    addBlueScore,
    addRedScore,
    resetScores,
    canReset,
  };

  return <ScoreContext.Provider value={contextValue}>{children}</ScoreContext.Provider>;
}

// Custom hook to access score management from any component
// eslint-disable-next-line react-refresh/only-export-components
export function useScores() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScores must be used within a ScoreProvider');
  }
  return context;
}
