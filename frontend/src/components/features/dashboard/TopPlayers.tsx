import React from 'react'
import { Card } from '@/components/ui'
import { foundation, patterns } from '@/assets/design-system'

interface Player {
  id: string
  name: string
  avatar: string
  wins: number
  losses: number
  winRate: number
}

interface TopPlayersProps {
  players: Player[]
  className?: string
}

const TopPlayers: React.FC<TopPlayersProps> = ({
  players,
  className,
}) => {
  return (
    <Card padding="lg" className={className}>
      <h2 className={foundation.typography.h3}>Top Players</h2>
      
      <div className={patterns.spacing.stack.md}>
        {players.map((player, index) => (
          <div
            key={player.id}
            className={patterns.match.container}
          >
            <div className={patterns.match.players.container}>
              <div className={patterns.avatar.md}>
                <span className={foundation.typography.body}>{index + 1}</span>
              </div>
              <img
                src={player.avatar}
                alt={player.name}
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
              <p className={foundation.typography.body}>{player.winRate}%</p>
              <p className={foundation.typography.small}>Win Rate</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default TopPlayers 