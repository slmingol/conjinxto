import { Language } from './settings';

export interface Translations {
  // Header
  title: string;
  attempts: string;
  hints: string;
  hint: string;
  giveUp: string;
  newGame: string;
  
  // Instructions
  howToPlay: string;
  instruction1: string;
  instruction2: string;
  instruction3: string;
  instruction4: string;
  progressSaved: string;
  rankColors: string;
  veryClose: string;
  gettingWarmer: string;
  stillSearching: string;
  
  // Input
  enterGuess: string;
  guess: string;
  pleaseEnterWord: string;
  alreadyGuessed: string;
  wordNotInDictionary: string;
  
  // Guesses
  yourGuesses: string;
  noGuessesYet: string;
  startGuessing: string;
  
  // Win Modal
  congratulations: string;
  youGuessedWord: string;
  itTookYou: string;
  attempt: string;
  attempts_plural: string;
  keepLooking: string;
  playAgain: string;
  
  // Statistics
  statistics: string;
  gamePerformance: string;
  played: string;
  winRate: string;
  currentStreak: string;
  bestStreak: string;
  bestScore: string;
  fewestAttempts: string;
  avgAttempts: string;
  perWin: string;
  attemptsDistribution: string;
  noGamesYet: string;
  startPlaying: string;
  close: string;
  
  // Settings
  settings: string;
  language: string;
  theme: string;
  sortBy: string;
  
  // Give up dialog
  wordWas: string;
  playAgainQuestion: string;
  
  // Errors
  gameComplete: string;
  failedToGetHint: string;
  errorOccurred: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    title: 'Conjinxto',
    attempts: 'Attempts',
    hints: 'Hints',
    hint: 'Hint',
    giveUp: 'Give Up',
    newGame: 'New Game',
    
    // Instructions
    howToPlay: 'How to Play',
    instruction1: 'Find the secret word. You have unlimited guesses.',
    instruction2: 'The words are sorted by an artificial intelligence algorithm according to how similar they are to the secret word.',
    instruction3: 'After submitting a word, you will see its position. The secret word is number 1.',
    instruction4: 'The algorithm uses the context in which words are used to calculate the similarity between them.',
    progressSaved: 'Your progress is automatically saved! Come back anytime to continue.',
    rankColors: 'Rank Colors:',
    veryClose: 'Very close to the answer!',
    gettingWarmer: 'Getting warmer',
    stillSearching: 'Still searching',
    
    // Input
    enterGuess: 'Enter your guess...',
    guess: 'Guess',
    pleaseEnterWord: 'Please enter a word',
    alreadyGuessed: 'You already guessed this word',
    wordNotInDictionary: "doesn't exist in our dictionary",
    
    // Guesses
    yourGuesses: 'Your Guesses',
    noGuessesYet: 'No guesses yet. Start guessing!',
    startGuessing: 'Start guessing!',
    
    // Win Modal
    congratulations: 'Congratulations!',
    youGuessedWord: 'You guessed the secret word:',
    itTookYou: 'It took you',
    attempt: 'attempt',
    attempts_plural: 'attempts',
    keepLooking: 'Keep Looking',
    playAgain: 'Play Again',
    
    // Statistics
    statistics: 'Statistics',
    gamePerformance: 'Your game performance',
    played: 'Played',
    winRate: 'Win Rate',
    currentStreak: 'Current Streak',
    bestStreak: 'Best Streak',
    bestScore: 'Best Score',
    fewestAttempts: '(Fewest attempts)',
    avgAttempts: 'Avg Attempts',
    perWin: '(Per win)',
    attemptsDistribution: 'Attempts Distribution',
    noGamesYet: 'No games played yet!',
    startPlaying: 'Start playing to see your statistics.',
    close: 'Close',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    sortBy: 'Sort by',
    
    // Give up dialog
    wordWas: 'The word was:',
    playAgainQuestion: 'Would you like to play again?',
    
