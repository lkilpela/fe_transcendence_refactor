import { useState, useCallback, useEffect } from 'react'

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

  const handleMatchEnd = useCallback((winner: { id: number; name: string }) => {
    console.log('🏆 Match ended - Winner:', winner.name)
    setMatchResult(`Winner: ${winner.name}`)
  }, [])

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