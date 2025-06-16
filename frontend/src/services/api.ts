import { storage } from '../utils/storage'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:3001'

/**
 * Create headers for API requests
 * @param token - The JWT token for authentication
 * @returns The headers object
 */
const createHeaders = (token: string | null) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
})

/**
 * Handle API response
 * @param res - The response object
 * @returns The response data
 */
const handleResponse = async <T>(res: Response): Promise<T> => {
  if (res.status === 401) {
    storage.remove('token')
    window.location.href = '/login?expired=1'
    throw new Error('Session expired')
  }

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    // Log the actual response for debugging
    console.log('Server response:', data)
    // Use the server's error message if available
    throw new Error(data?.message || `Request failed with status ${res.status}`)
  }
  return data
}

/**
 * Make an API request
 * @param endpoint - The API endpoint
 * @param options - The request options
 * @returns The response data
 */
export const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = storage.get('token', null)
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: createHeaders(token),
  })
  return handleResponse<T>(res)
}
