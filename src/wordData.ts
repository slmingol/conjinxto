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

  // Animals — land
  'wolf', 'fox', 'bear', 'lion', 'tiger', 'eagle', 'shark', 'whale',
  'snake', 'horse', 'rabbit', 'deer', 'butterfly', 'owl', 'bee', 'crow',
  'frog', 'penguin', 'parrot', 'spider',
  'alligator', 'bat', 'buffalo', 'camel', 'cheetah', 'chimp', 'cobra',
  'condor', 'coyote', 'crane', 'crocodile', 'dolphin', 'donkey', 'duck',
  'falcon', 'flamingo', 'giraffe', 'goat', 'gorilla', 'hamster', 'hawk',
  'hedgehog', 'hippo', 'hyena', 'jaguar', 'jellyfish', 'kangaroo', 'koala',
  'leopard', 'lizard', 'lobster', 'lynx', 'mole', 'moose', 'moth', 'mouse',
  'narwhal', 'octopus', 'orca', 'ostrich', 'otter', 'panda', 'panther',
  'peacock', 'pig', 'platypus', 'porcupine', 'puma', 'raccoon', 'rat',
  'raven', 'rhinoceros', 'salamander', 'salmon', 'scorpion', 'seal', 'sloth',
  'snail', 'sparrow', 'squid', 'stork', 'swan', 'termite', 'toad', 'tortoise',
  'toucan', 'turkey', 'turtle', 'vulture', 'walrus', 'wasp', 'weasel',
  'worm', 'zebra', 'crab', 'trout', 'tuna', 'eel', 'clam', 'oyster',

  // Food & Drink
  'bread', 'cheese', 'wine', 'beer', 'soup', 'chocolate', 'honey',
  'sugar', 'lemon', 'strawberry', 'banana', 'grape', 'egg', 'milk',
  'butter', 'cake', 'mushroom', 'pepper', 'salt', 'cookie',
  'avocado', 'bacon', 'bagel', 'bean', 'beef', 'biscuit', 'blueberry',
  'broccoli', 'brownie', 'burrito', 'cabbage', 'caramel', 'carrot',
  'cereal', 'cherry', 'chili', 'chips', 'cider', 'cinnamon', 'coconut',
  'corn', 'cream', 'cucumber', 'curry', 'custard', 'doughnut', 'dumpling',
  'fig', 'garlic', 'ginger', 'ham', 'hazelnut', 'jam', 'ketchup', 'kiwi',
  'lasagna', 'lime', 'mango', 'maple', 'marshmallow', 'melon', 'mint',
  'muffin', 'mustard', 'noodle', 'nut', 'oat', 'olive', 'onion', 'orange',
  'pancake', 'peach', 'peanut', 'pear', 'pie', 'pineapple', 'pistachio',
  'plum', 'popcorn', 'potato', 'pretzel', 'pumpkin', 'raspberry', 'rice',
  'salsa', 'sandwich', 'sauce', 'sausage', 'scone', 'shrimp', 'smoothie',
  'spaghetti', 'spinach', 'syrup', 'taco', 'toast', 'tomato',
  'vanilla', 'vinegar', 'waffle', 'walnut', 'watermelon', 'whiskey', 'yogurt',

  // Nature & Elements
  'fire', 'earth', 'wind', 'rock', 'sand', 'ice', 'snow', 'island',
  'jungle', 'cave', 'forest', 'flower', 'cloud', 'storm', 'lightning',
  'desert', 'lake', 'cliff', 'volcano', 'valley', 'tide', 'meadow',
  'swamp', 'canyon', 'glacier',
  'aurora', 'avalanche', 'bay', 'blizzard', 'blossom',
  'brook', 'bush', 'coast', 'comet', 'coral', 'crater', 'creek',
  'cyclone', 'dew', 'dune', 'earthquake', 'eclipse', 'fog', 'fossil', 'frost', 'geyser', 'gorge', 'granite', 'gravel',
  'grove', 'gulf', 'hail', 'hill', 'horizon', 'hurricane', 'inlet', 'lagoon',
  'lava', 'leaf', 'marsh', 'mist', 'moss', 'mud', 'oasis', 'pebble', 'peak',
  'plain', 'pond', 'prairie', 'reef', 'ridge', 'ripple', 'root',
  'shore', 'slope', 'smoke', 'soil', 'stream', 'summit', 'surf',
  'thorn', 'thunder', 'tornado', 'trail', 'tsunami', 'tundra', 'twilight',
  'waterfall', 'wave', 'wilderness', 'willow', 'wood', 'fern', 'pine',
  'oak', 'palm', 'bamboo', 'ivy', 'vine', 'bark', 'petal', 'seed', 'twig',
  'clay', 'ash', 'ember', // Objects & Artifacts
  'sword', 'crown', 'ring', 'key', 'ship', 'castle', 'bridge', 'tower',
  'mirror', 'knife', 'gold', 'diamond', 'treasure', 'map', 'clock',
  'lamp', 'arrow', 'shield', 'anchor', 'coin',
  'axe', 'backpack', 'balloon', 'barrel', 'basket', 'bell', 'blanket',
  'bottle', 'bow', 'box', 'bracelet', 'cage', 'candle', 'cannon', 'canvas',
  'cape', 'carpet', 'cart', 'chain', 'chalice', 'chest', 'compass',
  'crystal', 'cup', 'curtain', 'dagger', 'drum', 'feather', 'fence',
  'flag', 'flask', 'flute', 'gem', 'glove', 'hammer', 'harp', 'helmet',
  'hook', 'horn', 'hourglass', 'jar', 'journal', 'lace', 'lantern',
  'lasso', 'lens', 'locket', 'lute', 'mask', 'medal', 'net', 'orb',
  'paddle', 'pen', 'pillar', 'pipe', 'plank', 'plate', 'poison', 'pot',
  'pouch', 'puppet', 'puzzle', 'quill', 'rope', 'saddle', 'sail', 'scale',
  'scroll', 'shell', 'spear', 'staff', 'statue', 'torch', 'trap', 'veil',
  'vessel', 'vial', 'wand', 'web', 'wheel', 'whip', 'whistle', 'wire',
  'satchel', 'tablet', 'bullet', 'blade', 'forge', 'anvil', 'lever',

  // Concepts & Abstract
  'war', 'peace', 'death', 'birth', 'god', 'angel', 'ghost', 'dragon',
  'magic', 'hero', 'shadow', 'soul', 'fate', 'luck', 'power', 'freedom',
  'truth', 'beauty', 'wisdom', 'justice', 'chaos', 'silence', 'memory',
  'myth', 'curse', 'legend',
  'adventure', 'alliance', 'ambition', 'betrayal', 'bond', 'burden',
  'challenge', 'change', 'choice', 'civilization', 'conquest', 'conspiracy',
  'contract', 'crime', 'crisis', 'destiny', 'disaster', 'duty', 'energy',
  'evil', 'exile', 'experience', 'failure', 'fantasy', 'flaw', 'glory',
  'grace', 'greed', 'honor', 'hunger', 'identity', 'illusion', 'imagination',
  'innovation', 'instinct', 'isolation', 'journey', 'karma', 'knowledge',
  'law', 'life', 'light', 'loss', 'loyalty', 'madness', 'meaning', 'mercy',
  'miracle', 'mistake', 'mystery', 'nightmare', 'obsession', 'origin', 'pain',
  'passion', 'patience', 'perfection', 'perspective', 'plague', 'pleasure',
  'promise', 'prophecy', 'purpose', 'quest', 'rage', 'rebellion', 'regret',
  'reputation', 'resistance', 'revolution', 'ritual', 'sacrifice', 'secret',
  'sin', 'strength', 'struggle', 'suffering', 'surrender', 'symbol',
  'temptation', 'tragedy', 'transformation', 'unity', 'valor', 'victory',
  'violence', 'virtue', 'vision', 'wealth', 'darkness', 'order', 'balance',

  // People & Roles
  'king', 'queen', 'soldier', 'farmer', 'artist', 'doctor', 'teacher',
  'hunter', 'sailor', 'pirate', 'knight', 'wizard', 'mother', 'father',
  'child', 'stranger', 'enemy', 'monk',
  'actor', 'astronaut', 'baker', 'banker', 'beggar', 'blacksmith', 'builder',
  'carpenter', 'chef', 'clown', 'coach', 'criminal', 'dancer', 'detective',
  'dictator', 'duke', 'elder', 'emperor', 'explorer', 'firefighter',
  'fisherman', 'gardener', 'general', 'gladiator', 'guard', 'guide',
  'hermit', 'inventor', 'journalist', 'judge', 'laborer', 'lawyer', 'leader',
  'librarian', 'magician', 'mechanic', 'merchant', 'messenger', 'miner',
  'minister', 'nomad', 'nurse', 'painter', 'peasant', 'philosopher', 'pilot',
  'poet', 'politician', 'preacher', 'president', 'priest', 'prince',
  'princess', 'prisoner', 'prophet', 'ranger', 'rebel', 'reporter', 'ruler',
  'saint', 'scholar', 'scientist', 'scout', 'servant', 'shepherd', 'sheriff',
  'singer', 'slave', 'spy', 'surgeon', 'thief', 'trader', 'traveler',
  'warrior', 'writer', 'villain', 'archer', 'assassin', 'bard', 'captain',
  'commander', 'herald', 'jester', 'lord', 'mayor', 'noble', 'outlaw',
  'patriarch', 'scribe', 'shaman', 'vagabond', 'warden', 'envoy',

  // Places
  'city', 'village', 'market', 'temple', 'church', 'museum', 'library',
  'garden', 'park', 'beach', 'harbor', 'prison', 'palace', 'tavern',
  'arena', 'ruins',
  'abbey', 'airport', 'alley', 'bakery', 'barn', 'basement', 'border',
  'cathedral', 'cemetery', 'clinic', 'colony', 'continent', 'court',
  'crossroads', 'dungeon', 'embassy', 'empire', 'factory', 'farm',
  'fortress', 'frontier', 'ghetto', 'hamlet', 'highway', 'inn', 'kingdom',
  'laboratory', 'landmark', 'lighthouse', 'mansion', 'maze', 'monastery',
  'monument', 'neighborhood', 'outpost', 'pier', 'port', 'ranch', 'refuge',
  'resort', 'road', 'sanctuary', 'skyline', 'square', 'station', 'suburb',
  'theater', 'tomb', 'tunnel', 'university', 'warehouse', 'workshop',
  'citadel', 'stronghold', 'quarry', 'dock', 'bazaar', 'observatory',
  'plantation', 'settlement', 'wasteland', 'haven', 'terrace', 'corridor',
  'crypt', 'vault', 'passage', 'courtyard',

  // Body & Mind
  'blood', 'brain', 'eye', 'hand', 'bone', 'skin', 'hair', 'breath',
  'voice', 'mind', 'spirit', 'wound', 'smile',
  'ankle', 'artery', 'belly', 'bladder', 'chin', 'elbow',
  'face', 'finger', 'foot', 'forehead', 'gut', 'heel', 'hip', 'jaw',
  'kidney', 'knee', 'knuckle', 'lip', 'liver', 'lung', 'muscle', 'nail',
  'neck', 'nerve', 'nose', 'rib', 'scalp', 'shoulder', 'skull',
  'spine', 'stomach', 'tendon', 'throat', 'thumb', 'tongue', 'tooth',
  'vein', 'wrist', 'cheek', 'ear', 'brow', 'limb', 'tear',

  // Emotions & States
  'anger', 'fear', 'joy', 'grief', 'pride', 'shame', 'hope', 'faith',
  'wonder', 'trust', 'envy', 'guilt', 'courage', 'despair',
  'addiction', 'affection', 'agony', 'anxiety', 'awe', 'bitterness',
  'bliss', 'boredom', 'calm', 'compassion', 'confusion', 'curiosity',
  'delight', 'dignity', 'disgust', 'distress', 'dread', 'ecstasy',
  'excitement', 'exhaustion', 'fury', 'hatred', 'heartbreak', 'humility',
  'laughter', 'loneliness', 'longing', 'melancholy', 'nostalgia', 'numbness',
  'panic', 'pity', 'relief', 'remorse', 'resentment', 'sadness',
  'serenity', 'sorrow', 'stress', 'surprise', 'tension', 'yearning',
  'elation', 'fervor', 'gloom', 'warmth', 'restlessness', 'euphoria',
  'tranquility', 'apathy', 'craving', 'terror', 'thrill',

  // Science & Space
  'star', 'planet', 'moon', 'galaxy', 'atom', 'virus', 'medicine',
  'robot', 'machine', 'engine', 'gravity', 'oxygen',
  'acid', 'algorithm', 'bacteria', 'biology', 'carbon', 'catalyst', 'cell',
  'chemistry', 'circuit', 'clone', 'code', 'data', 'decay', 'dimension',
  'disease', 'electron', 'element', 'experiment', 'formula', 'frequency',
  'gene', 'hydrogen', 'hypothesis', 'infection', 'laser', 'magnet',
  'matter', 'metal', 'microscope', 'molecule', 'mutation', 'network',
  'neuron', 'nuclear', 'particle', 'plasma', 'protein', 'radiation',
  'reaction', 'signal', 'software', 'telescope', 'theory', 'vaccine',
  'antenna', 'current', 'drone', 'electric', 'grid', 'ion', 'logic', 'microbe', 'orbit', 'pixel',
  'program', 'pulse', 'quantum', 'satellite', 'sensor',
  'simulation', 'static', 'synthetic', 'voltage', 'wireless',

  // Time & History
  'dawn', 'dusk', 'midnight', 'spring', 'summer', 'autumn', 'winter',
  'age', 'moment', 'past', 'future', 'century',
  'ancient', 'anniversary', 'archive', 'beginning', 'calendar', 'chronicle',
  'cycle', 'decade', 'dynasty', 'end', 'epoch', 'era', 'eternity',
  'evolution', 'generation', 'history', 'hour', 'legacy', 'lifetime',
  'millennium', 'minute', 'present', 'progress', 'renaissance', 'relic',
  'saga', 'second', 'timeline', 'tradition', 'antiquity', 'founding',
  'artifact', 'testament', 'record',

  // Colors & Aesthetics
  'amber', 'azure', 'bronze', 'crimson', 'ebony', 'emerald', 'ivory',
  'jade', 'obsidian', 'ruby', 'scarlet', 'violet', 'turquoise', 'cobalt',
  'magenta', 'ochre', 'maroon', 'teal',

  // Actions
  'fight', 'hunt', 'fall', 'rise', 'build', 'heal', 'grow', 'break',
  'hide', 'pray', 'steal', 'escape', 'return', 'survive',
  'abandon', 'achieve', 'adapt', 'advance', 'ambush', 'attack', 'beg',
  'betray', 'bind', 'bless', 'burn', 'capture', 'carry', 'carve', 'chase',
  'climb', 'command', 'conquer', 'create', 'crush', 'deceive', 'defend',
  'destroy', 'dive', 'dominate', 'doubt', 'draw', 'drown', 'endure',
  'explore', 'freeze', 'gather', 'inspire', 'invade', 'jump',
  'kill', 'leap', 'lift', 'march', 'navigate', 'negotiate', 'overcome',
  'plunge', 'protect', 'push', 'reach', 'rescue', 'resist', 'rule', 'rush',
  'save', 'search', 'shape', 'sink', 'soar', 'speak', 'stab',
  'stand', 'strike', 'summon', 'throw', 'travel', 'unite', 'vanish',
  'wander', 'worship', 'flee', 'drift', 'dare', 'weave',
  'whisper', 'shout', 'mourn', 'plant', 'rebuild', 'reveal', 'seize',
  'shelter', 'stalk', 'track', 'unlock', 'warn', 'yield',

  // Miscellaneous — strong semantic fields
  'poverty', 'ruin', 'spark', 'flame', 'flood', 'echo', 'mark', 'sign',
  'omen', 'trial', 'test', 'vow', 'oath', 'throne',

  // Sports & Games
  'baseball', 'basketball', 'boxing', 'chess', 'cricket', 'cycling',
  'fencing', 'football', 'golf', 'gymnastics', 'hockey', 'marathon',
  'racing', 'rowing', 'rugby', 'skiing', 'soccer', 'surfing', 'swimming',
  'tennis', 'volleyball', 'wrestling', 'bowling', 'climbing', 'kayaking',
  'lacrosse', 'parkour', 'skating', 'snowboarding', 'squash',
  'weightlifting', 'jogging', 'sprinting', 'polo',
  'trophy', 'tournament', 'championship', 'league', 'stadium', 'team',
  'score', 'goal', 'field', 'pitch', 'relay',

  // Materials & Substances
  'aluminum', 'asphalt', 'cement', 'ceramic', 'charcoal', 'chrome',
  'concrete', 'copper', 'cotton', 'fabric', 'fiber', 'glass', 'hemp',
  'iron', 'leather', 'linen', 'marble', 'mercury', 'neon', 'nickel',
  'nylon', 'paper', 'plastic', 'platinum', 'porcelain', 'resin', 'rubber',
  'rust', 'silk', 'silver', 'slate', 'steel', 'stone', 'straw', 'tar',
  'timber', 'tin', 'titanium', 'velvet', 'wax', 'wool', 'zinc',

  // Transportation & Vehicles
  'bicycle', 'bus', 'canoe', 'carriage', 'chariot', 'ferry', 'glider',
  'helicopter', 'jet', 'locomotive', 'metro', 'missile', 'motorcycle',
  'parachute', 'raft', 'rocket', 'scooter', 'sleigh', 'spacecraft',
  'submarine', 'taxi', 'train', 'truck', 'van', 'yacht', 'blimp',
  'gondola', 'hovercraft', 'lifeboat', 'trolley', 'wagon', 'catapult',
  'tanker', 'destroyer', 'frigate', 'cruiser', 'bomber',

  // Clothing & Accessories
  'apron', 'armor', 'belt', 'boot', 'cap', 'cloak', 'coat', 'collar',
  'gauntlet', 'gown', 'hat', 'hood', 'jacket', 'kilt', 'leggings',
  'mantle', 'necklace', 'robe', 'sandal', 'scarf', 'shirt', 'skirt',
  'sock', 'suit', 'tie', 'tunic', 'uniform', 'vest', 'wig', 'wreath',
  'gloves',

  // Arts & Culture
  'ballet', 'choir', 'concert', 'drama', 'exhibition',
  'festival', 'fiction', 'film', 'gallery', 'graffiti', 'hymn', 'idol',
  'jazz', 'lyric', 'melody', 'mural', 'novel', 'opera', 'orchestra',
  'painting', 'parade', 'performance', 'photograph', 'poem', 'portrait',
  'prose', 'quartet', 'rhyme', 'rhythm', 'sculpture', 'sketch',
  'symphony', 'verse', 'stage', 'encore', 'ballad', 'sonnet',
  'satire', 'epic', 'fable', 'sonata',

  // Architecture & Structures
  'arch', 'balcony', 'column', 'dome', 'facade',
  'fountain', 'hall', 'pinnacle', 'porch', 'pyramid',
  'scaffold', 'spire', 'staircase', 'steeple', 'turret',
  'wall', 'amphitheater', 'chapel',
  'drawbridge', 'gate', 'keep', 'moat', 'obelisk',
  'sewer', 'watchtower',

  // Nature — Flora
  'acorn', 'bud', 'cactus', 'clover', 'dahlia', 'daisy', 'dandelion',
  'elm', 'eucalyptus', 'fungus', 'holly', 'iris', 'lavender', 'lotus',
  'mangrove', 'nettle', 'orchid', 'poppy', 'rose', 'shrub', 'sunflower',
  'thistle', 'tulip', 'weed', 'wheat', 'birch', 'cedar',
  'sequoia', 'spruce',

  // Weather & Atmosphere
  'breeze', 'drizzle', 'gale', 'haze', 'humidity', 'monsoon', 'sleet',
  'squall', 'sunshine', 'tempest', 'whirlwind', 'drought', 'overcast',
  'rainbow', 'smog', 'vortex',

  // Mythology & Fantasy
  'chimera', 'cyclops', 'demon', 'dwarf', 'elf', 'faerie', 'gargoyle',
  'goblin', 'griffin', 'harpy', 'hydra', 'imp', 'kraken', 'mermaid',
  'minotaur', 'nymph', 'ogre', 'oracle', 'phoenix', 'siren', 'titan',
  'troll', 'unicorn', 'vampire', 'werewolf', 'wraith', 'zombie',
  'centaur', 'leviathan', 'specter', 'banshee',

  // Household & Daily Life
  'alarm', 'bath', 'broom', 'cabinet', 'canteen', 'ceiling', 'chimney',
  'closet', 'desk', 'drawer', 'floor', 'fridge', 'furnace', 'kettle',
  'kitchen', 'ladder', 'laundry', 'mattress', 'oven', 'pillow',
  'shower', 'sofa', 'stair', 'toilet', 'umbrella',
  'wardrobe', 'washer', 'bucket', 'cord', 'hinge', 'knob',
  'latch', 'lock', 'peg', 'pin', 'rack', 'rail', 'tap',

  // Food — Cooking & Ingredients
  'broth', 'dough', 'glaze', 'marinade', 'paste', 'seasoning', 'stock', 'stuffing', 'yeast', 'zest', 'batter',
  'crust', 'filling', 'frosting', 'gravy', 'marmalade',
  'molasses', 'pickle', 'relish', 'sherbet', 'sorbet', // Social & Civilization
  'army', 'census', 'clan', 'council', 'culture',
  'custom', 'democracy', 'economy', 'election', 'government',
  'guild', 'jury', 'language', 'monarchy', 'nation', 'parliament',
  'protocol', 'religion', 'republic', 'society', 'state', 'tax', 'trade',
  'tribe', 'union', 'vote',

  // Music — Instruments
  'banjo', 'bass', 'cello', 'clarinet', 'cymbal', 'fiddle', 'guitar',
  'harmonica', 'keyboard', 'organ', 'saxophone',
  'trumpet', 'violin', 'accordion', 'tambourine', 'triangle',

  // Tools & Crafts
  'chisel', 'drill', 'file', 'mallet',
  'needle', 'pliers', 'saw', 'scalpel', 'scissors', 'shovel', 'wrench', 'crowbar',
  'level', // Celestial & Cosmic
  'asteroid', 'constellation', 'cosmos',
  'meteor', 'nebula', 'nova', 'supernova',
  'universe', 'void', 'zenith', 'equinox', 'solstice', // Abstract Qualities
  'accuracy', 'ambiguity', 'clarity',
  'complexity', 'consistency', 'creativity',
  'efficiency', 'elegance', 'equality', 'excellence', 'fragility',
  'generosity', 'harmony', 'integrity', 'intensity',
  'intuition', 'mortality', 'nobility', 'originality', 'purity',
  'simplicity', 'solitude', 'symmetry', 'vulnerability',

  // Military & Conflict
  'cavalry', 'coup', 'grenade', 'infantry', 'militia', 'navy', 'skirmish', 'strategy', 'tactics',
  'trench', 'truce', 'veteran', // Geography
  'pole', 'tropic', 'divide', 'quicksand', 'ravine', 'sinkhole',
  // Health & Medicine
  'allergy', 'antibiotic', 'antidote', 'bandage', 'cancer', 'coma', 'diagnosis', 'epidemic',
  'fracture', 'immunity', 'injection', 'insomnia', 'malaria',
  'migraine', 'morphine', 'nausea', 'obesity', 'pandemic', 'paralysis',
  'pneumonia', 'prescription', 'quarantine', 'recovery',
  'relapse', 'scar', 'seizure', 'surgery', 'symptom', 'therapy',
  'tumor', 'ulcer', 'venom', 'vertigo', 'withdrawal',

  // Law & Justice
  'alibi', 'allegation', 'appeal', 'bail', 'clause',
  'confession', 'conviction', 'custody', 'decree', 'defendant',
  'evidence', 'execution', 'felony', 'fraud', 'hearing',
  'lawsuit', 'legislation', 'mandate',
  'pardon', 'parole', 'patent', 'penalty', 'probation', 'prosecution', 'sanction', 'sentence', 'testimony', 'verdict', 'warrant',

  // Business & Economy
  'auction', 'bankruptcy', 'bribe', 'broker', 'budget', 'capital',
  'cargo', 'commerce', 'commodity', 'corporation', 'credit', 'debt',
  'deficit', 'dividend', 'embargo', 'export', 'import', 'inflation',
  'insurance', 'interest', 'investment', 'invoice', 'labor', 'loan',
  'monopoly', 'mortgage', 'profit', 'recession',
  'subsidy', 'tariff', 'wage',

  // Psychology & Behavior
  'behavior', 'cognition', 'compulsion', 'conditioning', 'conscience',
  'delusion', 'ego', 'empathy', 'hallucination', 'inhibition',
  'mania', 'manipulation', 'narcissism', 'neurosis',
  'perception', 'phobia', 'psyche', 'reflex', 'repression', 'resilience',
  'self', 'subconscious', 'trauma', 'unconscious',

  // Literature & Writing
  'allegory', 'anthology', 'biography', 'chapter', 'climax', 'conflict',
  'dialogue', 'epilogue', 'foreshadowing', 'genre', 'imagery', 'irony',
  'metaphor', 'monologue', 'parable', 'parody', 'plot',
  'prologue', 'protagonist', 'simile', 'soliloquy', 'stanza', 'symbolism',
  'theme',

  // Religion & Philosophy
  'afterlife', 'atheism', 'atonement', 'baptism', 'blasphemy',
  'covenant', 'dogma', 'enlightenment', 'exodus',
  'heresy', 'martyr', 'meditation', 'nirvana', 'pagan', 'prayer',
  'purgatory', 'reincarnation', 'resurrection', 'sermon',
  'theology', 'transcendence',

  // Technology & Computing
  'automation', 'bandwidth', 'blockchain',
  'browser', 'compiler', 'cryptography', 'database', 'debug',
  'encryption', 'firewall', 'hardware', 'interface',
  'iteration', 'malware', 'operating', 'processor',
  'render', 'storage', 'streaming', 'syntax', 'transistor',

  // Emotions & States (extended)
  'alertness', 'anticipation', 'bewilderment', 'cheerfulness',
  'claustrophobia', 'cowardice', 'cynicism', 'daydream', 'defiance',
  'denial', 'devotion', 'disdain', 'eagerness', 'embarrassment',
  'empowerment', 'entitlement', 'exasperation', 'fixation', 'foreboding',
  'frustration', 'gratitude', 'helplessness', 'homesickness', 'impatience',
  'indifference', 'insecurity', 'jealousy', 'mistrust',
  'outrage', 'overwhelm', 'possessiveness', 'resignation',

  // Science extended
  'chromosome', 'combustion',
  'embryo', 'enzyme', 'evaporation', 'fermentation', 'friction', 'magnetism', 'metabolism', 'momentum', 'neutron', 'nucleus',
  'photosynthesis', 'proton', 'respiration', 'velocity', // People (extended)
  'acrobat', 'alchemist', 'ambassador', 'anarchist', 'aristocrat', 'astronomer', 'bureaucrat',
  'chancellor', 'charlatan', 'cobbler', 'colonist', 'consul',
  'courtier', 'cultist', 'diplomat', 'drifter', 'fanatic',
  'fugitive', 'highwayman', 'hostage', 'innkeeper', 'liberator',
  'locksmith', 'lumberjack', 'marauder', 'midwife', 'overseer',
  'pathfinder', 'pilgrim', 'renegade', 'sentry',
  'smuggler', 'sorcerer', 'squire', 'steward', 'warlord',

  // Final fill — common nouns with strong semantic neighborhoods
  'altar', 'amulet', 'badge', 'banner', 'beacon',
  'debut', 'domain', 'draft', 'fragment',
  'harvest', 'junction', 'manor', 'phantom', 'turmoil',
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
