import React, { useState, useEffect } from 'react'
import { authService } from '@/services/authService'
import { setSessionExpiredCallback } from '@/services/api'
import { User } from '@/types'
import { AuthContext, AuthContextType } from './AuthContext'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser())
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [requires2FA, setRequires2FA] = useState(false)
  const [tempUserId, setTempUserId] = useState<number | null>(null)

  // Set up session expiration callback when component mounts
  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null)
      setRequires2FA(false)
      setTempUserId(null)
      setError('Your session has expired. Please log in again.')
    }

    setSessionExpiredCallback(handleSessionExpired)

    // Cleanup callback when component unmounts
    return () => {
      setSessionExpiredCallback(null)
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await authService.login(username, password)
      if (result.requires2FA && result.userId) {
        setRequires2FA(true)
        setTempUserId(result.userId)
      } else {
        setUser(authService.getCurrentUser())
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const login2FA = async (code: string) => {
    try {
      setIsLoading(true)
      setError(null)
      if (tempUserId) {
        await authService.login2FA(tempUserId, code)
        setUser(authService.getCurrentUser())
        setRequires2FA(false)
        setTempUserId(null)
      }
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
    setRequires2FA(false)
    setTempUserId(null)
    setError(null)
  }

  const verify2FA = async (code: string) => {
    try {
      setIsLoading(true)
      await authService.verify2FA(code)
      setUser(authService.getCurrentUser())
      setRequires2FA(false)
      setTempUserId(null)
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
    tempToken: tempUserId?.toString() || null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
