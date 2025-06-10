const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

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
  requires_2fa?: boolean
  temp_token?: string
}

interface RegisterResponse {
  message: string
  user: User
}

interface ApiError {
  status: number
  message: string
  code?: string
}

class ApiService {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.loadTokenFromStorage()
  }

  private loadTokenFromStorage() {
    // Check localStorage first, then sessionStorage
    this.token = localStorage.getItem('token') || sessionStorage.getItem('token')
  }

  setToken(token: string | null, rememberMe: boolean = true) {
    this.token = token
    if (token) {
      if (rememberMe) {
        localStorage.setItem('token', token)
      } else {
        // Use sessionStorage for temporary sessions
        sessionStorage.setItem('token', token)
        localStorage.removeItem('token')
      }
    } else {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    console.log('🚀 API Request:', options.method || 'GET', url)
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        // credentials: 'include', // Enable cookies for cross-origin requests - commented out for development
      })

      // Handle 401 Unauthorized - clear tokens and redirect
      if (response.status === 401) {
        this.setToken(null)
        // Only redirect if not already on login page
        if (window.location.pathname !== '/') {
          window.location.href = '/'
        }
        throw new Error('Session expired. Please login again.')
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const apiError: ApiError = {
          status: response.status,
          message: errorData.error || errorData.message || `API Error: ${response.status}`,
          code: errorData.code
        }
        throw new Error(apiError.message)
      }

      return response.json()
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError) {
        console.error('Network Error:', error.message)
        throw new Error('Network Error: Please check your internet connection')
      }
      
      // Re-throw API errors
      throw error
    }
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

  // Get Google OAuth URL
  getGoogleAuthUrl(): string {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const redirectUri = `${window.location.origin}/auth/google/callback`
    const scope = 'openid email profile'
    
    return `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${crypto.randomUUID()}`
  }

  async logout(): Promise<void> {
    await this.request('/logout', { method: 'POST' })
    this.setToken(null)
  }

  async getCurrentUser(): Promise<User> {
    // Updated to use the correct backend endpoint
    const response = await this.request<User>('/api/user/me')
    return response
  }

  // Add method to refresh user data
  async refreshUserProfile(): Promise<User> {
    const user = await this.getCurrentUser()
    return user
  }

  // Password reset methods
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    const response = await this.request<{ message: string }>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
    return response
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await this.request<{ message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    })
    return response
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await this.request<{ message: string }>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    })
    return response
  }

  // 2FA methods
  async verify2FA(code: string, tempToken?: string): Promise<LoginResponse> {
    const headers: Record<string, string> = {}
    if (tempToken) {
      headers['Authorization'] = `Bearer ${tempToken}`
    }
    
    const response = await this.request<LoginResponse>('/api/auth/verify-2fa', {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers,
    })
    return response
  }

  async enable2FA(): Promise<{ qr_code: string; secret: string }> {
    const response = await this.request<{ qr_code: string; secret: string }>('/api/auth/enable-2fa', {
      method: 'POST',
    })
    return response
  }

  async disable2FA(code: string): Promise<{ message: string }> {
    const response = await this.request<{ message: string }>('/api/auth/disable-2fa', {
      method: 'POST',
      body: JSON.stringify({ code }),
    })
    return response
  }
}

export const apiService = new ApiService(API_BASE_URL)
export type { User, LoginResponse, RegisterResponse } 