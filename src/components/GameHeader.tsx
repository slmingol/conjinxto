import React, { useState, useEffect } from 'react';
import { Translations } from '../translations';
import { GameMode } from '../types';
import { getGameNumber } from '../wordData';
import logoImage from '../assets/conjinxto_logo_solo.png';

interface GameHeaderProps {
  attempts: number;
  hintsUsed: number;
  gameNumber: number;
  gameMode: GameMode;
  onGiveUp: () => void;
  onReset: () => void;
  onShowStats: () => void;
  onShowSettings: () => void;
  onGetHint: () => void;
  onPlayArchive: (gameNumber: number) => void;
  isComplete: boolean;
  theme: 'light' | 'dark';
  t: Translations;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  attempts,
  hintsUsed,
  gameNumber,
  gameMode,
  onGiveUp,
  onReset,
  onShowStats,
  onShowSettings,
  onGetHint,
  onPlayArchive,
  isComplete,
  theme,
  t,
}) => {
  const isDark = theme === 'dark';
  const [timeUntilNext, setTimeUntilNext] = useState('');
  const [showArchiveSelector, setShowArchiveSelector] = useState(false);
  const [archiveNumber, setArchiveNumber] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 30;
  
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
  
  const handlePlayArchive = () => {
    const num = parseInt(archiveNumber, 10);
    if (num >= 1) {
      onPlayArchive(num);
      setShowArchiveSelector(false);
      setArchiveNumber('');
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 md:mb-6 gap-3 md:gap-0">
      <div className="flex items-center gap-2 md:gap-3">
        <img src={logoImage} alt="Conjinxto Logo" className="h-12 w-12 md:h-20 md:w-20 object-contain flex-shrink-0" />
        <div>
          <h1 className={`text-2xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.title}</h1>
          <p className={`text-xs mt-0.5 md:mt-1 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Word Similarity Game...</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          <button
            onClick={onShowSettings}
            className={`px-2 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors shadow-md text-sm font-medium flex items-center ${
              isDark ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title="Settings"
            aria-label="Settings"
          >
            <span className="text-base">⚙️</span>
          </button>
          <button
            onClick={onShowStats}
            className={`px-2 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors shadow-md text-xs font-medium flex items-center ${
              isDark ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title="View Statistics"
            aria-label="View Statistics"
          >
            <span className="text-base">📊</span>
          </button>
          {!isComplete && (
            <>
              <button
                onClick={onGetHint}
                className="px-2 py-1.5 md:px-4 md:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                           transition-colors shadow-md text-xs font-medium flex items-center"
                title="Get a hint"
                aria-label={t.hint}
              >
                <span className="text-base mr-0.5 md:mr-1">💡</span>
                <span className="hidden sm:inline">{t.hint}</span>
              </button>
              <button
                onClick={onGiveUp}
                className="px-2 py-1.5 md:px-4 md:py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg 
                           transition-colors shadow-md text-xs font-medium whitespace-nowrap"
                aria-label={t.giveUp}
              >
                {t.giveUp}
              </button>
            </>
          )}
          <button
            onClick={onReset}
            className={`px-2 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors shadow-md text-xs font-medium whitespace-nowrap ${
              isDark ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            aria-label={t.newGame}
          >
            {t.newGame}
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-base">
            <button
              onClick={() => {
                setShowArchiveSelector(true);
                setCurrentPage(1);
              }}
              className={`hover:underline cursor-pointer ${isDark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
              title="Click to play past games"
            >
              Game: <span className="font-bold">#{gameNumber}</span>
              {gameMode === 'archive' && <span className="ml-1 text-xs">(Archive)</span>}
            </button>
            <p className={`${isDark ? 'text-white/80' : 'text-gray-700'}`}>
              {t.attempts}: <span className="font-bold">{attempts}</span>
            </p>
            <p className={`${isDark ? 'text-white/80' : 'text-gray-700'}`}>
              {t.hints}: <span className="font-bold">{hintsUsed}</span>
            </p>
          </div>
          <div className="flex flex-col md:items-end text-xs">
            <p className={`${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              <span className="md:hidden">📅 </span>{currentDate}
            </p>
            <p className={`${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              <span className="md:hidden">⏰ </span>Next game in: <span className="font-mono">{timeUntilNext}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Archive Game Selector Modal */}
      {showArchiveSelector && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowArchiveSelector(false);
            setCurrentPage(1);
          }}
        >
          <div 
            className={`rounded-2xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto mx-4 shadow-2xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={`text-xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              🕰️ Archive Games
            </h2>
            <p className={`text-sm mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Play past puzzles. Archive games don't count toward your statistics.
            </p>
            
            {/* Grid of past games */}
            {(() => {
              const currentGameNumber = getGameNumber();
              if (currentGameNumber === 1) {
                return (
                  <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p className="text-lg mb-2">📅 No archive games yet!</p>
                    <p className="text-sm">This is the first game. Check back tomorrow for archives.</p>
                  </div>
                );
              }
              
              const totalGames = currentGameNumber;
              const startIndex = (currentPage - 1) * gamesPerPage;
              const endIndex = Math.min(startIndex + gamesPerPage, totalGames);
              
              return (
                <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2 mb-4">
                  {Array.from({ length: endIndex - startIndex }, (_, i) => {
                    const num = totalGames - (startIndex + i); // Reverse order (newest first)
                    const gameDate = new Date('2026-01-31');
                    gameDate.setDate(gameDate.getDate() + num - 1);
                    const dateStr = gameDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const isCurrentGame = num === gameNumber;
                    
                    return (
                      <button
                        key={num}
                        onClick={() => {
                          onPlayArchive(num);
                          setShowArchiveSelector(false);
                          setArchiveNumber('');
                          setCurrentPage(1);
                        }}
                        className={`p-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 relative ${
                          isCurrentGame
                            ? isDark
                              ? 'bg-green-700 hover:bg-green-600 text-white ring-2 ring-green-400'
                              : 'bg-green-600 hover:bg-green-700 text-white ring-2 ring-green-300'
                            : isDark
                              ? 'bg-purple-600/80 hover:bg-purple-600 text-white'
                              : 'bg-purple-100 hover:bg-purple-200 text-purple-900'
                        }`}
                        title={`${dateStr}${isCurrentGame ? ' (Currently Playing)' : ''}`}
                      >
                        {isCurrentGame && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        )}
                        <div className="text-base">#{num}</div>
                        <div className="text-[10px] opacity-75">{dateStr}</div>
                      </button>
                    );
                })}
                </div>
              );
            })()}
            
            {/* Pagination controls */}
            {(() => {
              const currentGameNumber = getGameNumber();
              const totalGames = currentGameNumber;
              const totalPages = Math.ceil(totalGames / gamesPerPage);
              
              if (totalPages <= 1) return null;
              
              return (
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                      isDark
                        ? 'bg-purple-600/80 hover:bg-purple-600 text-white'
                        : 'bg-purple-200 hover:bg-purple-300 text-purple-900'
                    }`}
                  >
                    ← Previous
                  </button>
                  
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Page {currentPage} of {totalPages}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                      isDark
                        ? 'bg-purple-600/80 hover:bg-purple-600 text-white'
                        : 'bg-purple-200 hover:bg-purple-300 text-purple-900'
                    }`}
                  >
                    Next →
                  </button>
                </div>
              );
            })()}
            
            {/* Manual entry option */}
            <div className={`border-t pt-4 mt-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Or enter a specific game number:
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  min="1"
                  value={archiveNumber}
                  onChange={(e) => setArchiveNumber(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePlayArchive()}
                  placeholder="Game #"
                  className={`flex-1 px-4 py-2 rounded-lg border-2 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button
                  onClick={handlePlayArchive}
                  disabled={!archiveNumber || parseInt(archiveNumber, 10) < 1}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white 
                             font-semibold rounded-lg transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Play
                </button>
              </div>
            </div>
            
            <button
              onClick={() => {
                setShowArchiveSelector(false);
                setArchiveNumber('');
                setCurrentPage(1);
              }}
              className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
