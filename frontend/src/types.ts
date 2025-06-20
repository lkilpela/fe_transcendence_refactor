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

export interface RawPlayer {
  id: number
  display_name: string
  avatar?: string
  wins: number
  losses: number
  isActive?: boolean
  points?: number
}

export interface Match {
  id: number
  type: '1v1' | 'tournament'
  tournament_id: number | null
  date: string
  round: number | null
  winner_id: number
  players: {
    player_id: number
    score: number
  }[]
}

export interface MatchHistoryProps {
  matches: Match[]
  className?: string
}

export interface ProcessedMatch {
  id: string
  player: {
    name: string
    avatar: string
  }
  opponent: {
    name: string
    avatar: string
  }
  score: string
  date: string
  mode: '1v1' | 'tournament'
}

export interface Tournament {
  status: string
  [key: string]: unknown
}

export interface MatchData {
  match_id: string
}