import { useState, useCallback, useEffect } from 'react'
import { UserPlayer, RawPlayer } from '@/types'
import { request } from '@/services'
import { API_URL } from '@/utils/constants'

export const useUserPlayers = () => {
  const [userPlayers, setUserPlayers] = useState<UserPlayer[]>([])

  // Fetch all players when component mounts
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const rawPlayers = await request<RawPlayer[]>('/players')
        const mapped = rawPlayers.map((r) => ({
          id: r.id,
          display_name: r.display_name,
          // prepend backend host, fallback to placeholder-avatar based on id index
          avatar: r.avatar
            ? `${API_URL}${r.avatar}`
            : `${API_URL}/uploads/placeholder-avatar${(r.id % 4) + 1}.png`,
          isActive: r.isActive ?? false,
          points: r.points ?? 0,
          wins: r.wins ?? 0,
          losses: r.losses ?? 0,
        }))
        setUserPlayers(mapped)
      } catch (error) {
        console.error('Failed to fetch players:', error)
        // Don't show alert for session expired errors as it's handled by AuthProvider
        if (error instanceof Error && error.message !== 'Session expired') {
          alert('Failed to fetch players. Please try again.')
        }
      }
    }

    fetchPlayers()
  }, [])

  const createPlayer = useCallback(async (playerName: string) => {
    try {
      await request<RawPlayer>('/players', {
        method: 'POST',
        body: JSON.stringify({ display_name: playerName })
      })
      // refetch list
      const rawPlayers = await request<RawPlayer[]>('/players')
      const mapped = rawPlayers.map((r) => ({
        id: r.id,
        display_name: r.display_name,
        avatar: r.avatar
          ? `${API_URL}${r.avatar}`
          : `${API_URL}/uploads/placeholder-avatar${(r.id % 4) + 1}.png`,
        isActive: r.isActive ?? false,
        points: r.points ?? 0,
        wins: r.wins ?? 0,
        losses: r.losses ?? 0,
      }))
      setUserPlayers(mapped)
    } catch (error) {
      console.error(error)
      if (error instanceof Error && error.message === 'Session expired') {
        // Don't show alert for session expired as it's handled by AuthProvider
        return
      }
      alert(`Failed to create player: ${playerName}`)
    }
  }, [])

  const updatePlayer = useCallback(
    async (playerId: string, updates: Partial<UserPlayer>) => {
      try {
        const updatedRaw = await request<RawPlayer>(`/players/${playerId}`, {
          method: 'PUT',
          body: JSON.stringify(updates)
        })
        const updated: UserPlayer = {
          id: updatedRaw.id,
          display_name: updatedRaw.display_name,
          avatar: updatedRaw.avatar
            ? `${API_URL}${updatedRaw.avatar}`
            : `${API_URL}/uploads/placeholder-avatar${(updatedRaw.id % 4) + 1}.png`,
          isActive: updatedRaw.isActive ?? false,
          points: updatedRaw.points ?? 0,
          wins: updatedRaw.wins ?? 0,
          losses: updatedRaw.losses ?? 0,
        }
        setUserPlayers((prev) =>
          prev.map((p) => (p.id.toString() === playerId ? updated : p))
        )
      } catch (error) {
        console.error(error)
        if (error instanceof Error && error.message === 'Session expired') {
          // Don't show alert for session expired as it's handled by AuthProvider
          return
        }
        alert(`Failed to update player: ${playerId}`)
      }
    },
    []
  )

  const deletePlayer = useCallback(async (playerId: string) => {
    try {
      await request<{ message: string }>(`/players/${playerId}`, {
        method: 'DELETE'
      })
      setUserPlayers((prev) => prev.filter((player) => player.id.toString() !== playerId))
    } catch (error) {
      console.error(error)
      if (error instanceof Error && error.message === 'Session expired') {
        // Don't show alert for session expired as it's handled by AuthProvider
        return
      }
      alert(`Failed to delete player: ${playerId}`)
    }
  }, [])

  return {
    userPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer,
  }
}
