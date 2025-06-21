import { useState, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { request } from '@/services/api'
import { GameState } from '@/types'

interface GameStateHook {
  scores: { player1: number; player2: number }
  matchStatus: 'pending' | 'in_progress' | 'completed'
  matchResult: string | null
  gameStarted: boolean
  handleMatchEnd: (winner: { id: number; name: string }) => void
  handleMatchStatusChange: (status: 'pending' | 'in_progress' | 'completed') => void
  setScores: (scores: { player1: number; player2: number }) => void
  setGameStarted: (started: boolean) => void
}

export const useGameState = (): GameStateHook => {
  const [scores, setScores] = useState({ player1: 0, player2: 0 })
  const [matchStatus, setMatchStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending')
  const [matchResult, setMatchResult] = useState<string | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleMatchEnd = useCallback(async (winner: { id: number; name: string }) => {
    console.log('🏆 Match ended - Winner:', winner.name)
    setMatchResult(`Winner: ${winner.name}`)
    
    // Get game state from location
    const gameState = location.state as GameState
    
    if (gameState?.matchId && gameState?.player1 && gameState?.player2) {
      try {
        console.log('💾 Saving match results to database...')
        
        // Determine winner and loser scores
        const player1Score = scores.player1
        const player2Score = scores.player2
        const winnerId = winner.id
        
        // Prepare players array with scores
        const players = [
          {
            player_id: gameState.player1.id,
            score: player1Score
          },
          {
            player_id: gameState.player2.id,
            score: player2Score
          }
        ]
        
        // Update match in database
        await request(`/match-histories/${gameState.matchId}`, {
          method: 'PUT',
          body: JSON.stringify({
            winner_id: winnerId,
            players: players
          })
        })
        
        console.log('✅ Match results saved successfully')
        
        // Navigate back to tournament after a delay
        setTimeout(() => {
          if (gameState.returnTo) {
            navigate(gameState.returnTo)
          } else {
            navigate('/dashboard')
          }
        }, 3000)
        
      } catch (error) {
        console.error('❌ Failed to save match results:', error)
        alert('Failed to save match results. Please try again.')
      }
    }
  }, [scores, location.state, navigate])

  const handleMatchStatusChange = useCallback((status: 'pending' | 'in_progress' | 'completed') => {
    setMatchStatus(status)
  }, [])

  // Listen for spacebar to start game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        setGameStarted(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    scores,
    matchStatus,
    matchResult,
    gameStarted,
    handleMatchEnd,
    handleMatchStatusChange,
    setScores,
    setGameStarted
  }
} 