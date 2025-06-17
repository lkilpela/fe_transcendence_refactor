import React, { useState } from 'react'
import { UserPlus, Trash2 } from 'lucide-react'
import { Card, Button, Input } from '@/components/ui'
import { foundation, patterns } from '@/assets/design-system'
import { UserPlayer } from '@/types'
import useTranslate from '@/hooks/useTranslate'

interface PlayerManagementProps {
  userPlayers: UserPlayer[]
  onCreatePlayer: (playerName: string) => void
  onDeletePlayer: (playerId: string) => void
}

const CreatePlayerModal: React.FC<{
  onClose: () => void
  onCreatePlayer: (playerName: string) => void
}> = ({ onClose, onCreatePlayer }) => {
  const [playerName, setPlayerName] = useState('')
  const [error, setError] = useState('')
  const t = useTranslate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerName.trim()) {
      setError('Player name cannot be empty')
      return
    }
    if (playerName.length > 20) {
      setError('Player name must be 20 characters or less')
      return
    }
    onCreatePlayer(playerName.trim())
    onClose()
  }

  return (
    <div className={patterns.modal.overlay}>
      <div className={patterns.modal.content}>
        <h3 className={foundation.typography.h3}>{t('Create New Player')}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value)
                setError('')
              }}
              placeholder={t('Enter player name')}
              maxLength={16}
              required
            />
            {error && <div className="text-sm text-red-400 mt-1">{error}</div>}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              size="md"
            >
              {t('Cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
            >
              {t('Create Player')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const PlayerManagement: React.FC<PlayerManagementProps> = ({
  userPlayers,
  onCreatePlayer,
  onDeletePlayer,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const t = useTranslate()

  return (
    <Card padding="lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={foundation.typography.h3}>{t('Your Players')}</h2>
          <Button
            onClick={() => setShowCreateModal(true)}
            variant="primary"
            size="sm"
            className="flex items-center gap-2"
          >
            <UserPlus size={16} />
            <span>{t('Create Player')}</span>
          </Button>
        </div>

        <div className="space-y-3">
          {userPlayers.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={player.avatar}
                  alt="Current avatar"
                  className="w-8 h-8 rounded-full border-2"
                />
                <span className={foundation.typography.body}>{player.display_name}</span>
              </div>
              <Button
                onClick={() => onDeletePlayer(player.id.toString())}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300"
                title="Delete player"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <CreatePlayerModal
          onClose={() => setShowCreateModal(false)}
          onCreatePlayer={onCreatePlayer}
        />
      )}
    </Card>
  )
}

export default PlayerManagement 