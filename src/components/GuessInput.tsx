import React, { useRef, useEffect } from 'react';
import { Translations } from '../translations';

interface GuessInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  error: string | null;
  disabled?: boolean;
  isLoading?: boolean;
  theme: 'light' | 'dark';
  t: Translations;
}

export const GuessInput: React.FC<GuessInputProps> = ({
  value,
  onChange,
  onSubmit,
  error,
  disabled = false,
  isLoading = false,
  theme,
  t,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDark = theme === 'dark';

  // Refocus input after submission completes
  useEffect(() => {
    if (!isLoading && !disabled) {
      inputRef.current?.focus();
    }
  }, [isLoading, disabled]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t.enterGuess}
          disabled={disabled}
          className={`flex-1 px-3 py-2 rounded-lg border-2 focus:outline-none focus:border-purple-500 
                     focus:ring-2 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed
                     text-sm ${
            isDark 
              ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
              : 'border-gray-300 bg-white text-gray-800 placeholder-gray-500'
          }`}
          autoFocus
        />
        <button
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                     text-white font-semibold rounded-lg transition-colors shadow-lg
                     disabled:cursor-not-allowed disabled:opacity-50 min-w-[90px] text-sm"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          ) : t.guess}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg text-xs">
          {error}
        </div>
      )}
    </div>
  );
};
