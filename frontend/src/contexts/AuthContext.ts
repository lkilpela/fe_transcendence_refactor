import { User } from '@/types'
import { createContext } from 'react'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (
    username: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<void>
  login2FA: (code: string) => Promise<void>
  loginWithGoogle: (authCode: string) => Promise<void>
  logout: () => Promise<void>
  verify2FA: (code: string) => Promise<void>
  requires2FA: boolean
  tempToken: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
