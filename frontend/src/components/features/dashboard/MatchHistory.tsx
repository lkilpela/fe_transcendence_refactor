import React from 'react'
import { Card } from '@/components/ui'
import { cn } from '@/utils/cn'
import { foundation } from '@/assets/design-system'

interface Match {
  id: string
  date: string
  opponent: string
  result: 'win' | 'loss'
  score: string
}

interface MatchHistoryProps {
  matches: Match[]
  className?: string
}

const MatchHistory: React.FC<MatchHistoryProps> = ({
  matches,
  className,
}) => {
  return (
    <Card variant="glass" padding="lg" className={className}>
      <h2 className={foundation.typography.h3}>Match History</h2>
      
      <div className="mt-6 space-y-3">
        {matches.map((match) => (
          <div
            key={match.id}
            className={cn(
              'flex items-center justify-between p-4 rounded-lg',
              foundation.glass.light
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  match.result === 'win' ? foundation.colors.semantic.success : foundation.colors.semantic.error
                )}
              />
              <div>
                <p className={foundation.typography.body}>{match.opponent}</p>
                <p className={foundation.typography.small}>{match.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={foundation.typography.body}>{match.score}</p>
              <p
                className={cn(
                  foundation.typography.small,
                  match.result === 'win' ? foundation.colors.semantic.success : foundation.colors.semantic.error
                )}
              >
                {match.result === 'win' ? 'Victory' : 'Defeat'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default MatchHistory 