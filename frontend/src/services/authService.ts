import { LoginResponse, User } from '../types'
import { storage } from '../utils/storage'
import { request } from './api'
import { API_URL } from '@/utils/constants'

/**
 * Authentication service
 * @description Handles authentication-related API calls
 */
export const authService = {
  login: async (
    username: string,
    password: string,
    rememberMe?: boolean,
  ): Promise<void> => {
    const {
      token,
      id,
      username: name,
    } = await request<LoginResponse>('/', {
      method: 'POST',
      body: JSON.stringify({ username, password, rememberMe }),
    })
    storage.set('token', token)
    storage.set('user', { id, username: name })
  },

  login2FA: async (code: string): Promise<void> => {
    const {
      token,
      id,
      username: name,
    } = await request<LoginResponse>('/login/2fa', {
      method: 'POST',
      body: JSON.stringify({ code }),
    })
    storage.set('token', token)
    storage.set('user', { id, username: name })
  },

  googleLogin: async (googleToken: string): Promise<void> => {
    const { token, id, username } = await request<LoginResponse>(
      '/api/auth/google',
      {
        method: 'POST',
        body: JSON.stringify({ token: googleToken }),
      },
    )
    storage.set('token', token)
    storage.set('user', { id, username })
  },

  check2FAStatus: async (): Promise<{ enabled: boolean }> => {
    return request('/2fa/status')
  },

  verify2FA: async (
    code: string,
    tempToken: string,
  ): Promise<{ token: string }> => {
    const response = await request<{ token: string }>('/auth/2fa/verify', {
      method: 'POST',
      body: JSON.stringify({ code, tempToken }),
    })
    return response
  },

  register: async (username: string, email: string, password: string): Promise<void> => {
    const { token, id, username: name } = await request<LoginResponse>('/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    })
    storage.set('token', token)
    storage.set('user', { id, username: name })
  },

  logout: async (): Promise<void> => {
    await request('/logout', { method: 'POST' })
    storage.remove('token')
    storage.remove('user')
  },

  isAuthenticated: (): boolean => !!storage.get('token', null),
  getCurrentUser: (): User | null => storage.get('user', null),

  getGoogleAuthUrl: (): string =>
    `${API_URL}/api/auth/google`,

  requestPasswordReset: async (email: string): Promise<void> => {
    await request('/password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },
}
