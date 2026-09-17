// Game start date (January 31, 2026)
const GAME_START_DATE = new Date('2026-01-31');

// Get current game number based on days since start
export function getGameNumber(): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(GAME_START_DATE);
  start.setHours(0, 0, 0, 0);
  const diffTime = Math.abs(today.getTime() - start.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Start at game #1
}

// Common English nouns for the game
export const englishWords = [
  // Animals
  'dog', 'cat', 'bird', 'fish', 'horse', 'cow', 'pig', 'chicken', 'rabbit', 'mouse',
  'lion', 'tiger', 'bear', 'elephant', 'monkey', 'zebra', 'giraffe', 'whale', 'dolphin', 'shark',
  
  // Food & Drinks
  'apple', 'bread', 'cheese', 'pizza', 'pasta', 'rice', 'chicken', 'beef', 'fish', 'egg',
  'milk', 'water', 'juice', 'coffee', 'tea', 'cake', 'cookie', 'chocolate', 'candy', 'fruit',
  
  // Nature
  'tree', 'flower', 'grass', 'forest', 'mountain', 'river', 'ocean', 'lake', 'sky', 'cloud',
  'sun', 'moon', 'star', 'rain', 'snow', 'wind', 'storm', 'lightning', 'rainbow', 'desert',
  
  // Objects & Items
  'book', 'phone', 'computer', 'car', 'bike', 'train', 'plane', 'boat', 'house', 'building',
  'door', 'window', 'table', 'chair', 'bed', 'lamp', 'clock', 'mirror', 'picture', 'music',
  
  // Body Parts
  'head', 'face', 'eye', 'nose', 'mouth', 'ear', 'hand', 'foot', 'arm', 'leg',
  'heart', 'brain', 'stomach', 'finger', 'toe', 'hair', 'skin', 'bone', 'blood', 'muscle',
  
  // Colors
  'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white',
  'gray', 'gold', 'silver', 'violet', 'indigo', 'turquoise', 'crimson', 'navy', 'maroon', 'beige',
  
  // Emotions & Concepts
  'love', 'happy', 'sad', 'angry', 'fear', 'joy', 'peace', 'hope', 'dream', 'life',
  'death', 'time', 'space', 'energy', 'power', 'beauty', 'truth', 'freedom', 'justice', 'wisdom',
  
  // Actions
  'walk', 'run', 'jump', 'swim', 'fly', 'dance', 'sing', 'play', 'work', 'sleep',
  'eat', 'drink', 'read', 'write', 'think', 'speak', 'listen', 'watch', 'learn', 'teach',
  
  // Places
  'home', 'school', 'office', 'hospital', 'store', 'restaurant', 'hotel', 'park', 'beach', 'city',
  'country', 'town', 'village', 'street', 'road', 'bridge', 'airport', 'station', 'market', 'mall',
  
  // Weather & Seasons
  'spring', 'summer', 'autumn', 'winter', 'morning', 'afternoon', 'evening', 'night', 'day', 'week',
  'month', 'year', 'today', 'tomorrow', 'yesterday', 'weather', 'temperature', 'climate', 'season', 'hour',
  
  // People & Relationships
  'person', 'man', 'woman', 'child', 'baby', 'boy', 'girl', 'family', 'friend', 'mother',
  'father', 'brother', 'sister', 'parent', 'teacher', 'student', 'doctor', 'nurse', 'police', 'artist',
  
  // Technology & Science
  'internet', 'website', 'email', 'message', 'screen', 'keyboard', 'mouse', 'camera', 'video', 'photo',
  'science', 'math', 'physics', 'chemistry', 'biology', 'history', 'geography', 'language', 'art', 'music',
];

