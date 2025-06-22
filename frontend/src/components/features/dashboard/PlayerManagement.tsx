import React, { useState } from 'react'
import { UserPlus, Trash2 } from 'lucide-react'
import { Card, Button, Input } from '@/components/ui'
import { foundation, patterns } from '@/assets/design-system'
import { UserPlayer } from '@/types'
import useTranslate from '@/hooks/useTranslate'

interface PlayerManagementProps {
  userPlayers: UserPlayer[]
  onCreatePlayer: (playerName: string) => void
  onUpdatePlayer: (playerId: string, updates: Partial<UserPlayer>) => void
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
      setError(t('Player name cannot be empty'))
      return
    }
    if (playerName.length > 20) {
      setError(t('Player name must be 20 characters or less'))
      return
    }
    onCreatePlayer(playerName.trim())
    onClose()
  }

  return (
    <div className={patterns.modal.overlay}>
      <div className={patterns.modal.content}>
        <h3 className={foundation.typography.h3}>{t('Create New Player')}</h3>
        <form onSubmit={handleSubmit} className={patterns.spacing.stack.md}>
          <div className={patterns.spacing.stack.sm}>
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
            {error && <div className={foundation.colors.semantic.error}>{error}</div>}
          </div>
          <div className={patterns.flex.rowGap.sm}>
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

export const PlayerManagement: React.FC<PlayerManagementProps> = ({
  userPlayers,
  onCreatePlayer,
  onDeletePlayer,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const t = useTranslate()

  return (
    <Card padding="lg">
      <div className={patterns.spacing.stack.md}>
        <div className={patterns.flex.rowBetween}>
          <h2 className={foundation.typography.h3}>{t('Your Players')}</h2>
          <Button
            onClick={() => setShowCreateModal(true)}
            variant="primary"
            size="sm"
            className={patterns.flex.rowGap.sm}
          >
            <UserPlus size={16} />
            <span>{t('Create Player')}</span>
          </Button>
        </div>

        {/* Player List using design system patterns */}
        {userPlayers.length > 0 ? (
          <div className={patterns.spacing.stack.sm}>
            {userPlayers.map((player) => (
              <div
                key={player.id}
                className={patterns.modal.playerItem}
              >
                <div className={patterns.flex.rowGap.sm}>
                  <img
                    src={player.avatar}
                    alt={player.display_name}
                    className={patterns.avatar.sm}
                  />
                  <span className={foundation.typography.body}>{player.display_name}</span>
                </div>
                <button
                  onClick={() => onDeletePlayer(player.id.toString())}
                  className={patterns.button.iconDanger}
                  title={t('Delete player')}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={patterns.align.center}>
            <div className={patterns.spacing.stack.sm}>
              <p className={foundation.typography.body}>
                {t('No players created yet')}
              </p>
            </div>
          </div>
        )}
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