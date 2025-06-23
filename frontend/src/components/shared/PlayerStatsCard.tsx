import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/ui'
import { UserPlayer } from '@/types'
import { foundation, patterns } from '@/assets/design-system'
import { request } from '@/services/api'

interface PlayerStatsCardProps {
  player: UserPlayer
  variant?: 'detailed' | 'compact' | 'leaderboard'
  showNavigation?: boolean
  showActiveStatus?: boolean
  className?: string
}

export const PlayerStatsCard: React.FC<PlayerStatsCardProps> = ({
  player,
  variant = 'detailed',
  showNavigation = false,
  showActiveStatus = true,
  className = ''
}) => {
  const navigate = useNavigate()

  // Shared stats calculations
  const totalGames = player.wins + player.losses
  const winRate = totalGames > 0 ? Math.round((player.wins * 100) / totalGames) : 0

  const handlePlayerClick = async () => {
    if (!showNavigation) return
    
    try {
      const playerData = await request<UserPlayer & { user_id: number }>(`/players/${player.id}`)
      if (playerData.user_id) {
        navigate(`/profile/${playerData.user_id}`)
      }
    } catch (error) {
      console.error('Error navigating to player profile:', error)
    }
  }

  // Leaderboard variant (TopPlayers style)
  if (variant === 'leaderboard') {
    return (
      <div 
        className={`${patterns.topPlayers.player.container} ${showNavigation ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
        onClick={showNavigation ? handlePlayerClick : undefined}
      >
        <div className={patterns.topPlayers.player.avatarWrapper}>
          <Avatar
            src={player.avatar}
            alt={player.display_name}
            size="lg"
            className={patterns.topPlayers.player.avatar}
          />
        </div>
        
        <div className={`${patterns.topPlayers.player.name} ${showNavigation ? 'hover:underline' : ''}`}>
          {player.display_name}
        </div>
        
        <div className={patterns.topPlayers.player.percentage}>
          {winRate}%
        </div>
        
        <div className={patterns.topPlayers.player.record}>
          {player.wins}W-{player.losses}L
        </div>
      </div>
    )
  }

  // Compact variant (for lists)
  if (variant === 'compact') {
    return (
      <div 
        className={`flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 ${showNavigation ? 'cursor-pointer hover:bg-white/10 transition-colors' : ''} ${className}`}
        onClick={showNavigation ? handlePlayerClick : undefined}
      >
        <div className={patterns.flex.rowGap.sm}>
          <Avatar src={player.avatar} alt={player.display_name} size="sm" />
          <span className={foundation.typography.small}>{player.display_name}</span>
        </div>
        
        <div className="text-right">
          <div className={foundation.typography.small}>
            <span className={foundation.colors.semantic.success}>{player.wins}W</span>
            <span className="mx-1 text-gray-500">-</span>
            <span className={foundation.colors.semantic.error}>{player.losses}L</span>
          </div>
        </div>
      </div>
    )
  }

  // Detailed variant (default - UserPlayers style)
  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 ${showNavigation ? 'cursor-pointer hover:bg-white/10 transition-colors' : ''} ${className}`}
      onClick={showNavigation ? handlePlayerClick : undefined}
    >
      <div className={patterns.flex.rowGap.md}>
        <Avatar src={player.avatar} alt={player.display_name} size="md" />
        <div>
          <h4 className={`${foundation.typography.medium} ${showNavigation ? 'hover:underline' : ''}`}>
            {player.display_name}
          </h4>
          <p className={foundation.typography.small}>
            {player.points} points • {winRate}% win rate
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <div className={foundation.typography.small}>
          <span className={foundation.colors.semantic.success}>{player.wins}W</span>
          <span className="mx-1 text-gray-500">-</span>
          <span className={foundation.colors.semantic.error}>{player.losses}L</span>
        </div>
        
        {showActiveStatus && player.isActive && (
          <div className="flex items-center gap-1 mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className={foundation.typography.small}>Active</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlayerStatsCard 