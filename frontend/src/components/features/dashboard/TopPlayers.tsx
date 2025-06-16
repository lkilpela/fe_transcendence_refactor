import React from 'react'
import { Card } from '@/components/ui'
import { cn } from '@/utils/cn'
import { foundation } from '@/assets/design-system'

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
    <Card variant="glass" padding="lg" className={className}>
      <h2 className={foundation.typography.h3}>Top Players</h2>
      
      <div className="mt-6 space-y-3">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={cn(
              'flex items-center justify-between p-4 rounded-lg',
              foundation.glass.light
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-8 h-8 flex items-center justify-center rounded-full',
                foundation.glass.medium
              )}>
                <span className={foundation.typography.body}>{index + 1}</span>
              </div>
              <img
                src={player.avatar}
                alt={player.name}
                className="w-10 h-10 rounded-full border-2 border-white/20"
              />
              <div>
                <p className={foundation.typography.body}>{player.name}</p>
                <p className={foundation.typography.small}>
                  {player.wins}W - {player.losses}L
                </p>
              </div>
            </div>
            <div className="text-right">
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