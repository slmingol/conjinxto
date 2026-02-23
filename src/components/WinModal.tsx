import React from 'react';
import { Translations } from '../translations';

interface WinModalProps {
  targetWord: string;
  attempts: number;
  onNewGame: () => void;
  onClose: () => void;
  theme: 'light' | 'dark';
  t: Translations;
}

export const WinModal: React.FC<WinModalProps> = ({ targetWord, attempts, onClose, theme, t }) => {
  const isDark = theme === 'dark';
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className={`rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-bounce-in relative ${
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
        
        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {t.congratulations}
          </h2>
          <p className={`text-base mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t.youGuessedWord}
          </p>
          <p className="text-3xl font-bold text-purple-600 mb-4">
            {targetWord}
          </p>
          <p className={isDark ? 'text-gray-300 mb-4' : 'text-gray-600 mb-4'}>
            {t.itTookYou} <span className="font-semibold">{attempts}</span> {attempts !== 1 ? t.attempts_plural : t.attempt}
          </p>
          <div className={`mb-6 p-4 rounded-lg ${
            isDark ? 'bg-green-500/20 border border-green-500/50' : 'bg-green-100 border border-green-300'
          }`}>
            <p className={`text-sm font-semibold ${
              isDark ? 'text-green-200' : 'text-green-800'
            }`}>
              ✅ {t.completedToday}
            </p>
            <p className={`text-xs mt-1 ${
              isDark ? 'text-green-300' : 'text-green-700'
            }`}>
              {t.comeBackTomorrow}
            </p>
          </div>
          <div className="flex gap-3 justify-center">
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
