const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:3001'

interface User {
  id: number
  username: string
  email: string
  online_status?: boolean
  two_fa_enabled?: boolean
  created_at?: string
}

interface LoginResponse {
  token: string
  username: string
  id: number
}

interface RegisterResponse {
  message: string
  user: User
}

class ApiService {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.loadTokenFromStorage()
  }

  private loadTokenFromStorage() {
    this.token = localStorage.getItem('token')
  }

  setToken(token: string | null) {
    this.token = token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API Error: ${response.status}`)
    }

    return response.json()
  }

  // Auth endpoints - matching backend routes
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    return response
  }

  async register(username: string, email: string, password: string): Promise<RegisterResponse> {
    const response = await this.request<RegisterResponse>('/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    })
    return response
  }

  async loginWithGoogle(code: string): Promise<LoginResponse> {
    const response = await this.request<{ user: LoginResponse } | LoginResponse>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ code }),
    })
    // Backend returns nested user object for Google login
    return 'user' in response ? response.user : response
  }

  async logout(): Promise<void> {
    await this.request('/logout', { method: 'POST' })
    this.setToken(null)
  }

  async getCurrentUser(): Promise<User> {
    // This endpoint might need to be implemented in backend
    const response = await this.request<User>('/api/auth/me')
    return response
  }
}

export const apiService = new ApiService(API_BASE_URL)
export type { User, LoginResponse, RegisterResponse } 