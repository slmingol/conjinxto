import React from 'react';
import { Guess } from '../types';
import { SortBy } from '../settings';
import { Translations } from '../translations';

interface GuessListProps {
  guesses: Guess[];
  sortBy?: SortBy;
  theme: 'light' | 'dark';
  t: Translations;
}

export const GuessList: React.FC<GuessListProps> = ({ guesses, sortBy = 'similarity', theme, t }) => {
  const isDark = theme === 'dark';
  
  // Sort guesses based on settings
  const sortedGuesses = [...guesses].sort((a, b) => {
    if (sortBy === 'similarity') {
      return b.similarity - a.similarity; // Highest similarity first
    } else {
      // Guess order - maintain original order, so no sorting needed
      // But we need to reverse to show most recent first
      return 0; // Keep insertion order
    }
  });

  // If sorting by guess order, we want most recent first
  const displayGuesses = sortBy === 'guessOrder' 
    ? [...sortedGuesses].reverse() 
    : sortedGuesses;

  if (displayGuesses.length === 0) {
    return (
      <div className={`text-center py-8 ${
        isDark ? 'text-white/70' : 'text-gray-600'
      }`}>
        <p className="text-sm">{t.noGuessesYet}</p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {displayGuesses.map((guess, index) => {
        // Calculate rank based on similarity regardless of display order
        const sortedBySimRank = [...guesses]
          .sort((a, b) => b.similarity - a.similarity)
          .findIndex(g => g.word === guess.word) + 1;
        const rank = sortedBySimRank;
        
        // Rank-based colors (like original Contexto)
        let bgColor = 'bg-red-500';        // Default: far from answer
        if (rank <= 3) {
          bgColor = 'bg-green-500';        // Top 3: very close!
        } else if (rank <= 10) {
          bgColor = 'bg-yellow-500';       // Top 10: getting warmer
        }
        
        const isTopGuess = rank === 1;

        // Calculate percentage for bar (0-100%)
        const percentage = Math.round(guess.similarity * 100);
        
        return (
          <div
            key={`${guess.word}-${index}`}
            className={`rounded-lg p-3 shadow-md transition-all hover:shadow-lg ${
              isTopGuess ? 'ring-2 ring-green-400' : ''
            } ${isDark ? 'bg-gray-800/95' : 'bg-white/95'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`${bgColor} text-white font-bold text-sm px-3 py-1 rounded-lg min-w-[50px] text-center shadow`}>
                  {rank}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold text-base ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {guess.word}
                  </span>
                  {guess.isHint && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium" title="This was a hint">
                      💡 HINT
                    </span>
                  )}
                </div>
              </div>
              <div className={`text-sm font-semibold ${
                isDark ? 'text-white/80' : 'text-gray-700'
              }`}>
                {percentage}%
              </div>
            </div>
            
            {/* Bar graph visualization */}
            <div className={`w-full h-2 rounded-full overflow-hidden ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div
                className={`h-full ${bgColor} transition-all duration-300 ease-out`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
