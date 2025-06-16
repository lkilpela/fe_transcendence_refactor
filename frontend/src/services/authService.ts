import { request } from './api'
import { storage } from '../utils/storage'
import { LoginResponse, User } from '../types'

/**
 * Authentication service
 * @description Handles authentication-related API calls
 */
export const authService = {
  login: async (username: string, password: string): Promise<void> => {
    const { token, id, username: name } = await request<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    storage.set('token', token)
    storage.set('user', { id, username: name })
  },

  login2FA: async (code: string): Promise<void> => {
    const { token, id, username: name } = await request<LoginResponse>('/login/2fa', {
      method: 'POST',
      body: JSON.stringify({ code }),
    })
    storage.set('token', token)
    storage.set('user', { id, username: name })
  },

  googleLogin: async (googleToken: string): Promise<void> => {
    const { token, id, username } = await request<LoginResponse>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token: googleToken }),
    })
    storage.set('token', token)
    storage.set('user', { id, username })
  },

  check2FAStatus: async (): Promise<{ enabled: boolean }> => {
    return request('/2fa/status')
  },

  verify2FA: async (code: string): Promise<void> => {
    await authService.login2FA(code)
  },

  logout: async (): Promise<void> => {
    await request('/logout', { method: 'POST' })
    storage.remove('token')
    storage.remove('user')
  },

  isAuthenticated: (): boolean => !!storage.get('token', null),
  getCurrentUser: (): User | null => storage.get('user', null),
}