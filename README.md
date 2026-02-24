<div align="center">
  <img src="src/assets/conjinxto_logo.png?v=10" alt="Conjinxto Logo" width="200"/>
</div>

# Conjinxto

[![Version](https://img.shields.io/github/package-json/v/slmingol/conjinxto?label=Version&color=brightgreen)](https://github.com/slmingol/conjinxto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.4-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.0-38B2AC.svg)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

A modern TypeScript + Vite + React implementation of the Contexto-style word guessing game.

## 🎮 About

Conjinxto is a word-guessing game where players try to find a secret word by making guesses. Each guess is ranked based on how semantically similar it is to the target word using an AI algorithm. The secret word is always rank #1.

## ✨ Features

### Core Gameplay
- 🎯 **Daily Word Challenge** - New word every day
- 🧠 **AI-Powered Similarity** - Uses Datamuse API for semantic word relationships
- 📚 **370,000+ Word Dictionary** - Comprehensive English word validation
- 💾 **Auto-Save Progress** - Never lose your progress with localStorage persistence
- 📊 **Smart Ranking** - Color-coded ranks (Green: 1-3, Yellow: 4-10, Red: 11+)
- 🎉 **Win Animations** - Celebrate your success with victory modal

### Advanced Features
- 💡 **Hint System** with three difficulty levels:
  - **Easy**: Hint halfway between your best guess and #1
  - **Medium**: Hint slightly better than current best
  - **Hard**: Random hint in reasonable range
- 📈 **Statistics Tracking**:
  - Games played & win rate
  - Current & best winning streak
  - Best score (fewest attempts)
  - Average attempts per win
  - Attempts distribution chart
- 🎨 **Theme Support**:
  - Light mode
  - Dark mode
  - System theme auto-detection
  - Smooth color transitions
- 🌍 **Multi-Language Support**:
  - English
  - Portuguese (Português)
  - Spanish (Español)
  - Full UI translation
- 🔄 **Sort Options**:
  - By similarity (highest first)
  - By guess order (most recent first)

## 🛠 Technology Stack

- **Framework**: React 19.2.4
- **Build Tool**: Vite 7.3.1
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.2.0 (CSS-based configuration)
- **API**: Datamuse API for word similarity
- **Dictionary**: DWYL English Words (370,105 words)
- **Persistence**: Browser localStorage

## 🚀 Getting Started

### Prerequisites

**Option 1: Node.js**
- Node.js 18+ 
- npm or yarn

**Option 2: Docker** (Recommended for quick start)
- Docker 20.10+
- Docker Compose 2.0+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd contexto-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to `http://localhost:3001`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Docker Setup

#### Quick Start (Development)

Use the simple Docker Compose for instant development environment:

```bash
# Start development server with hot reload
docker-compose -f docker-compose.simple.yml up

# Stop the container
docker-compose -f docker-compose.simple.yml down
```

This will:
- Install dependencies automatically
- Start Vite dev server with HMR
- Mount your local files for live editing
- Access at `http://localhost:3001`

#### Production Build

Use the full Docker Compose for production-ready deployment:

```bash
# Build and start the production container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

This will:
- Build the app with multi-stage Docker build
- Serve with Nginx for optimal performance
- Enable gzip compression and caching
- Include health checks and logging
- Access at `http://localhost:3001`

#### Manual Docker Build

```bash
# Build the image
docker build -t conjinxto .

# Run the container
docker run -d -p 3001:80 --name conjinxto conjinxto

# Stop and remove
docker stop conjinxto && docker rm conjinxto
```

> 📘 **For detailed Docker documentation, troubleshooting, and deployment guides, see [DOCKER.md](DOCKER.md)**

## 🎯 How to Play

1. **Make a Guess**: Type any English word and press Enter or click Guess
2. **Check Your Rank**: See how close you are to the secret word
   - Rank #1 = You found it! 🎉
   - Ranks 1-3 = Very close (Green 🟢)
   - Ranks 4-10 = Getting warmer (Yellow 🟡)
   - Ranks 11+ = Still searching (Red 🔴)
3. **Use Hints**: Click the 💡 Hint button for help (difficulty configurable in settings)
4. **Keep Guessing**: You have unlimited attempts!
5. **Track Progress**: View your statistics to see your performance over time

The game automatically saves your progress, so you can:
- Close the browser and return later
- Refresh the page without losing your guesses
- Continue where you left off with today's word

## ⚙️ Settings

Access settings via the ⚙️ icon to customize your experience:

- **Language**: Choose between English, Portuguese, or Spanish
- **Theme**: Light, Dark, or System (auto-detects your OS preference)
- **Hints**: Set difficulty level (Easy/Medium/Hard)
- **Sort By**: View guesses by similarity rank or guess order

## 📊 Game Statistics

Track your performance with detailed statistics:
- Total games played
- Win percentage
- Current winning streak
- Best winning streak  
- Best score (fewest attempts to win)
- Average attempts per win
- Distribution chart showing attempt ranges (1-5, 6-10, 11-20, etc.)

## 🏗 Project Structure

```
conjinxto/
├── src/
│   ├── components/          # React components
│   │   ├── GameHeader.tsx   # Header with controls and stats
│   │   ├── Instructions.tsx # How to play instructions
│   │   ├── GuessInput.tsx   # Input field with validation
│   │   ├── GuessList.tsx    # Ranked list of guesses
│   │   ├── WinModal.tsx     # Victory celebration modal
│   │   ├── StatisticsModal.tsx # Performance statistics
│   │   └── SettingsModal.tsx   # Game settings
│   ├── hooks/              # Custom React hooks
│   │   ├── useGame.ts      # Game logic, state, and hints
│   │   └── useTheme.ts     # Theme detection and management
│   ├── types.ts            # TypeScript type definitions
│   ├── wordSimilarity.ts   # Datamuse API integration
│   ├── wordData.ts         # Daily word selection
│   ├── dictionaryLoader.ts # 370k word dictionary loader
│   ├── statistics.ts       # Statistics tracking
│   ├── settings.ts         # Settings management
│   ├── translations.ts     # Multi-language translations
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles with Tailwind
├── public/
│   └── words.txt          # 370k English word dictionary
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind v4 configuration
└── package.json           # Dependencies and scripts
```

## 🔑 Key Implementation Details

### Word Similarity Algorithm
Uses the Datamuse API's "means like" endpoint (`/words?ml=`) to fetch up to 1000 semantically similar words. Results are:
- Cached to minimize API calls
- Ranked by the API's similarity score
- Fall back to a hybrid algorithm (n-gram + Levenshtein) if API fails

### Hint System
Calculates optimal hint positions based on:
- **Current best guess**: Analyzes your top-ranked guess
- **Difficulty setting**: 
  - Easy: Gives word halfway to #1
  - Medium: Slightly better than current best
  - Hard: Random word in reasonable range
- **Datamuse rankings**: Uses pre-ranked similar words

### Theme System
Implements CSS-based theming with:
- Document-level class application (`.dark` or `.light`)
- `window.matchMedia` for system preference detection
- Smooth transitions with CSS
- Persistent theme selection in localStorage

### Daily Word Rotation
Uses date-based seeding to ensure:
- All players get the same word each day
- Consistent results across sessions
- Automatic reset at midnight
- 24 curated target words in rotation

### Dictionary Validation
Lazy-loads 370k word dictionary:
- Loaded on demand (not bundled with initial JS)
- Cached in memory as a Set for O(1) lookups
- Background preloading for better UX
- 4.1MB text file from DWYL english-words

## 💾 Data Persistence

The game uses browser localStorage to save:

**Game State** (`conjinxto-game-state`):
- All guesses with similarity scores
- Current target word
- Number of attempts
- Hints used count
- Game completion status

**Statistics** (`conjinxto-statistics`):
- Games played and won
- Current and best streaks
- Best score (fewest attempts)
- Attempts distribution
- Last play date

**Settings** (`conjinxto-settings`):
- Language preference
- Theme selection
- Hint difficulty
- Sort order preference

Progress automatically:
- Saves after each action
- Restores on page load
- Resets daily for new word
- Clears on "New Game"

## 🎨 Customization

### Adding Target Words

Edit `src/wordData.ts` to add more words to the daily rotation:

```typescript
export const targetWords = [
  'your', 'custom', 'words', 'here',
];
```

### Styling

The app uses Tailwind CSS v4 with CSS-based configuration. Customize colors in `src/index.css`:

```css
@theme {
  --color-cold: #ef4444;    /* Red for far guesses */
  --color-warm: #eab308;    /* Yellow for medium */
  --color-hot: #22c55e;     /* Green for close */
}
```

### Translations

Add new languages in `src/translations.ts`:

```typescript
export const translations: Record<Language, Translations> = {
  en: { /* English translations */ },
  pt: { /* Portuguese translations */ },
  es: { /* Spanish translations */ },
  // Add your language here
};
```

## 🆚 Comparison with Original

This implementation is inspired by [FaresGh1997/Contexto_3lang](https://github.com/FaresGh1997/Contexto_3lang) which uses:
- Python backend with Streamlit
- BERT embeddings via Transformers library
- Multi-language support (English, Arabic, Russian)

Our TypeScript/Vite version offers:
- ✅ Modern React with TypeScript for type safety
- ✅ Fast development with Vite HMR
- ✅ Client-side only (no backend required)
- ✅ Easy to deploy (static site hosting)
- ✅ Better offline support with caching
- ✅ Responsive UI with Tailwind CSS v4
- ✅ Comprehensive statistics tracking
- ✅ Multi-language UI (English, Portuguese, Spanish)
- ✅ Theme support (light/dark/system)
- ✅ Hint system with difficulty levels

## 🚀 Deployment

Deploy to any static hosting service:

### Vercel
```bash
npm run build
vercel deploy dist
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🐛 Known Issues

- Datamuse API has rate limits (100,000 requests/day)
- Some rare words may not be in the dictionary
- Similarity rankings are relative to Datamuse's algorithm

## 🚧 Future Enhancements

Potential features for future versions:
- [ ] Custom word lists/categories
- [ ] Multiplayer mode with room codes
- [ ] More language options (French, German, etc.)
- [ ] Word of the day sharing on social media
- [ ] Historical word archive
- [ ] Difficulty levels for target words
- [ ] Achievement system
- [ ] Dark mode improvements
- [ ] Accessibility enhancements (ARIA labels, keyboard navigation)
- [ ] Progressive Web App (PWA) support

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain existing code style
- Add comments for complex logic
- Test features before submitting

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 🙏 Acknowledgments

- **Original game**: [Contexto.me](https://contexto.me/en/) - The inspiration for this project
- **Inspired by**: [FaresGh1997/Contexto_3lang](https://github.com/FaresGh1997/Contexto_3lang) - Python/Streamlit implementation
- **Word similarity API**: [Datamuse](https://www.datamuse.com/api/) - Semantic word relationships
- **English dictionary**: [DWYL english-words](https://github.com/dwyl/english-words) - 370k+ words
- **Built with**: React, TypeScript, Vite, and Tailwind CSS

---

Built with ❤️ using React, TypeScript, and Vite

**Happy word guessing! 🎯**
