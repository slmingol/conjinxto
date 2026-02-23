export interface Guess {
  word: string;
  similarity: number;
  rank?: number;
  isHint?: boolean;
}

export type GameMode = 'daily' | 'archive';

export interface GameState {
  guesses: Guess[];
  targetWord: string;
  isComplete: boolean;
  attempts: number;
  hintsUsed: number;
  gameNumber: number;
  statsRecorded?: boolean; // Track if statistics have been recorded for this game
  gameMode: GameMode; // 'daily' for today's puzzle, 'archive' for past games
}

export type Language = 'english' | 'arabic' | 'russian';

export interface GameConfig {
  language: Language;
  targetWord: string;
  availableWords: string[];
}
