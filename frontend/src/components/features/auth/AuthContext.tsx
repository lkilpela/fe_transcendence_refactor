import { apiService, type User } from '@/services/api'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  requires2FA: boolean
  tempToken: string | null
}

interface AuthContextType extends AuthState {
  login: (
    username: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  loginWithGoogle: (code: string) => Promise<void>
  verify2FA: (token: string) => void
  logout: () => Promise<void>
  clearError: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    requires2FA: false,
    tempToken: null,
  })

  const setUser = (user: User | null) => {
    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }))
  }

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error, isLoading: false }))
  }

  const setLoading = (isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }))
  }

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setState((prev) => ({ ...prev, isLoading: false }))
      return
    }

    try {
      apiService.setToken(token)
      // Fetch actual user data from backend
      const user = await apiService.getCurrentUser()

      setState((prev) => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      // Token is invalid or expired
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
      apiService.setToken(null)
      setState((prev) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }))
    }
  }

  const login = async (
    username: string,
    password: string,
    rememberMe?: boolean,
  ) => {
    try {
      setState((prev) => ({ ...prev, error: null, isLoading: true }))

      const response = await apiService.login(username, password)

      // Check if 2FA is required
      if (response.requires_2fa && response.temp_token) {
        setState((prev) => ({
          ...prev,
          requires2FA: true,
          tempToken: response.temp_token || null,
          isLoading: false,
        }))
        return
      }

      apiService.setToken(response.token, rememberMe)

      const user: User = {
        id: response.id,
        username: response.username,
        email: '', // Backend doesn't return email in login response
      }

      setUser(user)
      // No navigation here - let components handle it
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      }))
      throw error // Re-throw so components can handle navigation
    }
  }

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      setState((prev) => ({ ...prev, error: null, isLoading: true }))

      await apiService.register(username, email, password)

      // Registration successful - no navigation here
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      }))
      throw error // Re-throw so components can handle navigation
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      // No navigation here - let components handle it
    }
  }

  const clearError = () => {
    setError(null)
  }

  const refreshUser = async () => {
    try {
      const user = await apiService.getCurrentUser()
      setUser(user)
    } catch (error) {
      console.error('Refresh user error:', error)
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const loginWithGoogle = async (code: string) => {
    try {
      setState((prev) => ({ ...prev, error: null, isLoading: true }))

      const response = await apiService.loginWithGoogle(code)
      apiService.setToken(response.token, true) // Remember Google users by default

      const user: User = {
        id: response.id,
        username: response.username,
        email: '', // Backend may not return email in Google login response
      }

      setUser(user)
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Google login failed',
        isLoading: false,
      }))
      throw error
    }
  }

  const verify2FA = (token: string) => {
    apiService.setToken(token, true)
    setState((prev) => ({
      ...prev,
      requires2FA: false,
      tempToken: null,
      isAuthenticated: true,
      isLoading: false,
    }))
  }

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    loginWithGoogle,
    verify2FA,
    logout,
    clearError,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
