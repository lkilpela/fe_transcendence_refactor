import React, { useMemo } from 'react'
import useTranslate from '@/hooks/useTranslate'
import { Card } from '@/components/ui'
import { PlayerStatsCard } from '@/components/shared'
import { foundation, patterns } from '@/assets/design-system'
import { UserPlayer } from '@/types'

interface TopPlayersProps {
  players: UserPlayer[]
}

export const TopPlayersRefactored: React.FC<TopPlayersProps> = ({ players }) => {
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
      
      {/* Clean Grid Layout using shared component */}
      <div className={patterns.topPlayers.grid}>
        {topPlayers.map((player, index) => (
          <div key={player.id} className="relative">
            {/* Crown for #1 Player */}
            {index === 0 && (
              <div className="absolute -top-1 -right-1 text-lg z-10">
                👑
              </div>
            )}
            
            <PlayerStatsCard
              player={player}
              variant="leaderboard"
              showNavigation={true}
              showActiveStatus={false}
            />
          </div>
        ))}
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

export default TopPlayersRefactored 