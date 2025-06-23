import { API_URL } from '@/utils/constants'
import { storage } from '@/utils/storage'
import { request } from './api'

// Domain types
export interface UserProfile {
  username: string
  email: string
  avatar_url?: string
}

export interface TwoFAStatus {
  twoFaEnabled: boolean
}

export interface TwoFASetup {
  qrDataUrl: string
}

export interface UpdateUserFieldRequest {
  [key: string]: string
}

export interface AvatarUploadResponse {
  item: {
    avatar_url: string
  }
}

// Settings Service - Domain logic layer
export const settingsService = {
  // User profile operations
  getUserProfile: async (userId: string): Promise<UserProfile> => {
    return (await request(`/users/${userId}`)) as UserProfile
  },

  updateUserField: async (
    userId: string,
    field: string,
    value: string,
  ): Promise<void> => {
    // Domain validation
    if (!value.trim()) {
      throw new Error(`${field} cannot be empty`)
    }

    const updateData: UpdateUserFieldRequest = { [field]: value }
    await request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    })
  },

  deleteUser: async (userId: string): Promise<void> => {
    await request(`/users/${userId}`, {
      method: 'DELETE',
    })
  },

  // Avatar operations
  uploadAvatar: async (userId: string, file: File): Promise<string> => {
    // Domain validation
    if (!file.type.startsWith('image/')) {
      throw new Error('Please select an image file')
    }

    const formData = new FormData()
    formData.append('file', file)

    // Use fetch directly for file uploads to avoid Content-Type conflicts
    const token = storage.get('token', null)
    const response = await fetch(`${API_URL}/users/${userId}/avatar`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        // Don't set Content-Type for FormData - let browser set it with boundary
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || 'Upload failed')
    }

    const data = (await response.json()) as AvatarUploadResponse
    return data.item.avatar_url
  },

  // Two-Factor Authentication operations
  get2FAStatus: async (): Promise<boolean> => {
    const response = (await request('/api/2fa/status')) as TwoFAStatus
    return response.twoFaEnabled === true
  },

  setup2FA: async (): Promise<string> => {
    const response = (await request('/api/2fa/setup')) as TwoFASetup
    return response.qrDataUrl
  },

  verify2FA: async (token: string): Promise<void> => {
    await request('/api/2fa/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
  },

  disable2FA: async (): Promise<void> => {
    await request('/api/2fa', {
      method: 'DELETE',
    })
  },
}
