import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui'
import { request } from '@/services/api'
import { foundation, patterns } from '@/assets/design-system'

interface Match {
  id: number
  date: string
  winner_id: number
  players: {
    player_id: number
    score: number
  }[]
}

interface Player {
  id: number
  display_name: string
  avatar: string
}

interface ProfileMatchHistoryProps {
  userId: number
}

export const ProfileMatchHistory: React.FC<ProfileMatchHistoryProps> = ({ userId }) => {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const response = await request<Match[]>(`/match-histories/user/${userId}`)
        setMatches(response || [])
      } catch (error) {
        console.error('Error fetching match history:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMatchHistory()
  }, [userId])

  if (isLoading) {
    return (
      <Card variant="glass" padding="lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-32"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  if (matches.length === 0) {
    return (
      <Card variant="glass" padding="lg">
        <h3 className={foundation.typography.h3}>Match History</h3>
        <p className={foundation.typography.small}>No matches found</p>
      </Card>
    )
  }

  return (
    <Card variant="glass" padding="lg">
      <h3 className={foundation.typography.h3}>Match History (1v1)</h3>
      <div className={patterns.spacing.section}>
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </Card>
  )
}

interface MatchCardProps {
  match: Match
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const navigate = useNavigate()
  
  if (match.players.length !== 2) return null

  const [player1, player2] = match.players
  const isPlayer1Winner = match.winner_id === player1.player_id

  const handlePlayerClick = async (playerId: number) => {
    try {
      // Get player info to find the user_id for navigation
      const player = await request<Player & { user_id: number }>(`/players/${playerId}`)
      if (player.user_id) {
        navigate(`/profile/${player.user_id}`)
      }
    } catch (error) {
      console.error('Error navigating to player profile:', error)
    }
  }

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className={foundation.typography.small}>
          {new Date(match.date).toLocaleDateString()}
        </span>
        <span className={foundation.typography.small}>
          Match #{match.id}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PlayerInfo 
            playerId={player1.player_id} 
            isWinner={isPlayer1Winner} 
            onClick={() => handlePlayerClick(player1.player_id)}
          />
          <span className={foundation.typography.small}>vs</span>
          <PlayerInfo 
            playerId={player2.player_id} 
            isWinner={!isPlayer1Winner}
            onClick={() => handlePlayerClick(player2.player_id)}
          />
        </div>
        
        <div className="text-right">
          <div className={foundation.typography.medium}>
            {player1.score} - {player2.score}
          </div>
        </div>
      </div>
    </div>
  )
}

interface PlayerInfoProps {
  playerId: number
  isWinner: boolean
  onClick?: () => void
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ playerId, isWinner, onClick }) => {
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await request<Player>(`/players/${playerId}`)
        setPlayer(response)
      } catch (error) {
        console.error('Error fetching player:', error)
      }
    }
    fetchPlayer()
  }, [playerId])

  if (!player) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
        <div className="w-16 h-4 bg-white/10 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div 
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={onClick}
    >
      <img 
        src={player.avatar} 
        alt={player.display_name}
        className="w-8 h-8 rounded-full object-cover"
      />
      <span className={`${foundation.typography.small} ${isWinner ? foundation.colors.semantic.success : foundation.colors.text.secondary} ${onClick ? 'hover:underline' : ''}`}>
        {player.display_name}
        {isWinner && ' 🏆'}
      </span>
    </div>
  )
}

export default ProfileMatchHistory 