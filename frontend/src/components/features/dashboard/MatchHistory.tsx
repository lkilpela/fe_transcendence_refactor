import React, { useMemo } from 'react'
import { Card } from '@/components/ui'
import { foundation, patterns } from '@/assets/design-system'
import { useUserPlayers, useTranslate } from '@/hooks'
import { MatchHistoryProps, ProcessedMatch } from '@/types'

export const MatchHistory: React.FC<MatchHistoryProps> = ({ matches, className }) => {
  const { userPlayers } = useUserPlayers()
  const t = useTranslate()

  const recentMatches = useMemo(() => {
    if (!Array.isArray(matches) || userPlayers.length === 0) return []

    return [...matches]
      .filter((match) => match.players.length > 1)
      .filter((match) => {
        const [p1, p2] = match.players
        return !(p1.score === 0 && p2.score === 0)
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
      .map((match) => {
        const [p1, p2] = match.players
        const player1 = userPlayers.find((u) => u.id === p1.player_id)
        const player2 = userPlayers.find((u) => u.id === p2.player_id)

        if (!player1 || !player2) return null

        return {
          id: match.id.toString(),
          player: {
            name: player1.display_name,
            avatar: player1.avatar
          },
          opponent: {
            name: player2.display_name,
            avatar: player2.avatar
          },
          score: `${p1.score} - ${p2.score}`,
          date: new Date(match.date).toLocaleDateString(),
          mode: match.type
        }
      })
      .filter((match): match is ProcessedMatch => match !== null)
  }, [matches, userPlayers])

  return (
    <Card padding="lg" className={className}>
      <h2 className={foundation.typography.h3}>{t('Recent Matches')}</h2>
      
      <div className={patterns.spacing.section}>
        {recentMatches.map((match) => (
          <div 
            key={match.id} 
            className={patterns.match.container}
          >
            <div className={patterns.match.players.list}>
              <PlayerInfo player={match.player} />
              <span className={foundation.typography.small}>vs</span>
              <PlayerInfo player={match.opponent} />
            </div>
            <div className={patterns.align.right}>
              <p className={foundation.typography.body}>{match.score}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// Extracted player info component to reduce nesting and repetition
const PlayerInfo: React.FC<{ player: { name: string; avatar: string } }> = ({ player }) => (
  <div className={patterns.flex.rowGap.sm}>
    <img 
      src={player.avatar} 
      alt={player.name} 
      className={patterns.avatar.md}
    />
    <span className={foundation.typography.body}>{player.name}</span>
  </div>
)
  