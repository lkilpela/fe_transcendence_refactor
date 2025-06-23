import { API_URL } from '@/utils/constants'
import { storage } from '../utils/storage'

/**
 * Callback function to handle session expiration
 * This will be set by the AuthProvider to handle logout when session expires
 */
let onSessionExpired: (() => void) | null = null

/**
 * Set the session expiration callback
 * @param callback - Function to call when session expires
 */
export const setSessionExpiredCallback = (callback: (() => void) | null) => {
  onSessionExpired = callback
}

/**
 * Create headers for API requests
 * @param token - The JWT token for authentication
 * @param hasBody - Whether the request has a body
 * @returns The headers object
 */
const createHeaders = (token: string | null, hasBody: boolean = false) => ({
  ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
})

/**
 * Custom error class for session expiration
 */
export class SessionExpiredError extends Error {
  constructor() {
    super('Session expired')
    this.name = 'SessionExpiredError'
  }
}

/**
 * Handle API response
 * @param res - The response object
 * @returns The response data
 */
const handleResponse = async <T>(res: Response): Promise<T> => {
  if (res.status === 401) {
    // Clean up local storage
    storage.remove('token')
    storage.remove('user')

    // Notify the auth context about session expiration
    if (onSessionExpired) {
      // Use setTimeout to avoid race conditions and allow AuthProvider to handle this gracefully
      setTimeout(() => {
        onSessionExpired?.()
      }, 0)
    }

    // Throw a custom error that can be easily identified and handled
    throw new SessionExpiredError()
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
export const request = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = storage.get('token', null)
  const hasBody = !!options.body
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: createHeaders(token, hasBody),
  })
  return handleResponse<T>(res)
}

