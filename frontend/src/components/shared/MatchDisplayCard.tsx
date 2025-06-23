import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/ui'
import { request } from '@/services/api'
import { foundation, patterns } from '@/assets/design-system'

interface MatchPlayer {
  id: number
  name: string
  avatar: string
  score?: number
  isWinner?: boolean
}

interface MatchDisplayCardProps {
  matchId: string | number
  player1: MatchPlayer
  player2: MatchPlayer
  date?: string
  mode?: string
  variant?: 'compact' | 'detailed'
  showNavigation?: boolean
  className?: string
}

export const MatchDisplayCard: React.FC<MatchDisplayCardProps> = ({
  matchId,
  player1,
  player2,
  date,
  mode,
  variant = 'compact',
  showNavigation = false,
  className = ''
}) => {
  const navigate = useNavigate()

  const handlePlayerClick = async (playerId: number) => {
    if (!showNavigation) return
    
    try {
      const player = await request<{ user_id: number }>(`/players/${playerId}`)
      if (player.user_id) {
        navigate(`/profile/${player.user_id}`)
      }
    } catch (error) {
      console.error('Error navigating to player profile:', error)
    }
  }

  const PlayerInfo: React.FC<{ 
    player: MatchPlayer
    clickable?: boolean 
  }> = ({ player, clickable = false }) => (
    <div 
      className={`flex items-center gap-2 ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={clickable ? () => handlePlayerClick(player.id) : undefined}
    >
      <Avatar 
        src={player.avatar} 
        alt={player.name}
        size="sm"
      />
      <span className={`${foundation.typography.small} ${player.isWinner ? foundation.colors.semantic.success : foundation.colors.text.secondary} ${clickable ? 'hover:underline' : ''}`}>
        {player.name}
        {player.isWinner && ' 🏆'}
      </span>
    </div>
  )

  // Compact variant (Dashboard style)
  if (variant === 'compact') {
    return (
      <div className={`${patterns.match.container} ${className}`}>
        <div className={patterns.match.players.list}>
          <PlayerInfo player={player1} clickable={showNavigation} />
          <span className={foundation.typography.small}>vs</span>
          <PlayerInfo player={player2} clickable={showNavigation} />
        </div>
        <div className={patterns.align.right}>
          <p className={foundation.typography.body}>
            {player1.score !== undefined && player2.score !== undefined 
              ? `${player1.score} - ${player2.score}`
              : mode || 'Match'
            }
          </p>
        </div>
      </div>
    )
  }

  // Detailed variant (Profile style)
  return (
    <div className={`p-4 rounded-lg bg-white/5 border border-white/10 ${className}`}>
      {(date || matchId) && (
        <div className="flex items-center justify-between mb-2">
          {date && (
            <span className={foundation.typography.small}>
              {new Date(date).toLocaleDateString()}
            </span>
          )}
          {matchId && (
            <span className={foundation.typography.small}>
              Match #{matchId}
            </span>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PlayerInfo player={player1} clickable={showNavigation} />
          <span className={foundation.typography.small}>vs</span>
          <PlayerInfo player={player2} clickable={showNavigation} />
        </div>
        
        {player1.score !== undefined && player2.score !== undefined && (
          <div className="text-right">
            <div className={foundation.typography.medium}>
              {player1.score} - {player2.score}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchDisplayCard 