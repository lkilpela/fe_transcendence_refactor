import React, { useState } from 'react'
import { Card, Button, Input } from '@/components/ui'
import { UserPlayer } from '@/types'
import { cn } from '@/utils/cn'
import { foundation } from '@/assets/design-system'

interface PlayerManagementProps {
  userPlayers: UserPlayer[]
  onCreatePlayer: (name: string) => void
  onUpdatePlayer: (id: string, updates: Partial<UserPlayer>) => void
  onDeletePlayer: (id: string) => void
  className?: string
}

const PlayerManagement: React.FC<PlayerManagementProps> = ({
  userPlayers,
  onCreatePlayer,
  onUpdatePlayer,
  onDeletePlayer,
  className,
}) => {
  const [newPlayerName, setNewPlayerName] = useState('')

  const handleCreatePlayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPlayerName.trim()) {
      onCreatePlayer(newPlayerName.trim())
      setNewPlayerName('')
    }
  }

  return (
    <Card variant="glass" padding="lg" className={className}>
      <h2 className={foundation.typography.h3}>Player Management</h2>
      
      <form onSubmit={handleCreatePlayer} className="mt-6">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter player name"
            size="md"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
          >
            Add Player
          </Button>
        </div>
      </form>

      <div className="mt-6 space-y-4">
        {userPlayers.map((player) => (
          <div
            key={player.id}
            className={cn(
              'flex items-center justify-between p-4 rounded-lg',
              foundation.glass.light
            )}
          >
            <div className="flex items-center gap-3">
              <img
                src={player.avatar}
                alt={player.display_name}
                className="w-10 h-10 rounded-full border-2 border-white/20"
              />
              <div>
                <h3 className={foundation.typography.body}>{player.display_name}</h3>
                <p className={foundation.typography.small}>
                  Wins: {player.wins} | Losses: {player.losses}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onUpdatePlayer(player.id.toString(), { isActive: !player.isActive })}
                variant="ghost"
                size="sm"
              >
                {player.isActive ? 'Deactivate' : 'Activate'}
              </Button>
              <Button
                onClick={() => onDeletePlayer(player.id.toString())}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default PlayerManagement 