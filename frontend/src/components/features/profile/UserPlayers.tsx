import React, { useEffect, useState } from 'react'
import { Card, Avatar } from '@/components/ui'
import { request } from '@/services/api'
import { UserPlayer } from '@/types'
import { foundation, patterns } from '@/assets/design-system'

interface UserPlayersProps {
  userId: number
}

export const UserPlayers: React.FC<UserPlayersProps> = ({ userId }) => {
  const [players, setPlayers] = useState<UserPlayer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await request<UserPlayer[]>(`/users/${userId}/players`)
        setPlayers(response || [])
      } catch (error) {
        console.error('Error fetching players:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPlayers()
  }, [userId])

  if (isLoading) {
    return (
      <Card variant="glass" padding="lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-32"></div>
          <div className="h-20 bg-white/10 rounded"></div>
        </div>
      </Card>
    )
  }

  if (players.length === 0) {
    return (
      <Card variant="glass" padding="lg">
        <h3 className={foundation.typography.h3}>Players</h3>
        <p className={foundation.typography.small}>No players found</p>
      </Card>
    )
  }

  return (
    <Card variant="glass" padding="lg">
      <h3 className={foundation.typography.h3}>Players</h3>
      <div className={patterns.spacing.section}>
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </Card>
  )
}

interface PlayerCardProps {
  player: UserPlayer
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const winRate = player.wins + player.losses > 0 
    ? Math.round((player.wins / (player.wins + player.losses)) * 100) 
    : 0

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
      <div className={patterns.flex.rowGap.md}>
        <Avatar src={player.avatar} alt={player.display_name} size="md" />
        <div>
          <h4 className={foundation.typography.medium}>{player.display_name}</h4>
          <p className={foundation.typography.small}>
            {player.points} points • {winRate}% win rate
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className={foundation.typography.small}>
          <span className={foundation.colors.semantic.success}>{player.wins}W</span>
          <span className="mx-1 text-gray-500">-</span>
          <span className={foundation.colors.semantic.error}>{player.losses}L</span>
        </div>
        {player.isActive && (
          <div className="flex items-center gap-1 mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className={foundation.typography.small}>Active</span>
          </div>
        )}
      </div>
    </div>
  )
}
