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

// Google OAuth Configuration
export const GOOGLE_OAUTH = {
  CLIENT_ID:
    '847383291975-9ten21d8j1vf3m2m1kod2i2js9c28o6e.apps.googleusercontent.com',
  REDIRECT_URI: 'https://localhost:5173/oauth2callback',
  SCOPE: 'openid email profile',
  RESPONSE_TYPE: 'code',
  ACCESS_TYPE: 'offline',
  PROMPT: 'consent',
  AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
} as const
