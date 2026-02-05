import { useState, useEffect } from 'react';
import type { Idiom } from './types';
import { getRandomIdiom, validateIdioms } from './utils';
import idiomsData from '../../data/thanh-ngu-tuc-ngu.json';
import { useScores } from '../../lib/scoreManager';

export default function IdiomGame() {
  const [currentIdiom, setCurrentIdiom] = useState<Idiom | null>(null);
  const [previousIdiomId, setPreviousIdiomId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { addBlueScore, addRedScore } = useScores();

  // Load next idiom helper
  const loadNextIdiom = () => {
    try {
      const validated = validateIdioms(idiomsData);
      const nextIdiom = getRandomIdiom(validated, previousIdiomId ?? undefined);
      setCurrentIdiom(nextIdiom);
      setPreviousIdiomId(nextIdiom.id);
    } catch (error) {
      console.error('Failed to load next idiom:', error);
      setHasError(true);
    }
  };

  // Score handlers
  const handleBlueScore = () => {
    addBlueScore(10);
    loadNextIdiom();
  };

  const handleRedScore = () => {
    addRedScore(10);
    loadNextIdiom();
  };

  // Skip handler
  const handleSkip = () => {
    loadNextIdiom();
  };

  // Retry handler for error state
  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    try {
      const validated = validateIdioms(idiomsData);
      const initialIdiom = getRandomIdiom(validated);
      setCurrentIdiom(initialIdiom);
      setPreviousIdiomId(initialIdiom.id);
      setIsLoading(false);
    } catch (error) {
      console.error('Retry failed to load idiom data:', error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  // Load and validate idioms on mount
  useEffect(() => {
    let mounted = true;

    const loadInitialData = () => {
      try {
        const validated = validateIdioms(idiomsData);
        const initialIdiom = getRandomIdiom(validated);

        if (mounted) {
          setCurrentIdiom(initialIdiom);
          setPreviousIdiomId(initialIdiom.id);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load idiom data:', error);
        if (mounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    loadInitialData();

    return () => {
      mounted = false;
    };
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Đang tải...</p>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
        <p className="text-center text-lg">Không thể tải dữ liệu thành ngữ</p>
        <button
          onClick={handleRetry}
          className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none transition-colors"
          aria-label="Thử lại tải dữ liệu"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20">
      {/* Main Game Content */}
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        {/* Idiom Display */}
        <div
          key={currentIdiom?.id}
          className="transition-opacity duration-150 mb-12 max-w-2xl w-full text-center"
        >
          <p className="text-4xl md:text-6xl font-normal text-[#1A1A1A]">{currentIdiom?.content}</p>
        </div>

        {/* Action Buttons - Horizontal Row */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
          <button
            className="h-16 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            aria-label="Cộng 10 điểm cho Đội Xanh"
            onClick={handleBlueScore}
          >
            +10
          </button>
          <button
            className="h-16 px-4 border-2 border-gray-300 rounded hover:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-colors"
            aria-label="Bỏ qua câu hiện tại"
            onClick={handleSkip}
          >
            Bỏ qua
          </button>
          <button
            className="h-16 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
            aria-label="Cộng 10 điểm cho Đội Đỏ"
            onClick={handleRedScore}
          >
            +10
          </button>
        </div>
      </div>
    </div>
  );
}
