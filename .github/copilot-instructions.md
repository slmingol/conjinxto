# Conjinxto - Copilot Instructions

## Project Overview

**Purpose**: TypeScript/React word guessing game where players find a secret word using AI-powered semantic similarity rankings (Contexto-style)

**Type**: React Web Application  
**Tech Stack**: React 19.2, TypeScript 5.9, Vite 7.3, Tailwind CSS 4.2, Datamuse API  
**Deployment**: Docker containers (ghcr.io), Nginx static hosting  
**Repository**: https://github.com/slmingol/conjinxto

## Features

- Daily word challenge with AI-powered similarity (Datamuse API)
- 370,000+ word dictionary (dwyl/english-words)
- Auto-save progress (localStorage), statistics tracking, win animations
- 3-tier hint system (Easy/Medium/Hard)
- Theme support: Light/Dark/System, multi-language (EN/PT/ES)
- Sort options: Similarity vs. Guess order
- Color-coded ranks: Green (1-3), Yellow (4-10), Red (11+)

## Build & Validation

### Development
```bash
npm install                # Install dependencies (React, Vite, Tailwind, TypeScript)
npm run dev                # Start Vite dev server at localhost:3000
npm run lint               # TypeScript type checking (tsc --noEmit)
```

**Dev Server**: Vite with React Fast Refresh, auto-opens browser, displays ASCII banner with version

### Production Build
```bash
npm run build              # TypeScript compilation → Vite build → dist/
npm run preview            # Preview production build locally

# Docker (multi-stage: Node 20-alpine build, Nginx serve)
docker-compose up -d                      # Build from source
docker-compose -f docker/docker-compose.simple.yml up -d  # Use prebuilt GHCR image
```

**Build Output**: Optimized bundle in `dist/`, Nginx serves static files

## Project Layout

```
conjinxto/
├── src/
│   ├── App.tsx                  # Main game logic (~580 LOC)
│   ├── components/              # React components (~8 files)
│   │   ├── GameHeader.tsx       # Title, daily word indicator
│   │   ├── GuessInput.tsx       # Word input field
│   │   ├── GuessList.tsx        # Ranked guess display
│   │   ├── ClosestWordsModal.tsx # Best guesses modal
│   │   ├── WinModal.tsx         # Victory modal
│   │   ├── SettingsModal.tsx    # Theme/language settings
│   │   ├── StatisticsModal.tsx  # Stats & distribution chart
│   │   └── Instructions.tsx     # How to play
│   ├── hooks/
│   │   └── useLocalStorage.ts   # LocalStorage persistence
│   ├── utils/
│   │   └── dateUtils.ts         # Date formatting
│   ├── wordSimilarity.ts        # Datamuse API integration (~370 LOC)
│   ├── wordData.ts              # Daily word selection (~130 LOC)
│   ├── statistics.ts            # Stats tracking (~130 LOC)
│   ├── translations.ts          # i18n (EN/PT/ES) (~320 LOC)
│   ├── settings.ts              # Theme/language persistence (~70 LOC)
│   ├── dictionaryLoader.ts      # Word validation (~60 LOC)
│   ├── types.ts                 # TypeScript interfaces
│   └── main.tsx                 # React entry point
├── public/
│   └── words.txt                # 370,105 words (~4MB)
├── docker/
│   ├── Dockerfile               # Multi-stage build (Node + Nginx)
│   ├── docker-compose.yml       # Production setup with health checks
│   ├── docker-compose.simple.yml # Prebuilt image deployment
│   ├── nginx.conf               # Nginx config (SPA fallback)
│   ├── docker-entrypoint.sh     # Logs version on start
│   ├── README.md                # Docker quick start
│   └── DOCKER.md                # Detailed Docker guide
├── package.json                 # Dependencies & scripts
├── vite.config.ts               # Vite config (port 3000, version banner)
├── tailwind.config.js           # Tailwind CSS 4.x config
├── tsconfig.json                # TypeScript config
└── .github/workflows/
    └── docker-build.yml         # Auto-version bump & GHCR push
```

