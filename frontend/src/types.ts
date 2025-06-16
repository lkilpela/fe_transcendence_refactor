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
