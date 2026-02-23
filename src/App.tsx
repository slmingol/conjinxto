import { useState, useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { useTheme } from './hooks/useTheme';
import { GameHeader } from './components/GameHeader';
import { Instructions } from './components/Instructions';
import { GuessInput } from './components/GuessInput';
import { GuessList } from './components/GuessList';
import { WinModal } from './components/WinModal';
import { StatisticsModal } from './components/StatisticsModal';
import { SettingsModal } from './components/SettingsModal';
import { preloadDictionary } from './dictionaryLoader';
import { loadSettings, GameSettings } from './settings';
import { useTranslation } from './translations';

const INSTRUCTIONS_DISMISSED_KEY = 'conjinxto-instructions-dismissed';

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
  const [settings, setSettings] = useState<GameSettings>(loadSettings());

  // Get translations based on current language
  const t = useTranslation(settings.language);

  // Apply theme
  const theme = useTheme(settings.theme);

  // Preload dictionary early for better UX
  useEffect(() => {
    preloadDictionary();
  }, []);

  // Show win modal when game is completed successfully
  useEffect(() => {
    if (gameState.isComplete && gameState.guesses.length > 0 && 
        gameState.guesses.some(g => g.similarity >= 0.9999)) {
      setShowWinModal(true);
    } else {
      setShowWinModal(false);
    }
  }, [gameState.isComplete, gameState.guesses]);

  // Check if we restored a saved game
  useEffect(() => {
    if (gameState.guesses.length > 0) {
      setShowRestoredNotice(true);
      const timer = setTimeout(() => setShowRestoredNotice(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []); // Only run on mount

  const handleGiveUp = () => {
    if (window.confirm(`${t.wordWas} ${gameState.targetWord.toUpperCase()}\n\n${t.playAgainQuestion}`)) {
      resetGame();
    } else {
      giveUp();
    }
  };

  const handleGetHint = () => {
    getHint(settings.hintDifficulty);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    localStorage.setItem(INSTRUCTIONS_DISMISSED_KEY, 'true');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          attempts={gameState.attempts}
          hintsUsed={gameState.hintsUsed}
          onGiveUp={handleGiveUp}
          onReset={resetGame}
          onShowStats={() => setShowStatistics(true)}
          onShowSettings={() => setShowSettings(true)}
          onGetHint={handleGetHint}
          isComplete={gameState.isComplete}
          theme={theme}
          t={t}
        />

        {/* Reserved space for notifications and instructions to prevent layout shift */}
        <div className="min-h-[50px] mb-4">
          {/* Restored progress notification */}
          {showRestoredNotice && (
            <div className="mb-4 bg-green-500/90 text-white px-4 py-3 rounded-lg shadow-lg 
                            flex items-center justify-between animate-fade-in">
              <span className="flex items-center">
                <span className="text-xl mr-2">💾</span>
                <span>{t.progressSaved} {gameState.guesses.length} {gameState.guesses.length !== 1 ? t.attempts_plural : t.attempt}.</span>
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
        </div>

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
            onNewGame={resetGame}
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
      </div>
    </div>
  );
}

export default App;
