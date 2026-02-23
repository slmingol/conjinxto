import React, { useState, useEffect } from 'react';
import { Translations } from '../translations';

interface GameHeaderProps {
  attempts: number;
  hintsUsed: number;
  gameNumber: number;
  onGiveUp: () => void;
  onReset: () => void;
  onShowStats: () => void;
  onShowSettings: () => void;
  onGetHint: () => void;
  isComplete: boolean;
  theme: 'light' | 'dark';
  t: Translations;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  attempts,
  hintsUsed,
  gameNumber,
  onGiveUp,
  onReset,
  onShowStats,
  onShowSettings,
  onGetHint,
  isComplete,
  theme,
  t,
}) => {
  const isDark = theme === 'dark';
  const [timeUntilNext, setTimeUntilNext] = useState('');
  
  // Calculate time remaining until next game (midnight)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilNext(`${hours}h ${minutes}m ${seconds}s`);
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.title}</h1>
        <p className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Word Similarity Game...</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex space-x-2">
          <button
            onClick={onShowSettings}
            className={`px-4 py-2 rounded-lg transition-colors shadow-md text-sm font-medium flex items-center ${
              isDark ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title="Settings"
          >
            <span className="text-base">⚙️</span>
          </button>
          <button
            onClick={onShowStats}
            className={`px-4 py-2 rounded-lg transition-colors shadow-md text-xs font-medium flex items-center ${
              isDark ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title="View Statistics"
          >
            <span className="text-base">📊</span>
          </button>
          {!isComplete && (
            <>
              <button
                onClick={onGetHint}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                           transition-colors shadow-md text-xs font-medium flex items-center"
                title="Get a hint"
              >
                <span className="text-base mr-1">💡</span>
                {t.hint}
              </button>
              <button
                onClick={onGiveUp}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg 
                           transition-colors shadow-md text-xs font-medium"
              >
                {t.giveUp}
              </button>
            </>
          )}
          <button
            onClick={onReset}
            className={`px-4 py-2 rounded-lg transition-colors shadow-md text-xs font-medium ${
              isDark ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {t.newGame}
          </button>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-4">
            <p className={`text-base ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
              Game: <span className="font-bold">#{gameNumber}</span>
            </p>
            <p className={`text-base ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
              {t.attempts}: <span className="font-bold">{attempts}</span>
            </p>
            <p className={`text-base ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
              {t.hints}: <span className="font-bold">{hintsUsed}</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              {currentDate}
            </p>
            <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              Next game in: <span className="font-mono">{timeUntilNext}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
