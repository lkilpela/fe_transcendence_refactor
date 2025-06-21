import React, { useMemo } from 'react'
import useTranslate from '@/hooks/useTranslate'
import { Card } from '@/components/ui'
import { foundation, patterns } from '@/assets/design-system'

interface TopPlayer {
  id: string
  name: string
  points: number
  avatar: string
  wins: number
  losses: number
}

interface TopPlayersProps {
  players: TopPlayer[]
}

export const TopPlayers: React.FC<TopPlayersProps> = ({ players }) => {
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
              className={patterns.topPlayers.player.container}
            >
              {/* Avatar */}
              <div className={patterns.topPlayers.player.avatarWrapper}>
                <img
                  src={player.avatar}
                  alt={player.name}
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
              <div className={patterns.topPlayers.player.name}>
                {player.name}
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
