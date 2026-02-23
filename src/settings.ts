/**
 * Settings management for Conjinxto game
 */

export type Language = 'en' | 'pt' | 'es';
export type Theme = 'light' | 'dark' | 'system';
export type HintDifficulty = 'easy' | 'medium' | 'hard';
export type SortBy = 'similarity' | 'guessOrder';

export interface GameSettings {
  language: Language;
  theme: Theme;
  hintDifficulty: HintDifficulty;
  sortBy: SortBy;
}

const SETTINGS_KEY = 'conjinxto-settings';

// Default settings
function createDefaultSettings(): GameSettings {
  return {
    language: 'en',
    theme: 'system',
    hintDifficulty: 'medium',
    sortBy: 'similarity',
  };
}

// Load settings from localStorage
export function loadSettings(): GameSettings {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return JSON.parse(saved) as GameSettings;
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return createDefaultSettings();
}

// Save settings to localStorage
export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

// Update a specific setting
export function updateSetting<K extends keyof GameSettings>(
  key: K,
  value: GameSettings[K]
): GameSettings {
  const settings = loadSettings();
  settings[key] = value;
  saveSettings(settings);
  return settings;
}

// Language labels
export const languageLabels: Record<Language, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
};

// Theme labels
export const themeLabels: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

// Hint difficulty labels and descriptions
export const hintDifficultyLabels: Record<HintDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export const hintDifficultyDescriptions: Record<HintDifficulty, string> = {
  easy: "The hint's position will be half the position of your closest word",
  medium: "The hint's position will be one less than your closest word",
  hard: "The hint's position will be random",
};

// Sort by labels
export const sortByLabels: Record<SortBy, string> = {
  similarity: 'Similarity',
  guessOrder: 'Guess order',
};
