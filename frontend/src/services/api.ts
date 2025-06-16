import { User, LoginResponse } from '../types'

// Constants
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:3001'
const STORAGE_KEY = 'app_data'

// Storage helpers
const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')[key] ?? defaultValue
    } catch {
      return defaultValue
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, [key]: value }))
    } catch (error) {
      console.error('Storage error:', error)
    }
  },
  remove: (key: string): void => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      delete data[key]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Storage error:', error)
    }
  }
}

// Request helpers
const createHeaders = (token: string | null) => ({
  'Content-Type': 'application/json',
  ...(token ? { 'Authorization': `Bearer ${token}` } : {})
})

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 401) {
    storage.remove('token')
    window.location.href = '/'
    throw new Error('Session expired. Please login again.')
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error occurred' }))
    throw new Error(error.message || `Request failed with status ${response.status}`)
  }

  return response.json()
}

// Core request function
const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = storage.get('token', null)
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: createHeaders(token),
  })
  return handleResponse<T>(response)
}

// API endpoints
export const api = {
  auth: {
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
    register: async (username: string, email: string, password: string): Promise<{ message: string }> =>
      request<{ message: string }>('/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      }),
    logout: async (): Promise<void> => {
      await request('/logout', { method: 'POST' })
      storage.remove('token')
      storage.remove('user')
    },
    isAuthenticated: (): boolean => !!storage.get('token', null),
    getCurrentUser: (): User | null => storage.get('user', null)
  },
  users: {
    getAll: (): Promise<User[]> => 
      request<User[]>('/users'),
    get: (id: number): Promise<User> => 
      request<User>(`/users/${id}`),
    update: (id: number, data: Partial<User>): Promise<User> =>
      request<User>(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (): Promise<{ message: string }> =>
      request<{ message: string }>('/users', {
        method: 'DELETE',
      })
  }
} 