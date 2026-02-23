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
  'dog', 'cat', 'ocean', 'mountain', 'book', 'music', 'love', 'tree', 
  'sun', 'rain', 'happy', 'phone', 'dance', 'coffee', 'pizza', 'dream',
  'heart', 'night', 'morning', 'river', 'house', 'friend', 'family', 'apple'
];

// Get random target word
export function getRandomTargetWord(): string {
  return targetWords[Math.floor(Math.random() * targetWords.length)];
}

// Get daily word (based on date)
export function getDailyWord(): string {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % targetWords.length;
  return targetWords[index];
}
