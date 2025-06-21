export const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:3001'

export const DEFAULT_AVATAR = `${API_URL}/uploads/placeholder-avatar1.png`

export const GAME_CONSTANTS = {
    MAX_SCORE: 11,
    CANVAS: {
      WIDTH: 800,
      HEIGHT: 600
    },
    MESSAGES: {
      SPACEBAR_TO_START: 'Press spacebar to start game...',
      RETURNING_TO_LOBBY: 'Returning to lobby...',
      FIRST_TO_POINTS: (points: number) => `First to ${points} points`
    },
    CONTROLS: {
      PLAYER1: 'W/S keys',
      PLAYER2: '↑/↓ keys'
    }
  } as const 