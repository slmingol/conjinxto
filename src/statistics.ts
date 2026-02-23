/**
 * Statistics tracking for Conjinxto game
 */

export interface GameStatistics {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  bestStreak: number;
  bestScore: number | null; // Fewest attempts to win (null if never won)
  totalAttempts: number; // Total attempts across all wins
  attemptsDistribution: Record<string, number>; // e.g., {"1-10": 5, "11-20": 3}
  lastPlayedDate: string | null;
}

const STATS_KEY = 'conjinxto-statistics';

// Initialize empty statistics
function createEmptyStats(): GameStatistics {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    bestStreak: 0,
    bestScore: null,
    totalAttempts: 0,
    attemptsDistribution: {},
    lastPlayedDate: null,
  };
}

// Load statistics from localStorage
export function loadStatistics(): GameStatistics {
  try {
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) {
      return JSON.parse(saved) as GameStatistics;
    }
  } catch (error) {
    console.error('Failed to load statistics:', error);
  }
  return createEmptyStats();
}

// Save statistics to localStorage
export function saveStatistics(stats: GameStatistics): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save statistics:', error);
  }
}

// Record a win
export function recordWin(attempts: number): GameStatistics {
  const stats = loadStatistics();
  const today = new Date().toDateString();
  
  stats.gamesPlayed++;
  stats.gamesWon++;
  stats.totalAttempts += attempts;
  
  // Update streak
  if (stats.lastPlayedDate === today) {
    // Same day, don't update streak
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (stats.lastPlayedDate === yesterdayStr) {
      // Consecutive day
      stats.currentStreak++;
    } else if (stats.lastPlayedDate === null) {
      // First game
      stats.currentStreak = 1;
    } else {
      // Streak broken
      stats.currentStreak = 1;
    }
    
    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak;
    }
  }
  
  // Update best score
  if (stats.bestScore === null || attempts < stats.bestScore) {
    stats.bestScore = attempts;
  }
  
  // Update attempts distribution
  const bucket = getAttemptsBucket(attempts);
  stats.attemptsDistribution[bucket] = (stats.attemptsDistribution[bucket] || 0) + 1;
  
  stats.lastPlayedDate = today;
  
  saveStatistics(stats);
  return stats;
}

// Record a game played (but not won)
export function recordGame(): GameStatistics {
  const stats = loadStatistics();
  const today = new Date().toDateString();
  
  stats.gamesPlayed++;
  
  // Check if streak should be broken
  if (stats.lastPlayedDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (stats.lastPlayedDate !== yesterdayStr && stats.lastPlayedDate !== null) {
      // Streak broken (didn't play yesterday)
      stats.currentStreak = 0;
    }
  }
  
  stats.lastPlayedDate = today;
  
  saveStatistics(stats);
  return stats;
}

// Get bucket for attempts distribution
function getAttemptsBucket(attempts: number): string {
  if (attempts <= 5) return '1-5';
  if (attempts <= 10) return '6-10';
  if (attempts <= 20) return '11-20';
  if (attempts <= 30) return '21-30';
  if (attempts <= 50) return '31-50';
  return '51+';
}

// Calculate average attempts
export function getAverageAttempts(stats: GameStatistics): number {
  if (stats.gamesWon === 0) return 0;
  return Math.round(stats.totalAttempts / stats.gamesWon);
}

// Calculate win percentage
export function getWinPercentage(stats: GameStatistics): number {
  if (stats.gamesPlayed === 0) return 0;
  return Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
}

// Reset statistics
export function resetStatistics(): void {
  saveStatistics(createEmptyStats());
}
