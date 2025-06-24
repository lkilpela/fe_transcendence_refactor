import { API_URL, GOOGLE_OAUTH } from '@/utils/constants'
import { LoginResponse, User } from '../types'
import { storage } from '../utils/storage'
import { request } from './api'

/**
 * Authentication service
 * @description Handles authentication-related API calls
 */
export const authService = {
  login: async (
    username: string,
    password: string,
    rememberMe?: boolean,
  ): Promise<{ requires2FA?: boolean; userId?: number }> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, rememberMe }),
    })

    const data = await response.json().catch(() => null)

    if (response.status === 206) {
      // 2FA required
      return { requires2FA: true, userId: data.userId }
    }

    if (response.status === 200) {
      // Successful login
      const { token, id, username: name } = data
      storage.set('token', token)
      storage.set('user', { id, username: name })
      return {}
    }

    // Handle other error cases
    if (response.status === 401) {
      storage.remove('token')
    }

    throw new Error(
      data?.error ||
        data?.message ||
        `Login failed with status ${response.status}`,
    )
  },

  login2FA: async (userId: number, code: string): Promise<void> => {
    const { token } = await request<{ token: string }>('/login/2fa', {
      method: 'POST',
      body: JSON.stringify({ userId, code }),
    })
    storage.set('token', token)

    // Fetch complete user data after successful 2FA
    try {
      const userResponse = await fetch(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (userResponse.ok) {
        const userData = await userResponse.json()
        storage.set('user', {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          avatar_url: userData.avatar_url,
        })
      } else {
        // Fallback to minimal user info if user fetch fails
        storage.set('user', { id: userId, username: '' })
      }
    } catch (error) {
      console.error('Failed to fetch user data after 2FA:', error)
      // Fallback to minimal user info
      storage.set('user', { id: userId, username: '' })
    }
  },

  check2FAStatus: async (): Promise<{ enabled: boolean }> => {
    return request('/api/2fa/status')
  },

  verify2FA: async (code: string): Promise<{ token: string }> => {
    const response = await request<{ token: string }>('/api/2fa/verify', {
      method: 'POST',
      body: JSON.stringify({ token: code }),
    })
    return response
  },

  register: async (
    username: string,
    email: string,
    password: string,
  ): Promise<void> => {
    const {
      token,
      id,
      username: name,
    } = await request<LoginResponse>('/register', {
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

  getGoogleAuthUrl: (): string => {
    const params = new URLSearchParams({
      client_id: GOOGLE_OAUTH.CLIENT_ID,
      redirect_uri: GOOGLE_OAUTH.REDIRECT_URI,
      response_type: GOOGLE_OAUTH.RESPONSE_TYPE,
      scope: GOOGLE_OAUTH.SCOPE,
      access_type: GOOGLE_OAUTH.ACCESS_TYPE,
      prompt: GOOGLE_OAUTH.PROMPT,
    })

    return `${GOOGLE_OAUTH.AUTH_URL}?${params.toString()}`
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    await request('/password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },
}
