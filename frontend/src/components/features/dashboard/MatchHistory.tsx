import React, { useMemo } from 'react'
import { Card, Avatar } from '@/components/ui'
import { foundation, patterns } from '@/assets/design-system'
import { useUserPlayers, useTranslate } from '@/hooks'

interface Match {
  id: number
  type: string
  tournament_id: number | null
  date: string
  round: number | null
  winner_id: number | null
  status?: string
  players: {
    player_id: number
    score: number
  }[]
}

interface MatchHistoryProps {
  matches: Match[]
  className?: string
}

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
      .filter((match): match is NonNullable<typeof match> => match !== null)
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
    <Avatar 
      src={player.avatar} 
      alt={player.name} 
      size="md"
    />
    <span className={foundation.typography.body}>{player.name}</span>
  </div>
)
  