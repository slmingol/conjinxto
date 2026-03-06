import { useState, useEffect, useRef } from 'react';
import { useGame } from './hooks/useGame';
import { useTheme } from './hooks/useTheme';
import { GameHeader } from './components/GameHeader';
import { Instructions } from './components/Instructions';
import { GuessInput } from './components/GuessInput';
import { GuessList } from './components/GuessList';
import { WinModal } from './components/WinModal';
import { StatisticsModal } from './components/StatisticsModal';
import { SettingsModal } from './components/SettingsModal';
import { ClosestWordsModal } from './components/ClosestWordsModal';
import { preloadDictionary } from './dictionaryLoader';
import { loadSettings, GameSettings } from './settings';
import { useTranslation } from './translations';
import { capitalizeProperNoun } from './utils/properNouns';
import { getClosestWords } from './wordSimilarity';

const INSTRUCTIONS_DISMISSED_KEY = 'conjinxto-instructions-dismissed';
const WIN_MODAL_SEEN_KEY = 'conjinxto-win-modal-seen';

// Migrate old Contexto localStorage keys to new Conjinxto keys (one-time migration)
function migrateLocalStorage() {
  const migrations = [
    { old: 'contexto-game-state', new: 'conjinxto-game-state' },
    { old: 'contexto-game-date', new: 'conjinxto-game-date' },
    { old: 'contexto-statistics', new: 'conjinxto-statistics' },
    { old: 'contexto-settings', new: 'conjinxto-settings' },
    { old: 'contexto-instructions-dismissed', new: 'conjinxto-instructions-dismissed' },
  ];

  migrations.forEach(({ old, new: newKey }) => {
    const oldValue = localStorage.getItem(old);
    if (oldValue !== null && localStorage.getItem(newKey) === null) {
      localStorage.setItem(newKey, oldValue);
      localStorage.removeItem(old);
    }
  });
}

// Run migration once on app load
migrateLocalStorage();

