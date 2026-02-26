import React from 'react';
import { Guess, GameMode } from '../types';
import { ClosestWord } from '../wordSimilarity';

interface ClosestWordsModalProps {
  guesses: Guess[];
  closestWords: ClosestWord[];
  isLoading: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  targetWord: string;
  gameMode: GameMode;
  isComplete: boolean;
}

export const ClosestWordsModal: React.FC<ClosestWordsModalProps> = ({ guesses, closestWords, isLoading, onClose, theme, targetWord, isComplete }) => {
  const isDark = theme === 'dark';
  
  // Filter out target word unless game is complete
  const shouldShowSolution = isComplete;
  const filteredClosestWords = shouldShowSolution 
    ? closestWords 
    : closestWords.filter(w => w.word.toLowerCase() !== targetWord.toLowerCase());
  
  // Handle escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  // If we have closest words from API, use those; otherwise fall back to just showing guesses
  const displayWords = filteredClosestWords.length > 0 ? filteredClosestWords : 
    [...guesses]
      .sort((a, b) => b.similarity - a.similarity)
      .map((guess, index) => ({
        word: guess.word,
        rank: index + 1,
        similarity: guess.similarity,
        isGuessed: true,
      }));
  
  const guessedCount = displayWords.filter(w => w.isGuessed).length;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={`rounded-2xl p-6 max-w-2xl w-full mx-auto shadow-2xl animate-fade-in relative max-h-[80vh] overflow-hidden flex flex-col ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={isDark ? 'absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl font-bold' : 'absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold'}
          aria-label="Close"
        >
          ×
        </button>
        
        <div className="flex flex-col h-full">
          <div className="text-center mb-4">
            <h2 className={`text-xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              📊 Closest Words
            </h2>
            <p className={`text-sm mt-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {closestWords.length > 0 
                ? `Top 500 closest words - You've guessed ${guessedCount}` 
                : 'Your guesses ranked from closest to farthest'}
            </p>
          </div>

          {/* Loading indicator banner */}
          {isLoading && (
            <div className={`mb-3 px-4 py-2 rounded-lg flex items-center gap-3 ${
              isDark ? 'bg-purple-900/30' : 'bg-purple-100'
            }`}>
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-purple-600 border-t-transparent"></div>
              <p className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Loading top 500 closest words from API...
              </p>
            </div>
          )}

          {/* Scrollable list */}
          {displayWords.length === 0 && !isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No words to display. Please try making some guesses first.
                </p>
              </div>
            </div>
          )}
          
          {displayWords.length > 0 && (
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-2">
                {displayWords.map((word) => {
                  const similarityPercent = (word.similarity * 100).toFixed(1);
                
                return (
                  <div
                    key={word.word}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      word.isGuessed 
                        ? (isDark ? 'bg-purple-900/50 border border-purple-500/50' : 'bg-purple-100 border border-purple-300')
                        : (isDark ? 'bg-gray-700' : 'bg-gray-50')
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-12 h-10 rounded-lg font-bold text-sm ${
                        word.rank === 1 
                          ? 'bg-yellow-500 text-white'
                          : word.rank <= 10
                          ? 'bg-green-500 text-white'
                          : word.rank <= 50
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}>
                        #{word.rank}
                      </div>
                      <div>
                        <div className={`font-semibold flex items-center gap-2 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {word.word}
                          {word.isGuessed && (
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                              ✓ guessed
                            </span>
                          )}
                        </div>
                        <div className={`text-xs ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {similarityPercent}% similar
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          )}

          {/* Info footer */}
          <div className={`mt-4 pt-4 border-t text-center text-xs ${
            isDark ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}>
            {closestWords.length > 0 
              ? `Showing ${displayWords.length} closest words • ${guessedCount} guessed`
              : `You've found ${displayWords.length} word${displayWords.length !== 1 ? 's' : ''} so far`}
          </div>

          {/* Close button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white 
                         font-semibold rounded-lg transition-colors shadow-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
