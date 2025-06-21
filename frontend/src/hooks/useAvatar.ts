import { useState, useEffect } from 'react'
import { userService } from '@/services'
import { User } from '@/types'
import { API_URL } from '@/utils/constants'

export const useAvatar = (userId: string | null) => {
  const [avatar, setAvatar] = useState<string>('')

  useEffect(() => {
    if (!userId) return

    const fetchAvatar = async () => {
      try {
        const user = await userService.get(Number(userId))
        let url = user.avatar_url || '/placeholder-avatar1.png'
        // if it's a relative uploads path, prefix the backend
        if (url.startsWith('/uploads/')) {
          url = `${API_URL}${url}`
        }
        setAvatar(url)
      } catch (err) {
        console.error('Failed to fetch avatar:', err)
        setAvatar('/placeholder-avatar1.png')
      }
    }

    fetchAvatar()
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
      let newUrl = updatedUser.avatar_url
      if (newUrl?.startsWith('/uploads/')) {
        newUrl = `${API_URL}${newUrl}`
      }
      setAvatar(newUrl || '/placeholder-avatar1.png')
    } catch (err) {
      console.error('Avatar upload failed:', err)
    }
  }

  return { avatar, handleAvatarChange }
}
