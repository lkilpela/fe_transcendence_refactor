import React, { useState } from 'react'
import { authService } from '@/services/authService'
import { User } from '@/types'
import { AuthContext, AuthContextType } from './AuthContext'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser())
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [requires2FA, setRequires2FA] = useState(false)
  const [tempToken, setTempToken] = useState<string | null>(null)

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      await authService.login(username, password)
      setUser(authService.getCurrentUser())
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const login2FA = async (code: string) => {
    try {
      setIsLoading(true)
      await authService.login2FA(code)
      setUser(authService.getCurrentUser())
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async (googleToken: string) => {
    try {
      setIsLoading(true)
      await authService.googleLogin(googleToken)
      setUser(authService.getCurrentUser())
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const verify2FA = async (token: string) => {
    try {
      setIsLoading(true)
      await authService.verify2FA(token)
      setUser(authService.getCurrentUser())
      setRequires2FA(false)
      setTempToken(null)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    login2FA,
    loginWithGoogle,
    logout,
    verify2FA,
    requires2FA,
    tempToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
