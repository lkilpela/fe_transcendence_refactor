import { useState, useEffect, useCallback } from 'react'
import { request } from '@/services'

export interface MatchPlayer {
  player_id: number
  score: number
  round?: number
}

export interface MatchHistory {
  id: number
  type: string
  tournament_id: number
  date: string
  round: number
  winner_id: number
  players: MatchPlayer[]
}

interface MatchRequest {
  type: string
  tournament_id: number
  winner_id: number
  players: MatchPlayer[]
}

export const useMatchHistories = () => {
  const [matches, setMatches] = useState<MatchHistory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const fetchMatches = useCallback(async () => {
    setLoading(true)
    try {
      const data = await request<MatchHistory[]>('/match-histories')
      setMatches(data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const getMatchById = useCallback(async (id: number) => {
    try {
      const match = await request<MatchHistory>(`/match-histories/${id}`)
      return match
    } catch (err) {
      console.error(err)
      throw err
    }
  }, [])

  const createMatch = useCallback(async (matchData: MatchRequest) => {
    try {
      const response = await request<{ message: string; item: MatchHistory }>(
        '/match-histories',
        {
          method: 'POST',
          body: JSON.stringify(matchData)
        }
      )
      setMatches((prev) => [...prev, response.item])
      return response.item
    } catch (err) {
      console.error(err)
      throw err
    }
  }, [])

  const updateMatch = useCallback(async (id: number, updates: MatchRequest) => {
    try {
      const response = await request<{ message: string; item: MatchHistory }>(
        `/match-histories/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updates)
        }
      )
      setMatches((prev) =>
        prev.map((match) => (match.id === id ? response.item : match))
      )
      return response.item
    } catch (err) {
      console.error(err)
      throw err
    }
  }, [])

  const deleteMatch = useCallback(async (id: number) => {
    try {
      await request<{ message: string }>(`/match-histories/${id}`, {
        method: 'DELETE'
      })
      setMatches((prev) => prev.filter((match) => match.id !== id))
    } catch (err) {
      console.error(err)
      throw err
    }
  }, [])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  return {
    matches,
    loading,
    error,
    fetchMatches,
    createMatch,
    getMatchById,
    updateMatch,
    deleteMatch,
  }
}