    // Errors
    gameComplete: 'Game is already complete',
    failedToGetHint: 'Failed to get hint. Please try again.',
    errorOccurred: 'An error occurred. Please try again.',
  },
  
  pt: {
    // Header
    title: 'Conjinxto',
    attempts: 'Tentativas',
    hints: 'Dicas',
    hint: 'Dica',
    giveUp: 'Desistir',
    newGame: 'Novo Jogo',
    
    // Instructions
    howToPlay: 'Como Jogar',
    instruction1: 'Encontre a palavra secreta. Você tem tentativas ilimitadas.',
    instruction2: 'As palavras são ordenadas por um algoritmo de inteligência artificial de acordo com sua semelhança à palavra secreta.',
    instruction3: 'Depois de enviar uma palavra, você verá sua posição. A palavra secreta é o número 1.',
    instruction4: 'O algoritmo usa o contexto em que as palavras são usadas para calcular a semelhança entre elas.',
    progressSaved: 'Seu progresso é salvo automaticamente! Volte a qualquer momento para continuar.',
    rankColors: 'Cores de Classificação:',
    veryClose: 'Muito perto da resposta!',
    gettingWarmer: 'Esquentando',
    stillSearching: 'Ainda procurando',
    
    // Input
    enterGuess: 'Digite seu palpite...',
    guess: 'Palpite',
    pleaseEnterWord: 'Por favor, digite uma palavra',
    alreadyGuessed: 'Você já tentou esta palavra',
    wordNotInDictionary: 'não existe no nosso dicionário',
    
    // Guesses
    yourGuesses: 'Seus Palpites',
    noGuessesYet: 'Nenhum palpite ainda. Comece a adivinhar!',
    startGuessing: 'Comece a adivinhar!',
    
    // Win Modal
    congratulations: 'Parabéns!',
    youGuessedWord: 'Você adivinhou a palavra secreta:',
    itTookYou: 'Você levou',
    attempt: 'tentativa',
    attempts_plural: 'tentativas',
    keepLooking: 'Continue Procurando',
    playAgain: 'Jogar Novamente',
    
    // Statistics
    statistics: 'Estatísticas',
    gamePerformance: 'Seu desempenho no jogo',
    played: 'Jogados',
    winRate: 'Taxa de Vitórias',
    currentStreak: 'Sequência Atual',
    bestStreak: 'Melhor Sequência',
    bestScore: 'Melhor Pontuação',
    fewestAttempts: '(Menos tentativas)',
    avgAttempts: 'Média de Tentativas',
    perWin: '(Por vitória)',
    attemptsDistribution: 'Distribuição de Tentativas',
    noGamesYet: 'Nenhum jogo jogado ainda!',
    startPlaying: 'Comece a jogar para ver suas estatísticas.',
    close: 'Fechar',
    
    // Settings
    settings: 'Configurações',
    language: 'Idioma',
    theme: 'Tema',
    sortBy: 'Ordenar por',
    
    // Give up dialog
    wordWas: 'A palavra era:',
    playAgainQuestion: 'Você gostaria de jogar novamente?',
    
    // Errors
    gameComplete: 'O jogo já está completo',
    failedToGetHint: 'Falha ao obter dica. Tente novamente.',
    errorOccurred: 'Ocorreu um erro. Tente novamente.',
  },
  
  es: {
    // Header
    title: 'Conjinxto',
    attempts: 'Intentos',
    hints: 'Pistas',
    hint: 'Pista',
    giveUp: 'Rendirse',
    newGame: 'Nuevo Juego',
    
    // Instructions
    howToPlay: 'Cómo Jugar',
    instruction1: 'Encuentra la palabra secreta. Tienes intentos ilimitados.',
    instruction2: 'Las palabras están ordenadas por un algoritmo de inteligencia artificial según su similitud con la palabra secreta.',
    instruction3: 'Después de enviar una palabra, verás su posición. La palabra secreta es el número 1.',
    instruction4: 'El algoritmo utiliza el contexto en el que se usan las palabras para calcular la similitud entre ellas.',
    progressSaved: '¡Tu progreso se guarda automáticamente! Vuelve en cualquier momento para continuar.',
    rankColors: 'Colores de Rango:',
    veryClose: '¡Muy cerca de la respuesta!',
    gettingWarmer: 'Calentando',
    stillSearching: 'Todavía buscando',
    
    // Input
    enterGuess: 'Ingresa tu suposición...',
    guess: 'Adivinar',
    pleaseEnterWord: 'Por favor ingresa una palabra',
    alreadyGuessed: 'Ya intentaste esta palabra',
    wordNotInDictionary: 'no existe en nuestro diccionario',
    
    // Guesses
    yourGuesses: 'Tus Intentos',
    noGuessesYet: 'Aún no hay intentos. ¡Comienza a adivinar!',
    startGuessing: '¡Comienza a adivinar!',
    
    // Win Modal
    congratulations: '¡Felicitaciones!',
    youGuessedWord: 'Adivinaste la palabra secreta:',
    itTookYou: 'Te tomó',
    attempt: 'intento',
    attempts_plural: 'intentos',
    keepLooking: 'Seguir Buscando',
    playAgain: 'Jugar de Nuevo',
    
    // Statistics
    statistics: 'Estadísticas',
    gamePerformance: 'Tu rendimiento en el juego',
    played: 'Jugados',
    winRate: 'Tasa de Victorias',
    currentStreak: 'Racha Actual',
    bestStreak: 'Mejor Racha',
    bestScore: 'Mejor Puntuación',
    fewestAttempts: '(Menos intentos)',
    avgAttempts: 'Promedio de Intentos',
    perWin: '(Por victoria)',
    attemptsDistribution: 'Distribución de Intentos',
    noGamesYet: '¡Aún no se han jugado juegos!',
    startPlaying: 'Comienza a jugar para ver tus estadísticas.',
    close: 'Cerrar',
    
    // Settings
    settings: 'Configuración',
    language: 'Idioma',
    theme: 'Tema',
    sortBy: 'Ordenar por',
    
    // Give up dialog
    wordWas: 'La palabra era:',
    playAgainQuestion: '¿Te gustaría jugar de nuevo?',
    
    // Errors
    gameComplete: 'El juego ya está completo',
    failedToGetHint: 'Error al obtener pista. Inténtalo de nuevo.',
    errorOccurred: 'Ocurrió un error. Inténtalo de nuevo.',
  },
};

export function useTranslation(language: Language): Translations {
  return translations[language];
}
