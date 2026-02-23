import React, { useEffect, useState } from 'react';
import { loadStatistics, getAverageAttempts, getWinPercentage, GameStatistics } from '../statistics';
import { Translations } from '../translations';

interface StatisticsModalProps {
  onClose: () => void;
  theme: 'light' | 'dark';
  t: Translations;
}

export const StatisticsModal: React.FC<StatisticsModalProps> = ({ onClose, theme, t }) => {
  const [stats, setStats] = useState<GameStatistics | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    setStats(loadStatistics());
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!stats) return null;

  const avgAttempts = getAverageAttempts(stats);
  const winPercentage = getWinPercentage(stats);

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className={`rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl animate-fade-in relative w-full ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={isDark ? 'absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-xl font-bold' : 'absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold'}
          aria-label="Close"
        >
          ×
        </button>
        
        <div>
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              📊 {t.statistics}
            </h2>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {t.gamePerformance}
            </p>
          </div>

          {/* Main stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.gamesPlayed}</div>
              <div className="text-xs text-gray-600 mt-1">{t.played}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{winPercentage}%</div>
              <div className="text-xs text-gray-600 mt-1">{t.winRate}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.currentStreak}</div>
              <div className="text-xs text-gray-600 mt-1">{t.currentStreak}</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.bestStreak}</div>
              <div className="text-xs text-gray-600 mt-1">{t.bestStreak}</div>
            </div>
          </div>

          {/* Secondary stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-gray-700">
                {stats.bestScore !== null ? stats.bestScore : '-'}
              </div>
              <div className="text-xs text-gray-600 mt-1">{t.bestScore}</div>
              <div className="text-xs text-gray-500">{t.fewestAttempts}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-gray-700">
                {avgAttempts > 0 ? avgAttempts : '-'}
              </div>
              <div className="text-xs text-gray-600 mt-1">{t.avgAttempts}</div>
              <div className="text-xs text-gray-500">{t.perWin}</div>
            </div>
          </div>

          {/* Attempts distribution */}
          {stats.gamesWon > 0 && Object.keys(stats.attemptsDistribution).length > 0 && (
            <div className="mb-6">
              <h3 className={`text-base font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>{t.attemptsDistribution}</h3>
              <div className="space-y-2">
                {['1-5', '6-10', '11-20', '21-30', '31-50', '51+'].map(bucket => {
                  const count = stats.attemptsDistribution[bucket] || 0;
                  const percentage = stats.gamesWon > 0 ? (count / stats.gamesWon) * 100 : 0;
                  
                  if (count === 0) return null;
                  
                  return (
                    <div key={bucket} className="flex items-center">
                      <div className={`w-16 text-xs font-medium ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>{bucket}</div>
                      <div className={`flex-1 rounded-full h-6 overflow-hidden ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div 
                          className="bg-purple-500 h-full rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${Math.max(percentage, 5)}%` }}
                        >
                          <span className="text-xs text-white font-semibold">{count}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No games message */}
          {stats.gamesPlayed === 0 && (
            <div className={`text-center py-8 rounded-lg ${
              isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              <div className="text-4xl mb-3">🎮</div>
              <p className="text-lg font-semibold mb-1">{t.noGamesYet}</p>
              <p className="text-sm">{t.startPlaying}</p>
            </div>
          )}

          {/* Close button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white 
                         font-semibold rounded-lg transition-colors shadow-lg"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