// Target words pool (subset of available words with good semantic connections)
export const targetWords = [
  // Original 24
  'dog', 'cat', 'ocean', 'mountain', 'book', 'music', 'love', 'tree',
  'sun', 'rain', 'happy', 'phone', 'dance', 'coffee', 'pizza', 'dream',
  'heart', 'night', 'morning', 'river', 'house', 'friend', 'family', 'apple',

  // Animals
  'wolf', 'fox', 'bear', 'lion', 'tiger', 'eagle', 'shark', 'whale',
  'snake', 'horse', 'rabbit', 'deer', 'butterfly', 'owl', 'bee', 'crow',
  'frog', 'penguin', 'parrot', 'spider',

  // Food & Drink
  'bread', 'cheese', 'wine', 'beer', 'soup', 'chocolate', 'honey',
  'sugar', 'lemon', 'strawberry', 'banana', 'grape', 'egg', 'milk',
  'butter', 'cake', 'mushroom', 'pepper', 'salt', 'cookie',

  // Nature & Elements
  'fire', 'earth', 'wind', 'rock', 'sand', 'ice', 'snow', 'island',
  'jungle', 'cave', 'forest', 'flower', 'cloud', 'storm', 'lightning',
  'desert', 'lake', 'cliff', 'volcano', 'valley', 'tide', 'meadow',
  'swamp', 'canyon', 'glacier',

  // Objects & Artifacts
  'sword', 'crown', 'ring', 'key', 'ship', 'castle', 'bridge', 'tower',
  'mirror', 'knife', 'gold', 'diamond', 'treasure', 'map', 'clock',
  'lamp', 'arrow', 'shield', 'anchor', 'coin',

  // Concepts & Abstract
  'war', 'peace', 'death', 'birth', 'god', 'angel', 'ghost', 'dragon',
  'magic', 'hero', 'shadow', 'soul', 'fate', 'luck', 'power', 'freedom',
  'truth', 'beauty', 'wisdom', 'justice', 'chaos', 'silence', 'memory',
  'myth', 'curse', 'legend',

  // People & Roles
  'king', 'queen', 'soldier', 'farmer', 'artist', 'doctor', 'teacher',
  'hunter', 'sailor', 'pirate', 'knight', 'wizard', 'mother', 'father',
  'child', 'stranger', 'enemy', 'monk',

  // Places
  'city', 'village', 'market', 'temple', 'church', 'museum', 'library',
  'garden', 'park', 'beach', 'harbor', 'prison', 'palace', 'tavern',
  'arena', 'ruins',

  // Body & Mind
  'blood', 'brain', 'eye', 'hand', 'bone', 'skin', 'hair', 'breath',
  'voice', 'mind', 'spirit', 'wound', 'smile',

  // Emotions & States
  'anger', 'fear', 'joy', 'grief', 'pride', 'shame', 'hope', 'faith',
  'wonder', 'trust', 'envy', 'guilt', 'courage', 'despair',

  // Science & Space
  'star', 'planet', 'moon', 'galaxy', 'atom', 'virus', 'medicine',
  'robot', 'machine', 'engine', 'gravity', 'oxygen',

  // Time & Seasons
  'dawn', 'dusk', 'midnight', 'spring', 'summer', 'autumn', 'winter',
  'age', 'moment', 'past', 'future', 'century',

  // Actions
  'fight', 'hunt', 'fall', 'rise', 'build', 'heal', 'grow', 'break',
  'hide', 'pray', 'steal', 'escape', 'return', 'survive',
];

// Get random target word
export function getRandomTargetWord(): string {
  return targetWords[Math.floor(Math.random() * targetWords.length)];
}

// Get daily word (based on date)
export function getDailyWord(): string {
  const gameNumber = getGameNumber();
  const index = (gameNumber - 1) % targetWords.length;
  return targetWords[index];
}

// Get word for a specific game number
export function getWordByGameNumber(gameNumber: number): string {
  if (gameNumber < 1) {
    throw new Error('Game number must be at least 1');
  }
  const index = (gameNumber - 1) % targetWords.length;
  return targetWords[index];
}
