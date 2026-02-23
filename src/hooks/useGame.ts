import { useState, useCallback, useEffect } from 'react';
import { Guess, GameState } from '../types';
import { calculateSimilarity, getHintWord } from '../wordSimilarity';
import { getDailyWord, getGameNumber, getWordByGameNumber } from '../wordData';
import { isWordInDictionary } from '../dictionaryLoader';
import { recordWin } from '../statistics';
import { HintDifficulty } from '../settings';
import { capitalizeProperNoun } from '../utils/properNouns';

const STORAGE_KEY = 'conjinxto-game-state';
const STORAGE_DATE_KEY = 'conjinxto-game-date';

// Load game state from localStorage
function loadGameState(): GameState {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    const savedDate = localStorage.getItem(STORAGE_DATE_KEY);
    const today = new Date().toDateString();
    
    // If we have saved state and it's from today, restore it
    if (savedState && savedDate === today) {
      const parsed = JSON.parse(savedState) as GameState;
      const currentGameNumber = getGameNumber();
      // Ensure attempts, hintsUsed, gameNumber, statsRecorded, and gameMode have default values if missing
      return {
        ...parsed,
        attempts: parsed.attempts ?? 0,
        hintsUsed: parsed.hintsUsed ?? 0,
        gameNumber: parsed.gameNumber ?? currentGameNumber,
        statsRecorded: parsed.statsRecorded ?? false,
        gameMode: parsed.gameMode ?? 'daily',
      };
    }
    
    // Otherwise, start a new game with today's word
    const targetWord = getDailyWord();
    const gameNumber = getGameNumber();
    return {
      guesses: [],
      targetWord,
      isComplete: false,
      attempts: 0,
      hintsUsed: 0,
      gameNumber,
      statsRecorded: false,
      gameMode: 'daily',
    };
  } catch (error) {
    console.error('Failed to load game state:', error);
    const targetWord = getDailyWord();
    const gameNumber = getGameNumber();
    return {
      guesses: [],
      targetWord,
      isComplete: false,
      attempts: 0,
      hintsUsed: 0,
      gameNumber,
      statsRecorded: false,
      gameMode: 'daily',
    };
  }
}

