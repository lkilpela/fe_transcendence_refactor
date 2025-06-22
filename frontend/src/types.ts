export interface User {
  id: number
  username: string
  email: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export interface LoginResponse {
  token: string
  username: string
  id: number
}

export interface UserPlayer {
  id: number
  display_name: string
  avatar: string
  isActive: boolean
  points: number
  wins: number
  losses: number
}

export interface TournamentMatch {
  match_id: number
  date: string
  round: number
  players: {
    player_id: number
    score: number
  }[]
  winner?: {
    player_id: number
  } | null
}

export interface Tournament {
  id: number
  name: string
  status: 'pending' | 'finished'
  current_round: number
  winner_id: number | null
  created_at: string
  matches: TournamentMatch[]
}

export interface MatchData {
  match_id: string
}

export interface GameState {
  matchType: 'semifinal' | 'final' | '1v1'
  matchId: number
  player1: { name: string; avatar: string; id: number}
  player2: { name: string; avatar: string; id: number }
  returnTo?: string
}