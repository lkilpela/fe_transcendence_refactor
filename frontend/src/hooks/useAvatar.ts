import { useState, useEffect } from 'react'
import { userService } from '@/services'
import { User } from '@/types'
import { API_URL, DEFAULT_AVATAR } from '@/utils/constants'
import { storage } from '@/utils/storage'

export const useAvatar = (userId: string | null) => {
  const [avatar, setAvatar] = useState<string>(DEFAULT_AVATAR)

  useEffect(() => {
    const updateAvatar = () => {
      if (!userId) {
        setAvatar(DEFAULT_AVATAR)
        return
      }

      // First, check if we already have user data with avatar_url in storage
      const storedUser = storage.get<User | null>('user', null)
      if (storedUser?.avatar_url && storedUser.id === Number(userId)) {
        let url = storedUser.avatar_url
        if (url.startsWith('/uploads/')) {
          url = `${API_URL}${url}`
        }
        setAvatar(url)
        return
      }

      // If no stored avatar data, fetch from API
      const fetchAvatar = async () => {
        try {
          const user = await userService.get(Number(userId))
          let url = user.avatar_url || DEFAULT_AVATAR
          // if it's a relative uploads path, prefix the backend
          if (url.startsWith('/uploads/')) {
            url = `${API_URL}${url}`
          }
          setAvatar(url)
        } catch (err) {
          console.error('Failed to fetch avatar:', err)
          setAvatar(DEFAULT_AVATAR)
        }
      }

      fetchAvatar()
    }

    updateAvatar()

    // Listen for storage changes to update avatar when user data changes
    const handleStorageChange = () => updateAvatar()
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [userId])

  const handleAvatarChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!userId) return
    const file = e.target.files?.[0]
    if (!file?.type.startsWith('image/')) return

    const form = new FormData()
    form.append('file', file)

    try {
      const updatedUser = await userService.update(Number(userId), { avatar: form } as unknown as Partial<User>)
      let newUrl = updatedUser.avatar_url || DEFAULT_AVATAR
      if (newUrl?.startsWith('/uploads/')) {
        newUrl = `${API_URL}${newUrl}`
      }
      setAvatar(newUrl)
    } catch (err) {
      console.error('Avatar upload failed:', err)
    }
  }

  return { avatar, handleAvatarChange }
}
