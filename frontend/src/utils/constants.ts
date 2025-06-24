export const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:3001'

export const DEFAULT_AVATAR = `${API_URL}/uploads/placeholder-avatar1.png`

export const GAME_CONSTANTS = {
  MAX_SCORE: 11,
  CANVAS: {
    WIDTH: 800,
    HEIGHT: 600,
  },
  MESSAGES: {
    SPACEBAR_TO_START: 'Press spacebar to start game...',
    RETURNING_TO_LOBBY: 'Returning to lobby...',
    FIRST_TO_POINTS: (points: number) => `First to ${points} points`,
  },
  CONTROLS: {
    PLAYER1: 'W/S keys',
    PLAYER2: '↑/↓ keys',
  },
} as const

// Developer information
export const DEVELOPERS = [
  { name: 'Developer 1', url: 'https://github.com/ito-miyuki' },
  { name: 'Developer 2', url: 'https://github.com/k2matu' },
  { name: 'Developer 3', url: 'https://github.com/Vallehtelia' },
  { name: 'Developer 4', url: 'https://github.com/oliverhertzberg' },
  { name: 'Developer 5', url: 'https://github.com/lkilpela' },
] as const

// Available language options
export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'EN' },
  { value: 'fi', label: 'FI' },
  { value: 'ja', label: 'JA' },
  { value: 'sv', label: 'SV' },
] as const

// Language option type
export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number]

// Developer type
export type Developer = (typeof DEVELOPERS)[number]
