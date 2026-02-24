/**
 * Word similarity calculator using Datamuse API
 * Falls back to local algorithm if API is unavailable
 */

// Cache for API responses to avoid repeated calls
const apiCache = new Map<string, DatamuseWord[]>();

interface DatamuseWord {
  word: string;
  score: number;
}

// Fetch similar words from Datamuse API
async function fetchSimilarWords(targetWord: string): Promise<DatamuseWord[]> {
  const normalized = targetWord.toLowerCase().trim();
  
  // Check cache first
  if (apiCache.has(normalized)) {
    return apiCache.get(normalized)!;
  }
  
  try {
    const response = await fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(normalized)}&max=1000`);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data: DatamuseWord[] = await response.json();
    
    // Cache the results
    apiCache.set(normalized, data);
    
    return data;
  } catch (error) {
    console.warn('Datamuse API failed, using fallback:', error);
    return [];
  }
}

// Levenshtein distance for fallback
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

// Character n-gram similarity
function ngramSimilarity(str1: string, str2: string, n: number = 2): number {
  const getNgrams = (str: string): Set<string> => {
    const ngrams = new Set<string>();
    const normalized = str.toLowerCase().trim();
    for (let i = 0; i <= normalized.length - n; i++) {
      ngrams.add(normalized.substring(i, i + n));
    }
    return ngrams;
  };

  const ngrams1 = getNgrams(str1);
  const ngrams2 = getNgrams(str2);

  const intersection = new Set([...ngrams1].filter(x => ngrams2.has(x)));
  const union = new Set([...ngrams1, ...ngrams2]);

  return union.size === 0 ? 0 : intersection.size / union.size;
}

// Pre-computed word relationships (semantic mapping)
// In production, this would come from word embeddings
const semanticRelations: Record<string, string[]> = {
  // Animals
  dog: ['cat', 'pet', 'animal', 'puppy', 'canine', 'bark', 'fur', 'tail'],
  cat: ['dog', 'pet', 'animal', 'kitten', 'feline', 'meow', 'fur', 'whiskers'],
  bird: ['fly', 'wing', 'feather', 'nest', 'chirp', 'animal', 'sky', 'beak'],
  fish: ['water', 'swim', 'ocean', 'sea', 'aquatic', 'scales', 'gill', 'fin'],
  
  // Food
  apple: ['fruit', 'red', 'tree', 'food', 'sweet', 'juicy', 'healthy', 'core'],
  bread: ['food', 'wheat', 'bakery', 'toast', 'sandwich', 'loaf', 'flour', 'yeast'],
  cheese: ['dairy', 'milk', 'food', 'yellow', 'pizza', 'slice', 'cheddar', 'mozzarella'],
  pizza: ['cheese', 'food', 'italian', 'dough', 'tomato', 'slice', 'delivery', 'pepperoni'],
  
  // Nature
  tree: ['forest', 'wood', 'leaf', 'branch', 'trunk', 'nature', 'green', 'bark'],
  ocean: ['water', 'sea', 'wave', 'blue', 'deep', 'salt', 'tide', 'marine'],
  mountain: ['peak', 'high', 'climb', 'rock', 'summit', 'hill', 'alpine', 'elevation'],
  river: ['water', 'flow', 'stream', 'bank', 'current', 'bridge', 'fish', 'source'],
  
  // Weather
  rain: ['water', 'weather', 'wet', 'cloud', 'storm', 'drops', 'umbrella', 'puddle'],
  snow: ['cold', 'winter', 'white', 'ice', 'flake', 'frozen', 'ski', 'snowman'],
  sun: ['hot', 'light', 'bright', 'day', 'star', 'shine', 'warm', 'solar'],
  
  // Objects
  book: ['read', 'page', 'story', 'library', 'author', 'novel', 'paper', 'chapter'],
  phone: ['call', 'mobile', 'text', 'device', 'screen', 'battery', 'app', 'smartphone'],
  car: ['drive', 'vehicle', 'road', 'wheel', 'engine', 'transport', 'auto', 'gas'],
  house: ['home', 'building', 'roof', 'door', 'window', 'live', 'family', 'room'],
  
  // Time
  morning: ['dawn', 'breakfast', 'sunrise', 'early', 'day', 'wake', 'coffee', 'fresh'],
  night: ['dark', 'sleep', 'moon', 'star', 'evening', 'late', 'bed', 'dream'],
  
  // Common words
  love: ['heart', 'emotion', 'feeling', 'romance', 'affection', 'care', 'passion', 'soul'],
  happy: ['joy', 'smile', 'cheerful', 'glad', 'pleased', 'content', 'delighted', 'positive'],
  music: ['sound', 'song', 'melody', 'rhythm', 'instrument', 'play', 'note', 'harmony'],
  dance: ['music', 'move', 'rhythm', 'ballet', 'step', 'choreography', 'perform', 'grace'],
};

// Calculate semantic similarity based on pre-computed relations
function semanticSimilarity(word1: string, word2: string): number {
  const w1 = word1.toLowerCase().trim();
  const w2 = word2.toLowerCase().trim();

  if (w1 === w2) return 1.0;

  // Check if words are directly related
  const relations1 = semanticRelations[w1] || [];
  const relations2 = semanticRelations[w2] || [];

  if (relations1.includes(w2)) return 0.85;
  if (relations2.includes(w1)) return 0.85;

  // Check for common relations
  const commonRelations = relations1.filter(r => relations2.includes(r));
  if (commonRelations.length > 0) {
    return 0.6 + (commonRelations.length * 0.05);
  }

  return 0;
}

/**
 * Calculate similarity between two words using Datamuse API
 * Returns a score between 0 and 1
 */
export async function calculateSimilarity(guess: string, target: string): Promise<number> {
  const g = guess.toLowerCase().trim();
  const t = target.toLowerCase().trim();

  // Exact match
  if (g === t) return 1.0;

  try {
    // Fetch similar words for the target from Datamuse API
    const similarWords = await fetchSimilarWords(t);
    
    if (similarWords.length === 0) {
      // Fallback to local algorithm if API fails
      return fallbackSimilarity(g, t);
    }
    
    // Find the guess word in the results
    const index = similarWords.findIndex(w => w.word.toLowerCase() === g);
    
    if (index === -1) {
      // Word not in results, use fallback
      return fallbackSimilarity(g, t);
    }
    
    // Calculate similarity based on rank
    // Top result gets ~0.95, score decreases logarithmically
    // This matches the Contexto game behavior
    const totalResults = similarWords.length;
    const rank = index + 1; // 1-indexed
    
    // Use logarithmic scale for better distribution
    // rank 1 → ~0.95, rank 10 → ~0.80, rank 100 → ~0.50, rank 1000 → ~0.20
    const similarity = Math.max(0.05, 1.0 - (Math.log(rank) / Math.log(totalResults)) * 0.85);
    
    return Math.max(0, Math.min(1, similarity));
  } catch (error) {
    console.warn('Error calculating similarity:', error);
    return fallbackSimilarity(g, t);
  }
}

// Fallback similarity using local algorithm
function fallbackSimilarity(guess: string, target: string): number {
  const g = guess.toLowerCase().trim();
  const t = target.toLowerCase().trim();

  if (g === t) return 1.0;

  // Calculate different similarity metrics
  const semanticScore = semanticSimilarity(g, t);
  const ngramScore = ngramSimilarity(g, t, 2);
  const levDistance = levenshteinDistance(g, t);
  const maxLen = Math.max(g.length, t.length);
  const levScore = 1 - (levDistance / maxLen);

  // Weighted combination
  const similarity = (semanticScore * 0.7) + (ngramScore * 0.2) + (levScore * 0.1);

  return Math.max(0, Math.min(1, similarity));
}

/**
 * Get similarity rank color
 */
export function getSimilarityColor(similarity: number): string {
  if (similarity >= 0.8) return 'hot';
  if (similarity >= 0.65) return 'warm';
  return 'cold';
}

/**
 * Get a hint word at a specific rank for the target word
 * Skips already guessed words
 */
export async function getHintWord(targetWord: string, targetRank: number, guessedWords: Set<string>): Promise<string | null> {
  try {
    const similarWords = await fetchSimilarWords(targetWord);
    
    if (similarWords.length === 0) {
      return null;
    }
    
    // Filter out already guessed words and the target word itself
    const availableWords = similarWords.filter(w => 
      !guessedWords.has(w.word.toLowerCase()) && 
      w.word.toLowerCase() !== targetWord.toLowerCase()
    );
    
    if (availableWords.length === 0) {
      return null;
    }
    
    // Clamp targetRank to valid range of available words
    const clampedRank = Math.max(1, Math.min(targetRank, availableWords.length));
    
    // Get word at that rank (rank is 1-based, array is 0-based)
    const hintWord = availableWords[clampedRank - 1];
    
    return hintWord?.word || null;
  } catch (error) {
    console.error('Failed to get hint word:', error);
    return null;
  }
}

/**
 * Get the top 500 closest words to the target word from Datamuse API
 * Returns words with their calculated similarity scores
 */
export interface ClosestWord {
  word: string;
  rank: number;
  similarity: number;
  isGuessed: boolean;
}

export async function getClosestWords(targetWord: string, guessedWords: Set<string>): Promise<ClosestWord[]> {
  try {
    const similarWords = await fetchSimilarWords(targetWord);
    
    if (similarWords.length === 0) {
      return [];
    }
    
    // Take top 500 words and calculate their similarity to the target
    const top500 = similarWords.slice(0, 500);
    
    const closestWords: ClosestWord[] = await Promise.all(
      top500.map(async (word, index) => {
        const similarity = await calculateSimilarity(word.word, targetWord);
        return {
          word: word.word,
          rank: index + 1,
          similarity,
          isGuessed: guessedWords.has(word.word.toLowerCase()),
        };
      })
    );
    
    // Check if the target word itself was guessed
    const targetWasGuessed = guessedWords.has(targetWord.toLowerCase());
    
    // If target was guessed, ensure it's in the list at rank #1
    if (targetWasGuessed) {
      const targetInList = closestWords.find(w => w.word.toLowerCase() === targetWord.toLowerCase());
      
      if (!targetInList) {
        // Target not in API results, add it at rank #1
        closestWords.unshift({
          word: targetWord,
          rank: 1,
          similarity: 1.0,
          isGuessed: true,
        });
        // Adjust ranks for all other words
        for (let i = 1; i < closestWords.length; i++) {
          closestWords[i].rank = i + 1;
        }
      } else {
        // Target is in list but might not be at rank #1, move it there
        const targetIndex = closestWords.indexOf(targetInList);
        if (targetIndex > 0) {
          closestWords.splice(targetIndex, 1);
          targetInList.rank = 1;
          targetInList.similarity = 1.0;
          closestWords.unshift(targetInList);
          // Adjust ranks
          for (let i = 1; i < closestWords.length; i++) {
            closestWords[i].rank = i + 1;
          }
        } else {
          // Already at rank #1, just ensure similarity is 1.0
          targetInList.similarity = 1.0;
        }
      }
    }
    
    return closestWords;
  } catch (error) {
    console.error('Failed to get closest words:', error);
    return [];
  }
}
