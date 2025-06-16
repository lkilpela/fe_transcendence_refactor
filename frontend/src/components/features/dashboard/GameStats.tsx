import React from 'react'
import { Card } from '@/components/ui'
import { cn } from '@/utils/cn'
import { foundation } from '@/assets/design-system'
import { UserPlayer } from '@/types'

interface GameStatsProps {
  userPlayers: UserPlayer[]
  className?: string
}

const GameStats: React.FC<GameStatsProps> = ({
  userPlayers,
  className,
}) => {
  const totalGames = userPlayers.reduce((sum, player) => sum + player.wins + player.losses, 0)
  const totalWins = userPlayers.reduce((sum, player) => sum + player.wins, 0)
  const totalLosses = userPlayers.reduce((sum, player) => sum + player.losses, 0)
  const winRate = totalGames ? Math.round((totalWins / totalGames) * 100) : 0

  return (
    <Card variant="glass" padding="lg" className={className}>
      <h2 className={foundation.typography.h3}>Game Statistics</h2>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className={cn('p-4 rounded-lg', foundation.glass.light)}>
          <h3 className={foundation.typography.small}>Total Games</h3>
          <p className={cn(foundation.typography.h3, 'mt-1')}>{totalGames}</p>
        </div>
        
        <div className={cn('p-4 rounded-lg', foundation.glass.light)}>
          <h3 className={foundation.typography.small}>Win Rate</h3>
          <p className={cn(foundation.typography.h3, 'mt-1')}>{winRate}%</p>
        </div>
        
        <div className={cn('p-4 rounded-lg', foundation.glass.light)}>
          <h3 className={foundation.typography.small}>Wins</h3>
          <p className={cn(foundation.typography.h3, 'mt-1')}>{totalWins}</p>
        </div>
        
        <div className={cn('p-4 rounded-lg', foundation.glass.light)}>
          <h3 className={foundation.typography.small}>Losses</h3>
          <p className={cn(foundation.typography.h3, 'mt-1')}>{totalLosses}</p>
        </div>
      </div>
    </Card>
  )
}

export default GameStats 