import React, { useState, useMemo } from 'react'
import { Card } from '@/components/ui'
import { StatsCard } from '@/components/shared'
import { foundation, patterns } from '@/assets/design-system'
import useTranslate from '@/hooks/useTranslate'
import { UserPlayer } from '@/types'
import { Trophy, Target, TrendingUp, BarChart3 } from 'lucide-react'

interface GameStatsProps {
  userPlayers: UserPlayer[]
}

export const GameStatsRefactored: React.FC<GameStatsProps> = ({
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
            <StatsCard 
              title={t('stats.wins')}
              value={selectedPlayer.wins}
              icon={<Trophy className="w-4 h-4" />}
              variant={selectedPlayer.wins > selectedPlayer.losses ? 'highlighted' : 'default'}
            />
            <StatsCard 
              title={t('stats.losses')}
              value={selectedPlayer.losses}
              icon={<Target className="w-4 h-4" />}
            />
            <StatsCard 
              title={t('stats.winRate')}
              value={`${winRate}%`}
              subtitle={winRate >= 70 ? 'Excellent!' : winRate >= 50 ? 'Good' : 'Keep practicing!'}
              icon={<TrendingUp className="w-4 h-4" />}
              variant={winRate >= 70 ? 'highlighted' : 'default'}
            />
            <StatsCard 
              title={t('stats.totalGames')}
              value={totalGames}
              subtitle={`${selectedPlayer.points} points`}
              icon={<BarChart3 className="w-4 h-4" />}
            />
          </div>
        )}
      </div>
    </Card>
  )
}

export default GameStatsRefactored 