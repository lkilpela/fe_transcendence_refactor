import { MatchData, Tournament } from '@/types'
import { request } from './api'

/**
 * Game service
 * @description Handles game-related API calls
 */
export const gameService = {
  /**
   * Create a new 1v1 match
   * @param player1Id - ID of the first player
   * @param player2Id - ID of the second player
   * @returns Promise<MatchData> - The created match data
   */
  createMatch: async (player1Id: number, player2Id: number): Promise<MatchData> => {
    return request<MatchData>('/match-histories', {
      method: 'POST',
      body: JSON.stringify({
        type: '1v1',
        players: [
          { player_id: player1Id },
          { player_id: player2Id },
        ],
      }),
    })
  },

  /**
   * Create a new tournament
   * @param playerIds - Array of player IDs to include in the tournament
   * @returns Promise<void>
   */
  createTournament: async (playerIds: number[]): Promise<void> => {
    return request('/tournaments', {
      method: 'POST',
      body: JSON.stringify({
        name: `The Great Paddle-Off`,
        player_ids: playerIds,
      }),
    })
  },

  /**
   * Get all tournaments
   * @returns Promise<Tournament[]> - Array of tournaments
   */
  getTournaments: async (): Promise<Tournament[]> => {
    const response = await request<unknown>('/tournaments')
    if (response && typeof response === 'object' && 'items' in response) {
      return (response.items as Tournament[]) || []
    }
    return response as Tournament[]
  },

  /**
   * Get active tournament
   * @returns Promise<Tournament | undefined> - The active tournament if exists
   */
  getActiveTournament: async (): Promise<Tournament | undefined> => {
    const tournaments = await gameService.getTournaments()
    return tournaments.find(t => t.status === 'pending')
  }
} 