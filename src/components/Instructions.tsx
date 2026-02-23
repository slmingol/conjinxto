import React from 'react';
import { Translations } from '../translations';

interface InstructionsProps {
  onClose?: () => void;
  theme: 'light' | 'dark';
  t: Translations;
}

export const Instructions: React.FC<InstructionsProps> = ({ onClose, theme, t }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className={`rounded-lg p-6 shadow-xl ${
      isDark ? 'bg-gray-800/95' : 'bg-white/95'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className={`text-xl font-bold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>{t.howToPlay}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className={isDark ? 'text-gray-400 hover:text-gray-200 text-lg font-bold' : 'text-gray-500 hover:text-gray-700 text-lg font-bold'}
          >
            ×
          </button>
        )}
      </div>
      
      <div className={`space-y-3 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <p>
          <strong>{t.instruction1}</strong>
        </p>
        <p>
          {t.instruction2}
        </p>
        <p>
          {t.instruction3}
        </p>
        <p>
          {t.instruction4}
        </p>
        <p className="text-xs text-purple-600 font-medium">
          💾 {t.progressSaved}
        </p>
        
        <div className={`mt-4 pt-4 border-t ${
          isDark ? 'border-gray-600' : 'border-gray-200'
        }`}>
          <p className="font-semibold mb-2">{t.rankColors}</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">1-3</div>
              <span>🟢 {t.veryClose}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-yellow-500 rounded flex items-center justify-center text-white font-bold text-xs">4-10</div>
              <span>🟡 {t.gettingWarmer}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-xs">11+</div>
              <span>🔴 {t.stillSearching}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
