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

const TopPlayers: React.FC<TopPlayersProps> = ({ players }) => {
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

  return (
    <Card padding="lg">
      <h2 className={foundation.typography.h3}>{t('TOP PLAYERS')}</h2>
      <div className={patterns.spacing.section}>
        {topPlayers.map((player) => {
          const percentage = ((player.wins * 100) / (player.wins + player.losses)).toFixed(1)

          return (
            <div key={player.id} className={patterns.match.container}>
              <div className={patterns.match.players.container}>
                <img
                  src={player.avatar}
                  alt={`${player.name}'s avatar`}
                  className={patterns.avatar.md}
                />
                <div>
                  <p className={foundation.typography.body}>{player.name}</p>
                  <p className={foundation.typography.small}>
                    {player.wins}W - {player.losses}L
                  </p>
                </div>
              </div>
              <div className={patterns.align.right}>
                <p className={foundation.typography.body}>{percentage}%</p>
                <p className={foundation.typography.small}>Win Rate</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default TopPlayers
