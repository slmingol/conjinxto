// Common proper nouns that should be capitalized
const PROPER_NOUNS = new Set([
  // Countries
  'afghanistan', 'albania', 'algeria', 'andorra', 'angola', 'argentina', 'armenia', 'australia',
  'austria', 'azerbaijan', 'bahamas', 'bahrain', 'bangladesh', 'barbados', 'belarus', 'belgium',
  'belize', 'benin', 'bhutan', 'bolivia', 'bosnia', 'botswana', 'brazil', 'brunei', 'bulgaria',
  'burkina', 'burundi', 'cambodia', 'cameroon', 'canada', 'chad', 'chile', 'china', 'colombia',
  'comoros', 'congo', 'croatia', 'cuba', 'cyprus', 'czechia', 'denmark', 'djibouti', 'dominica',
  'ecuador', 'egypt', 'england', 'eritrea', 'estonia', 'ethiopia', 'fiji', 'finland', 'france',
  'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'greece', 'grenada', 'guatemala', 'guinea',
  'guyana', 'haiti', 'honduras', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq',
  'ireland', 'israel', 'italy', 'jamaica', 'japan', 'jordan', 'kazakhstan', 'kenya', 'kiribati',
  'korea', 'kosovo', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia',
  'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'madagascar', 'malawi', 'malaysia',
  'maldives', 'mali', 'malta', 'mauritania', 'mauritius', 'mexico', 'micronesia', 'moldova',
  'monaco', 'mongolia', 'montenegro', 'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru',
  'nepal', 'netherlands', 'nicaragua', 'niger', 'nigeria', 'norway', 'oman', 'pakistan', 'palau',
  'panama', 'paraguay', 'peru', 'philippines', 'poland', 'portugal', 'qatar', 'romania', 'russia',
  'rwanda', 'samoa', 'senegal', 'serbia', 'seychelles', 'singapore', 'slovakia', 'slovenia',
  'somalia', 'spain', 'sudan', 'suriname', 'sweden', 'switzerland', 'syria', 'taiwan',
  'tajikistan', 'tanzania', 'thailand', 'togo', 'tonga', 'tunisia', 'turkey', 'turkmenistan',
  'tuvalu', 'uganda', 'ukraine', 'uruguay', 'uzbekistan', 'vanuatu', 'vatican', 'venezuela',
  'vietnam', 'yemen', 'zambia', 'zimbabwe', 'scotland', 'wales',
  
  // Major cities
  'london', 'paris', 'tokyo', 'beijing', 'moscow', 'cairo', 'rome', 'madrid', 'berlin',
  'athens', 'vienna', 'prague', 'dublin', 'lisbon', 'amsterdam', 'brussels', 'stockholm',
  'oslo', 'copenhagen', 'helsinki', 'warsaw', 'budapest', 'bucharest', 'sofia', 'belgrade',
  'zagreb', 'santiago', 'bogota', 'lima', 'quito', 'caracas', 'havana', 'seattle', 'portland',
  'chicago', 'boston', 'atlanta', 'miami', 'houston', 'dallas', 'phoenix', 'denver', 'detroit',
  
  // US States
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut',
  'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
  'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan',
  'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'ohio',
  'oklahoma', 'oregon', 'pennsylvania', 'tennessee', 'texas', 'utah', 'vermont',
  'virginia', 'washington', 'wisconsin', 'wyoming',
  
  // Common proper nouns
  'america', 'american', 'europe', 'european', 'asia', 'asian', 'africa', 'african',
  'antarctica', 'arctic', 'atlantic', 'pacific', 'mediterranean', 'caribbean',
  'english', 'spanish', 'french', 'german', 'italian', 'portuguese', 'russian', 'chinese',
  'japanese', 'arabic', 'hindi', 'bengali', 'korean', 'vietnamese', 'turkish', 'polish',
  'ukrainian', 'romanian', 'dutch', 'greek', 'czech', 'swedish', 'hungarian', 'serbian',
  'danish', 'finnish', 'norwegian', 'croatian', 'buddhist', 'christian', 'muslim', 'hindu',
  'jewish', 'catholic', 'protestant', 'orthodox', 'islam', 'christianity', 'judaism',
  'hinduism', 'buddhism', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday',
  'saturday', 'sunday', 'january', 'february', 'march', 'april', 'may', 'june', 'july',
  'august', 'september', 'october', 'november', 'december',
]);

/**
 * Capitalizes a word intelligently:
 * - Preserves user's capitalization if they used any capital letters
 * - Auto-capitalizes known proper nouns if typed in all lowercase
 * - Returns lowercase words as-is if not a known proper noun
 */
export function capitalizeProperNoun(word: string): string {
  // If the word has any capital letters, preserve user's exact capitalization
  if (word !== word.toLowerCase()) {
    return word;
  }
  
  // Word is all lowercase - check if it's a known proper noun
  const lowerWord = word.toLowerCase();
  
  if (PROPER_NOUNS.has(lowerWord)) {
    // Capitalize first letter only
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  // Not a known proper noun, keep as lowercase
  return word;
}
