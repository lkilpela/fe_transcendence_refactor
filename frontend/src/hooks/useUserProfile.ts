import { request } from '@/services/api'
import { User } from '@/types'
import { useEffect, useState } from 'react'

interface UseUserProfileReturn {
  user: User | null
  isLoading: boolean
  error: string | null
}

export const useUserProfile = (
  id: string | undefined,
): UseUserProfileReturn => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) {
        setError('No user ID provided')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const response = await request<User>(`/users/${id}`)
        setUser(response)
      } catch (err) {
        console.error('Error fetching user profile:', err)
        setError(
          err instanceof Error ? err.message : 'Failed to fetch user profile',
        )
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [id])

  return { user, isLoading, error }
}