## Architecture

### Game Logic (src/App.tsx)
**State**: Guesses, best rank, game won, hints used, theme, language  
**Flow**: Input word → Validate against dictionary → Query Datamuse API → Rank result → Update list → Check win (rank 1) → Auto-save  
**Hint System**:
- Easy: Halfway between best guess and #1
- Medium: Slightly better than current best
- Hard: Random in reasonable range

### Word Similarity (src/wordSimilarity.ts)
**API**: Datamuse `/words?ml={word}` (related words with scores)  
**Ranking**: Normalize scores (0-1) → Invert for rank (1 = closest match)  
**Cache**: localStorage caches API responses to reduce requests

### Daily Word (src/wordData.ts)
**Selection**: Deterministic based on current date (YYYY-MM-DD seed)  
**Word Pool**: Curated list of common words (not entire 370k dictionary)  
**Reset**: Midnight local time triggers new daily word

### Statistics (src/statistics.ts)
**Tracked**: Games played, wins, current/best streak, best score, average attempts, distribution histogram  
**Persistence**: localStorage, updates on win/loss

### Themes & i18n
**Themes**: Light, dark, system (auto-detect), stored in localStorage  
**Languages**: English, Portuguese, Spanish (full UI translation in src/translations.ts)

## CI/CD Workflows

### Docker Build & Push (docker-build.yml)
**Triggers**: Push to main (unless `[skip ci]` in commit message)  
**Actions**:
1. Auto-bump version: `npm version patch` → Commit/push with `[skip ci]`
2. Extract version from package.json
3. Build multi-stage Docker image
4. Push to ghcr.io with tags: `latest`, `{version}`, `{branch}-{sha}`

**Registry**: ghcr.io/slmingol/conjinxto  
**Versioning**: Automatic patch bump on every main push (v1.0.56 → v1.0.57)

## Development Workflow

1. **Edit Code**: Update `src/` components, logic, translations
2. **Test Locally**: `npm run dev`, `npm run lint` (TypeScript checks)
3. **Commit**: Use descriptive messages, add `[skip ci]` to prevent auto-version bump if desired
4. **Push to Main**: Triggers workflow → Auto-bump version → Docker build → Push to GHCR

**Version Management**: Handled automatically by docker-build.yml (patch bump per commit to main)

## Configuration

**vite.config.ts**: Dev server port 3000, auto-open browser, ASCII banner plugin, version injected as `__APP_VERSION__`  
**tailwind.config.js**: Tailwind CSS 4.x with dark mode support  
**tsconfig.json**: Strict TypeScript, target ES2020  
**nginx.conf**: SPA routing (try_files fallback to index.html)

## Docker Deployment

**Production Build**:
```bash
cd conjinxto  # Project root
docker-compose -f docker/docker-compose.yml up -d
```

**Prebuilt Image** (recommended):
```bash
docker-compose -f docker/docker-compose.simple.yml up -d
docker-compose -f docker/docker-compose.simple.yml pull  # Update to latest
```

**Health Checks**: Docker Compose includes health checks (HTTP GET /) and logging configuration

## Known Issues

- **Large Dictionary**: 370k words (4MB public/words.txt) loaded on demand via dictionaryLoader
- **API Rate Limits**: Datamuse API has unspecified rate limits; caching mitigates this
- **localStorage Limits**: Browser localStorage typically 5-10MB; current usage minimal but monitor if adding features

## Documentation

- **README.md**: Game features, tech stack, installation, usage
- **docker/README.md**: Quick Docker commands
- **docker/DOCKER.md**: Comprehensive Docker deployment guide

## Trust Statement

This project follows modern React/TypeScript/Vite best practices with automated versioning and Docker builds. CI/CD ensures every push to main is versioned, built, and deployed to GHCR. The codebase uses TypeScript for type safety and Tailwind CSS for consistent styling.

**Validation**: Run `npm run lint` for TypeScript checks. Docker builds validate on every main push via docker-build.yml workflow.
