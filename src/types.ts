export interface Guess {
  word: string;
  similarity: number;
  rank?: number;
  isHint?: boolean;
}

export interface GameState {
  guesses: Guess[];
  targetWord: string;
  isComplete: boolean;
  attempts: number;
  hintsUsed: number;
}

export type Language = 'english' | 'arabic' | 'russian';

export interface GameConfig {
  language: Language;
  targetWord: string;
  availableWords: string[];
}
