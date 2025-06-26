import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslate } from '@/hooks'
import { Card, Avatar } from '@/components/ui'
import { foundation, patterns } from '@/assets/design-system'
import { UserPlayer } from '@/types'
import { request } from '@/services/api'

interface TopPlayersProps {
  players: UserPlayer[]
}

export const TopPlayers: React.FC<TopPlayersProps> = ({ players }) => {
  const navigate = useNavigate()
  
  // Sort and slice top 4 players based on win percentage
  const topPlayers = useMemo(() => {
    if (!Array.isArray(players)) return []

    return (
      [...players]
      .filter((p) => p.wins + p.losses > 0) // Avoid division by zero
      .sort((a, b) => {
        const aPercentage = (a.wins * 100) / (a.wins + a.losses)
        const bPercentage = (b.wins * 100) / (b.wins + b.losses)
        return bPercentage - aPercentage // Descending order
      })
      .slice(0, 4)
    )
  }, [players])

  const t = useTranslate()

  const handlePlayerClick = async (playerId: number) => {
    try {
      // Get player info to find the user_id for navigation
      const player = await request<UserPlayer & { user_id: number }>(`/players/${playerId}`)
      if (player.user_id) {
        navigate(`/profile/${player.user_id}`)
      }
    } catch (error) {
      console.error('Error navigating to player profile:', error)
    }
  }

  if (topPlayers.length === 0) {
    return (
      <Card padding="lg">
        <h2 className={foundation.typography.h3}>{t('TOP PLAYERS')}</h2>
        <div className={patterns.topPlayers.empty.container}>
          <p className={patterns.topPlayers.empty.message}>No player stats yet</p>
          <p className={patterns.topPlayers.empty.subtitle}>Play some matches to see rankings!</p>
        </div>
      </Card>
    )
  }

  return (
    <Card padding="lg">
      <h2 className={foundation.typography.h3}>{t('TOP PLAYERS')}</h2>
      
      {/* Clean Grid Layout */}
      <div className={patterns.topPlayers.grid}>
        {topPlayers.map((player, index) => {
          const totalGames = player.wins + player.losses
          const winPercentage = Math.round((player.wins * 100) / totalGames)
          
          return (
            <div 
              key={player.id} 
              className={`${patterns.topPlayers.player.container} cursor-pointer hover:opacity-80 transition-opacity`}
              onClick={() => handlePlayerClick(player.id)}
            >
              {/* Avatar */}
              <div className={patterns.topPlayers.player.avatarWrapper}>
                <Avatar
                  src={player.avatar}
                  alt={player.display_name}
                  className={patterns.topPlayers.player.avatar}
                />
                
                {/* Crown for #1 Player */}
                {index === 0 && (
                  <div className={patterns.topPlayers.player.crown}>
                    👑
                  </div>
                )}
              </div>
              
              {/* Player Name */}
              <div className={`${patterns.topPlayers.player.name} hover:underline`}>
                {player.display_name}
              </div>
              
              {/* Win Percentage */}
              <div className={patterns.topPlayers.player.percentage}>
                {winPercentage}%
              </div>
              
              {/* Win/Loss Record */}
              <div className={patterns.topPlayers.player.record}>
                {player.wins}W-{player.losses}L
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Encouragement message */}
      {topPlayers.length < 4 && (
        <div className={patterns.topPlayers.encouragement.container}>
          <p className={patterns.topPlayers.encouragement.message}>
            Play more matches to see more top players!
          </p>
        </div>
      )}
    </Card>
  )
}
