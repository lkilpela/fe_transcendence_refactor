import React, { useState, useMemo } from 'react'
import { Card } from '@/components/ui'
import { foundation, patterns } from '@/assets/design-system'
import useTranslate from '@/hooks/useTranslate'

interface Player {
  id: number
  display_name: string
  wins: number
  losses: number
  avatar_url: string
  created_at: string
}

interface GameStatsProps {
  userPlayers: Player[]
}

const GameStats: React.FC<GameStatsProps> = ({
  userPlayers,
}) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)
  const t = useTranslate()

  const selectedPlayer = useMemo(
    () => userPlayers.find((p) => p.id === selectedPlayerId),
    [selectedPlayerId, userPlayers]
  )

  const totalGames = (selectedPlayer?.wins ?? 0) + (selectedPlayer?.losses ?? 0)
  const winRate = totalGames > 0
    ? Math.round((selectedPlayer!.wins / totalGames) * 100)
    : 0

  return (
    <Card padding="lg">
      <div className={patterns.spacing.stack.md}>
        <h2 className={foundation.typography.h3}>{t('Player Stats')}</h2>
        
        <div className={patterns.form.container}>
          <select 
            id="player-select"
            value={selectedPlayerId ?? ''}
            onChange={(e) => setSelectedPlayerId(Number(e.target.value))}
            className={patterns.form.input}
          >
            <option value="" disabled>{t('Select a player')}</option>
            {userPlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.display_name}
              </option>
            ))}
          </select>
        </div>

        {selectedPlayer && (
          <div className={patterns.stats.grid}>
            <StatCard 
              title={t('stats.wins')}
              value={selectedPlayer.wins}
            />
            <StatCard 
              title={t('stats.losses')}
              value={selectedPlayer.losses}
            />
            <StatCard 
              title={t('stats.winRate')}
              value={`${winRate}%`}
            />
            <StatCard 
              title={t('stats.totalGames')}
              value={totalGames}
            />
          </div>
        )}
      </div>
    </Card>
  )
}

interface StatCardProps {
  title: string
  value: string | number
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className={patterns.stats.card.base}>
    <h3 className={patterns.stats.card.title}>{title}</h3>
    <p className={patterns.stats.card.value}>{value}</p>
  </div>
)

export default GameStats 