// Save game state to localStorage
function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(STORAGE_DATE_KEY, new Date().toDateString());
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(loadGameState);

  const [inputWord, setInputWord] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Save game state whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Record statistics when a game is won (only once, and only for daily games)
  useEffect(() => {
    if (gameState.isComplete && gameState.guesses.length > 0 && !gameState.statsRecorded && gameState.gameMode === 'daily') {
      const hasWon = gameState.guesses.some(g => g.similarity >= 0.9999);
      if (hasWon) {
        recordWin(gameState.attempts);
        // Mark stats as recorded
        setGameState(prev => ({ ...prev, statsRecorded: true }));
      }
    }
  }, [gameState.isComplete, gameState.guesses, gameState.attempts, gameState.statsRecorded, gameState.gameMode]);

  const makeGuess = useCallback(async (word: string) => {
    const trimmedWord = word.trim();
    const normalizedWord = trimmedWord.toLowerCase();

    if (!normalizedWord) {
      setError('Please enter a word');
      return;
    }

    // Clear input immediately for better UX
    setInputWord('');

    // Check if already guessed (case-insensitive)
    if (gameState.guesses.some(g => g.word.toLowerCase() === normalizedWord)) {
      setError('You already guessed this word');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Check if word is valid (using expanded dictionary)
    try {
      const isValid = await isWordInDictionary(normalizedWord);
      if (!isValid) {
        setError(`The word "${word}" doesn't exist in our dictionary`);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error('Dictionary lookup failed:', error);
      setError('Failed to validate word. Please try again.');
      setIsLoading(false);
      return;
    }

    try {
      const similarity = await calculateSimilarity(normalizedWord, gameState.targetWord);
      
      const guess: Guess = {
        word: capitalizeProperNoun(trimmedWord),
        similarity,
      };

      const newGuesses = [...gameState.guesses, guess];
      const isComplete = similarity >= 0.9999;

      setGameState({
        ...gameState,
        guesses: newGuesses,
        attempts: gameState.attempts + 1,
        isComplete,
      });
    } catch (error) {
      console.error('Error making guess:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [gameState]);

  const giveUp = useCallback(() => {
    setGameState({
      ...gameState,
      isComplete: true,
    });
  }, [gameState]);

  const resetGame = useCallback(() => {
    const targetWord = getDailyWord();
    const gameNumber = getGameNumber();
    const newState = {
      guesses: [],
      targetWord,
      isComplete: false,
      attempts: 0,
      hintsUsed: 0,
      gameNumber,
      statsRecorded: false,
      gameMode: 'daily' as const,
    };
    setGameState(newState);
    setInputWord('');
    setError(null);
    // Clear localStorage for a fresh start
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_DATE_KEY);
  }, []);

  const getHint = useCallback(async (difficulty: HintDifficulty) => {
    if (gameState.isComplete) {
      setError('Game is already complete');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Calculate target rank based on difficulty and current best guess
      const sortedGuesses = [...gameState.guesses].sort((a, b) => b.similarity - a.similarity);
      const topGuess = sortedGuesses[0];
      
      let targetRank: number;
      
      if (!topGuess) {
        // No guesses yet, give a medium-strength hint
        targetRank = difficulty === 'easy' ? 50 : difficulty === 'medium' ? 100 : 200;
      } else {
        // Calculate rank based on top guess similarity
        // We'll estimate the rank from similarity (rough estimate)
        const estimatedCurrentRank = Math.max(1, Math.floor((1 - topGuess.similarity) * 1000));
        
        switch (difficulty) {
          case 'easy':
            // Give hint halfway between current best and #1
            targetRank = Math.max(1, Math.floor(estimatedCurrentRank / 2));
            break;
          case 'medium':
            // Give hint slightly better than current best
            targetRank = Math.max(1, estimatedCurrentRank - Math.floor(estimatedCurrentRank * 0.2));
            break;
          case 'hard':
            // Give random hint in a reasonable range
            targetRank = Math.floor(Math.random() * Math.max(100, estimatedCurrentRank)) + 1;
            break;
        }
      }

      const hintWord = await getHintWord(gameState.targetWord, targetRank);
      
      if (!hintWord) {
        setError('Failed to get hint. Please try again.');
        setIsLoading(false);
        return;
      }

      // Check if hint word was already guessed
      if (gameState.guesses.some(g => g.word.toLowerCase() === hintWord.toLowerCase())) {
        setError(`You already guessed "${hintWord}"`);
        setIsLoading(false);
        return;
      }

      // Calculate similarity for the hint word
      const similarity = await calculateSimilarity(hintWord, gameState.targetWord);
      
      const hintGuess: Guess = {
        word: capitalizeProperNoun(hintWord),
        similarity,
        isHint: true,
      };

      const newGuesses = [...gameState.guesses, hintGuess];
      const isComplete = similarity >= 0.9999;

      setGameState({
        ...gameState,
        guesses: newGuesses,
        hintsUsed: gameState.hintsUsed + 1,
        isComplete,
      });
    } catch (error) {
      console.error('Error getting hint:', error);
      setError('Failed to get hint. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [gameState]);

  const playArchiveGame = useCallback((archiveGameNumber: number) => {
    const targetWord = getWordByGameNumber(archiveGameNumber);
    const newState: GameState = {
      guesses: [],
      targetWord,
      isComplete: false,
      attempts: 0,
      hintsUsed: 0,
      gameNumber: archiveGameNumber,
      statsRecorded: false,
      gameMode: 'archive',
    };
    setGameState(newState);
    setInputWord('');
    setError(null);
    // Clear localStorage when switching to archive mode
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_DATE_KEY);
  }, []);

  return {
    gameState,
    inputWord,
    setInputWord,
    error,
    setError,
    isLoading,
    makeGuess,
    giveUp,
    resetGame,
    getHint,
    playArchiveGame,
  };
}