function App() {
  const {
    gameState,
    inputWord,
    setInputWord,
    error,
    isLoading,
    makeGuess,
    giveUp,
    resetGame,
    getHint,
    playArchiveGame,
  } = useGame();

  const [showInstructions, setShowInstructions] = useState(() => {
    // Check if user has previously dismissed the instructions
    const dismissed = localStorage.getItem(INSTRUCTIONS_DISMISSED_KEY);
    return dismissed !== 'true';
  });
  const [showRestoredNotice, setShowRestoredNotice] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showClosestWords, setShowClosestWords] = useState(false);
  const [settings, setSettings] = useState<GameSettings>(loadSettings());
  const [showNewBestBadge, setShowNewBestBadge] = useState(false);
  const [previousBestRank, setPreviousBestRank] = useState<number | null>(null);
  const [closestWords, setClosestWords] = useState<any[]>([]);
  const [isLoadingClosestWords, setIsLoadingClosestWords] = useState(false);

  // Track if we've already shown the modal for this win
  const previousIsComplete = useRef(false);
  const hasShownModalThisSession = useRef(false);

  // Get translations based on current language
  const t = useTranslation(settings.language);

  // Apply theme
  const theme = useTheme(settings.theme);

  // Preload dictionary early for better UX
  useEffect(() => {
    preloadDictionary();
  }, []);

  // Initialize completion tracking on mount
  useEffect(() => {
    // If game is already complete on load, mark as already shown to prevent modal
    if (gameState.isComplete && gameState.guesses.some(g => g.word.toLowerCase() === gameState.targetWord.toLowerCase())) {
      previousIsComplete.current = true;
      hasShownModalThisSession.current = true;
    }
  }, []); // Only run on mount

  // Show win modal when game is completed successfully
  useEffect(() => {
    const hasWon = gameState.isComplete && gameState.guesses.length > 0 && 
        gameState.guesses.some(g => g.word.toLowerCase() === gameState.targetWord.toLowerCase());
    
    if (hasWon) {
      // If this is a NEW win (isComplete just changed from false to true), always show modal
      if (!previousIsComplete.current && !hasShownModalThisSession.current) {
        setShowWinModal(true);
        hasShownModalThisSession.current = true;
        
        // Mark that we've shown the modal today
        const today = new Date().toDateString();
        localStorage.setItem(WIN_MODAL_SEEN_KEY, today);
      }
    }
    
    previousIsComplete.current = gameState.isComplete;
  }, [gameState.isComplete, gameState.guesses]);

  // Check if we restored a saved game
  useEffect(() => {
    if (gameState.guesses.length > 0) {
      setShowRestoredNotice(true);
      const timer = setTimeout(() => setShowRestoredNotice(false), 7500);
      return () => clearTimeout(timer);
    }
  }, []); // Only run on mount

  // Track new best rank and show badge notification
  useEffect(() => {
    if (gameState.guesses.length === 0) return;
    
    const sortedGuesses = [...gameState.guesses].sort((a, b) => b.similarity - a.similarity);
    const currentBestRank = 1; // Always rank 1 for the best guess
    
    // If we have a previous best and the latest guess improved it
    if (previousBestRank !== null && sortedGuesses.length > 0) {
      const latestGuess = gameState.guesses[gameState.guesses.length - 1];
      const isNewBest = latestGuess.word === sortedGuesses[0].word;
      
      if (isNewBest && previousBestRank !== currentBestRank) {
        setShowNewBestBadge(true);
        const timer = setTimeout(() => setShowNewBestBadge(false), 3000);
        return () => clearTimeout(timer);
      }
    }
    
    setPreviousBestRank(currentBestRank);
  }, [gameState.guesses.length]); // Track changes in guess count

  // Keyboard shortcut: Press 'C' to open Closest Words
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key.toLowerCase() === 'c' && gameState.guesses.length > 0) {
        handleOpenClosestWords();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.guesses.length, gameState.targetWord]);

  const handleGiveUp = () => {
    giveUp();
  };

  const handleResetGame = () => {
    resetGame();
    // Clear win modal flag when resetting to allow seeing it again
    localStorage.removeItem(WIN_MODAL_SEEN_KEY);
    hasShownModalThisSession.current = false;
  };

  const handleGetHint = () => {
    getHint(settings.hintDifficulty);
  };

  const handleOpenClosestWords = async () => {
    setShowClosestWords(true);
    
    // Only fetch top 500 closest words if the game is complete
    // Otherwise, just show the player's guesses to avoid spoiling the answer
    if (gameState.isComplete) {
      setIsLoadingClosestWords(true);
      try {
        const guessedWords = new Set(gameState.guesses.map(g => g.word.toLowerCase()));
        const closest = await getClosestWords(gameState.targetWord, guessedWords);
        setClosestWords(closest);
      } catch (error) {
        console.error('Error fetching closest words:', error);
        setClosestWords([]);
      } finally {
        setIsLoadingClosestWords(false);
      }
    } else {
      // Game not complete - don't fetch from API, just show guesses
      setClosestWords([]);
    }
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    localStorage.setItem(INSTRUCTIONS_DISMISSED_KEY, 'true');
  };

  return (
    <div className="min-h-screen py-3 md:py-8 px-3 md:px-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          attempts={gameState.attempts}
          hintsUsed={gameState.hintsUsed}
          gameNumber={gameState.gameNumber}
          gameMode={gameState.gameMode}
          onGiveUp={handleGiveUp}
          onReset={handleResetGame}
          onShowStats={() => setShowStatistics(true)}
          onShowSettings={() => setShowSettings(true)}
          onGetHint={handleGetHint}
          onPlayArchive={playArchiveGame}
          isComplete={gameState.isComplete}
          theme={theme}
          t={t}
        />

        {/* Archive Mode Banner */}
        {gameState.gameMode === 'archive' && (
          <div className={`mb-4 px-4 py-3 rounded-lg shadow-lg border-2 ${
            theme === 'dark' 
              ? 'bg-orange-900/30 border-orange-600 text-orange-200' 
              : 'bg-orange-50 border-orange-400 text-orange-800'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
              <span className="text-xl">🕰️</span>
              <span className="font-semibold text-sm sm:text-base">
                <span className="block sm:inline">Archive Mode: Game #{gameState.gameNumber}</span>
                <span className="block sm:inline sm:ml-1">- Won't affect statistics</span>
              </span>
            </div>
          </div>
        )}

        {/* Reserved space for notifications and instructions to prevent layout shift */}
        <div className="min-h-[68px] mb-4">
          {/* Restored progress notification */}
          {showRestoredNotice && (
            <div className={`mb-4 px-4 py-3 rounded-lg shadow-lg 
                            flex items-center justify-between animate-fade-in ${
              gameState.isComplete && gameState.guesses.some(g => g.word.toLowerCase() === gameState.targetWord.toLowerCase())
                ? 'bg-green-500/90 text-white'
                : 'bg-blue-500/90 text-white'
            }`}>
              <span className="flex items-center">
                <span className="text-xl mr-2">
                  {gameState.isComplete && gameState.guesses.some(g => g.word.toLowerCase() === gameState.targetWord.toLowerCase()) ? '🎉' : '💾'}
                </span>
                <span>
                  {gameState.isComplete && gameState.guesses.some(g => g.word.toLowerCase() === gameState.targetWord.toLowerCase())
                    ? `${t.completedToday} ${gameState.attempts} ${gameState.attempts !== 1 ? t.attempts_plural : t.attempt}.`
                    : `${t.progressSaved} ${gameState.guesses.length} ${gameState.guesses.length !== 1 ? t.attempts_plural : t.attempt}.`
                  }
                </span>
              </span>
              <button 
                onClick={() => setShowRestoredNotice(false)}
                className="text-white/80 hover:text-white font-bold text-xl"
              >
                ×
              </button>
            </div>
          )}

          {showInstructions && (
            <Instructions onClose={handleCloseInstructions} theme={theme} t={t} />
          )}
        </div>

        {!showInstructions && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setShowInstructions(true)}
              className={`text-sm underline ${
                theme === 'dark' ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {t.howToPlay}
            </button>
          </div>
        )}

        <div className={`backdrop-blur-sm rounded-xl p-6 shadow-2xl mb-6 ${
          theme === 'dark' ? 'bg-white/10' : 'bg-white/60'
        }`}>
          <GuessInput
            value={inputWord}
            onChange={setInputWord}
            onSubmit={() => makeGuess(inputWord)}
            error={error}
            disabled={gameState.isComplete || isLoading}
            isLoading={isLoading}
            theme={theme}
            t={t}
          />
          
          {/* Closest Words Button */}
          {gameState.guesses.length > 0 && (() => {
            const sortedGuesses = [...gameState.guesses].sort((a, b) => b.similarity - a.similarity);
            const bestGuess = sortedGuesses[0];
            const bestPercent = Math.round(bestGuess.similarity * 100);
            
            return (
              <div className="mt-4 pt-4 border-t border-gray-300/30">
                <button
                  onClick={handleOpenClosestWords}
                  disabled={isLoadingClosestWords}
                  className={`w-full px-3 sm:px-4 py-3 rounded-lg font-semibold text-sm transition-all relative overflow-hidden shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                    theme === 'dark'
                      ? 'bg-purple-600/80 hover:bg-purple-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {/* Background gradient based on best similarity */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-600 opacity-50"
                    style={{ width: `${bestPercent}%` }}
                  />
                  
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="relative">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="whitespace-nowrap">📊 Closest Words</span>
                        <span className="text-xs opacity-90">({gameState.guesses.length} guesses)</span>
                        {showNewBestBadge && (
                          <span className="animate-bounce text-yellow-300">🌟</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs opacity-90 flex-wrap">
                      <span>Best:</span>
                      <span className="font-bold truncate max-w-[100px] sm:max-w-none">{bestGuess.word}</span>
                      <span className="px-1.5 sm:px-2 py-0.5 bg-white/20 rounded whitespace-nowrap">#{1}</span>
                      <span className="px-1.5 sm:px-2 py-0.5 bg-white/20 rounded whitespace-nowrap">{bestPercent}%</span>
                    </div>
                  </div>
                  {/* Hint: Press C - mobile hidden */}
                  <div className="hidden sm:block absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] opacity-50">
                    Press C
                  </div>
                </button>
              </div>
            );
          })()}
        </div>

        {/* Show answer when gave up (not won) */}
        {gameState.isComplete && !gameState.guesses.some(g => g.word.toLowerCase() === gameState.targetWord.toLowerCase()) && (
          <div className={`backdrop-blur-sm rounded-xl p-6 shadow-2xl mb-6 ${
            theme === 'dark' ? 'bg-yellow-500/20 border-2 border-yellow-500/50' : 'bg-yellow-100/80 border-2 border-yellow-500'
          }`}>
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-3">🎯</span>
              <div>
                <p className={`text-sm font-semibold ${
                  theme === 'dark' ? 'text-yellow-200' : 'text-yellow-900'
                }`}>
                  {t.wordWas}
                </p>
                <p className={`text-3xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {capitalizeProperNoun(gameState.targetWord)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className={`backdrop-blur-sm rounded-xl p-6 shadow-2xl ${
          theme === 'dark' ? 'bg-white/10' : 'bg-white/60'
        }`}>
          <h2 className={`text-xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            {t.yourGuesses} ({gameState.guesses.length})
          </h2>
          <GuessList guesses={gameState.guesses} sortBy={settings.sortBy} theme={theme} t={t} />
        </div>

        {showWinModal && (
          <WinModal
            targetWord={gameState.targetWord}
            attempts={gameState.attempts}
            onNewGame={handleResetGame}
            onClose={() => setShowWinModal(false)}
            theme={theme}
            t={t}
          />
        )}

        {showStatistics && (
          <StatisticsModal
            onClose={() => setShowStatistics(false)}
            theme={theme}
            t={t}
          />
        )}

        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            onSettingsChange={(newSettings) => setSettings(newSettings)}
            theme={theme}
            t={t}
          />
        )}

        {showClosestWords && (
          <ClosestWordsModal
            guesses={gameState.guesses}
            closestWords={closestWords}
            isLoading={isLoadingClosestWords}
            onClose={() => setShowClosestWords(false)}
            theme={theme}
            targetWord={gameState.targetWord}
            gameMode={gameState.gameMode}
            isComplete={gameState.isComplete}
          />
        )}
      </div>

      {/* Version display in lower right corner */}
      <div className="fixed bottom-4 right-4 text-right">
        <div className={`text-xs ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <div>v{__APP_VERSION__}</div>
          <div>© 2026</div>
        </div>
      </div>
    </div>
  );
}

export default App;
