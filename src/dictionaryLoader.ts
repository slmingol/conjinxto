/**
 * Dictionary loader that fetches and caches the full English word list
 * ~370k words from DWYL english-words repository
 */

let dictionaryCache: Set<string> | null = null;
let loadingPromise: Promise<Set<string>> | null = null;

/**
 * Load the full English dictionary
 * Returns a Set for O(1) word lookup
 */
export async function loadDictionary(): Promise<Set<string>> {
  // Return cached dictionary if already loaded
  if (dictionaryCache) {
    return dictionaryCache;
  }

  // Return existing loading promise if already in progress
  if (loadingPromise) {
    return loadingPromise;
  }

  // Start loading the dictionary
  loadingPromise = (async () => {
    try {
      const response = await fetch('/words.txt');
      
      if (!response.ok) {
        throw new Error(`Failed to load dictionary: ${response.status}`);
      }
      
      const text = await response.text();
      const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length > 0);
      
      dictionaryCache = new Set(words);
      console.log(`Dictionary loaded: ${dictionaryCache.size} words`);
      
      return dictionaryCache;
    } catch (error) {
      console.error('Failed to load dictionary:', error);
      loadingPromise = null; // Reset so we can retry
      throw error;
    }
  })();

  return loadingPromise;
}

/**
 * Check if a word exists in the dictionary
 * Automatically loads dictionary on first call
 */
export async function isWordInDictionary(word: string): Promise<boolean> {
  const dictionary = await loadDictionary();
  return dictionary.has(word.toLowerCase().trim());
}

/**
 * Pre-load the dictionary in the background
 * Call this early to avoid delays on first word validation
 */
export function preloadDictionary(): void {
  loadDictionary().catch(err => {
    console.warn('Background dictionary preload failed:', err);
  });
}
