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
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
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
      // For now, we'll assume token is valid if it exists
      // You might want to implement a /me endpoint in backend
      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        isLoading: false,
        user: { id: 0, username: '', email: '' }, // Placeholder user with correct type
      }))
    } catch {
      // Token is invalid
      localStorage.removeItem('token')
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const login = async (username: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, error: null, isLoading: true }))

      const response = await apiService.login(username, password)
      apiService.setToken(response.token)

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

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
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
