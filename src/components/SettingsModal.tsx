import React, { useState } from 'react';
import {
  GameSettings,
  loadSettings,
  saveSettings,
  Language,
  Theme,
  HintDifficulty,
  SortBy,
  languageLabels,
  themeLabels,
  hintDifficultyLabels,
  hintDifficultyDescriptions,
  sortByLabels,
} from '../settings';
import { Translations } from '../translations';

interface SettingsModalProps {
  onClose: () => void;
  onSettingsChange?: (settings: GameSettings) => void;
  theme: 'light' | 'dark';
  t: Translations;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onSettingsChange, theme, t }) => {
  const [settings, setSettings] = useState<GameSettings>(loadSettings());
  const isDark = theme === 'dark';

  const updateSetting = <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={`rounded-2xl p-6 max-w-xl mx-auto shadow-2xl animate-fade-in relative w-full max-h-[90vh] overflow-y-auto ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={isDark ? 'absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl font-bold' : 'absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold'}
          aria-label="Close"
        >
          ×
        </button>
        
        <div>
          <div className="text-center mb-4">
            <h2 className={`text-xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              ⚙️ {t.settings}
            </h2>
          </div>

          {/* Two column layout for Language and Theme */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Language Section */}
            <div>
              <h3 className={`text-xs font-semibold mb-2 ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>{t.language}</h3>
              <div className="space-y-1">
                {(['pt', 'en', 'es'] as Language[]).map((lang) => (
                  <label
                    key={lang}
                    className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                      settings.language === lang
                        ? 'bg-purple-100 border border-purple-500'
                        : isDark
                        ? 'bg-gray-700 border border-transparent hover:bg-gray-600'
                        : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      checked={settings.language === lang}
                      onChange={() => updateSetting('language', lang)}
                      className="mr-2 text-purple-600"
                    />
                    <span className={`font-medium ${
                      settings.language === lang ? 'text-gray-800' : isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>{languageLabels[lang]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Theme Section */}
            <div>
              <h3 className={`text-xs font-semibold mb-2 ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>{t.theme}</h3>
              <div className="space-y-1">
                {(['light', 'dark', 'system'] as Theme[]).map((themeOption) => (
                  <label
                    key={themeOption}
                    className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                      settings.theme === themeOption
                        ? 'bg-purple-100 border border-purple-500'
                        : isDark
                        ? 'bg-gray-700 border border-transparent hover:bg-gray-600'
                        : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={themeOption}
                      checked={settings.theme === themeOption}
                      onChange={() => updateSetting('theme', themeOption)}
                      className="mr-2 text-purple-600"
                    />
                    <span className={`font-medium ${
                      settings.theme === themeOption ? 'text-gray-800' : isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>{themeLabels[themeOption]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Hints Section */}
          <div className="mb-4">
            <h3 className={`text-xs font-semibold mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>Hints</h3>
            <div className="space-y-1">
              {(['easy', 'medium', 'hard'] as HintDifficulty[]).map((difficulty) => (
                <label
                  key={difficulty}
                  className={`flex items-start p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                    settings.hintDifficulty === difficulty
                      ? 'bg-purple-100 border border-purple-500'
                      : isDark
                      ? 'bg-gray-700 border border-transparent hover:bg-gray-600'
                      : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="hintDifficulty"
                    value={difficulty}
                    checked={settings.hintDifficulty === difficulty}
                    onChange={() => updateSetting('hintDifficulty', difficulty)}
                    className="mr-2 mt-1 text-purple-600 flex-shrink-0"
                  />
                  <div>
                    <div className={`font-medium ${
                      settings.hintDifficulty === difficulty ? 'text-gray-800' : isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>{hintDifficultyLabels[difficulty]}</div>
                    <p className={`text-xs mt-0.5 ${
                      settings.hintDifficulty === difficulty ? 'text-gray-700' : isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {hintDifficultyDescriptions[difficulty]}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By Section */}
          <div className="mb-4">
            <h3 className={`text-xs font-semibold mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>{t.sortBy}</h3>
            <div className="space-y-1">
              {(['similarity', 'guessOrder'] as SortBy[]).map((sortBy) => (
                <label
                  key={sortBy}
                  className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                    settings.sortBy === sortBy
                      ? 'bg-purple-100 border border-purple-500'
                      : isDark
                      ? 'bg-gray-700 border border-transparent hover:bg-gray-600'
                      : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="sortBy"
                    value={sortBy}
                    checked={settings.sortBy === sortBy}
                    onChange={() => updateSetting('sortBy', sortBy)}
                    className="mr-2 text-purple-600"
                  />
                  <span className={`font-medium ${
                    settings.sortBy === sortBy ? 'text-gray-800' : isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}>{sortByLabels[sortBy]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Close button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white 
                         font-semibold rounded-lg transition-colors shadow-lg text-xs"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
