import { foundation, patterns, layouts } from '@/assets/design-system'
import { Button, Card, Avatar } from '@/components/ui'
import { useTranslate } from '@/hooks'
import { gameService } from '@/services/gameService'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlayer } from '@/types'

interface QuickPlayProps {
  userPlayers: UserPlayer[]
}

/**
 * QuickPlay component
 * @description Displays the quick play options for the user
 * @param {UserPlayer[]} userPlayers - The list of user players
 * @returns {React.FC} The QuickPlay component
 */
export const QuickPlay: React.FC<QuickPlayProps> = ({ userPlayers }) => {
  const navigate = useNavigate()
  const hasActivePlayers = userPlayers.some((p) => p.isActive)
  const hasEnoughPlayers1v1 = userPlayers.length >= 2
  const hasEnoughPlayersTourn = userPlayers.length >= 4

  const [showModal1v1, setShowModal1v1] = useState(false)
  const [showModalTourn, setShowModalTourn] = useState(false)
  const [selected1v1Players, setSelected1v1Players] = useState<number[]>([])
  const [selectedTournamentPlayers, setSelectedTournamentPlayers] = useState<
    number[]
  >([])

  const t = useTranslate()

  const handleOneVsOneClick = () => {
    if (!hasActivePlayers) {
      alert('Please create a player before starting a match')
      return
    }

    if (!hasEnoughPlayers1v1) {
      alert('You need at least 2 players for a 1v1 match')
      return
    }

    setSelected1v1Players([])
    setShowModal1v1(true)
  }

  const handleTournamentClick = async () => {
    if (!hasActivePlayers) {
      alert('Please create a player before joining a tournament')
      return
    }

    if (!hasEnoughPlayersTourn) {
      alert('You need at least 4 players for a tournament')
      return
    }

    try {
      const activeTournament = await gameService.getActiveTournament()

      if (activeTournament) {
        navigate('/tournament')
      } else {
        setSelectedTournamentPlayers([])
        setShowModalTourn(true)
      }
    } catch (err) {
      console.error('Error checking for active tournament:', err)
      alert('Failed to check existing tournaments')
    }
  }

  const handleToggle1v1Player = (id: number) => {
    setSelected1v1Players((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pid) => pid !== id)
      } else if (prev.length < 2) {
        return [...prev, id]
      } else {
        return prev
      }
    })
  }

  const handleToggleTournamentPlayer = (id: number) => {
    setSelectedTournamentPlayers((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : prev.length < 8
          ? [...prev, id]
          : prev,
    )
  }

  const handleStartMatch = async () => {
    if (selected1v1Players.length !== 2) {
      alert('Please select exactly two players')
      return
    }

    const [player1Id, player2Id] = selected1v1Players

    try {
      const matchData = await gameService.createMatch(player1Id, player2Id)
      const matchId = matchData.match_id

      const player1 = userPlayers.find((p) => p.id === player1Id)!
      const player2 = userPlayers.find((p) => p.id === player2Id)!

      navigate('/game', {
        state: {
          matchId,
          matchType: '1v1',
          player1: {
            name: player1.display_name,
            avatar: player1.avatar,
            id: player1.id,
          },
          player2: {
            name: player2.display_name,
            avatar: player2.avatar,
            id: player2.id,
          },
          returnTo: '/dashboard',
        },
      })
    } catch (error) {
      alert('Failed to start match')
      console.error(error)
    }
  }

  const handleStartTournament = async () => {
    if (
      selectedTournamentPlayers.length < 4 ||
      selectedTournamentPlayers.length > 8
    ) {
      alert('You must select between 4 and 8 players for the tournament')
      return
    }

    const selected = userPlayers.filter((p) =>
      selectedTournamentPlayers.includes(p.id),
    )

    try {
      await gameService.createTournament(selected.map((p) => p.id))
      navigate('/tournament')
    } catch (error) {
      console.error('Error starting tournament:', error)
      alert('There was an error creating the tournament. Please try again.')
    }
  }

  return (
    <>
      <Card padding="lg">
        <div className={patterns.spacing.stack.md}>
          <h2 className={foundation.typography.h3}>{t('Game Modes')}</h2>
          <div className={layouts.grid.gameModes}>
            <Button
              onClick={handleOneVsOneClick}
              variant="primary"
              size="lg"
              className={patterns.gameModeButton.base}
              disabled={!hasEnoughPlayers1v1}
            >
              <span className={patterns.gameModeButton.icon}>🏓</span>
              <span className={patterns.gameModeButton.title}>{t('1v1 Match')}</span>
              <span className={patterns.gameModeButton.players}>{t('2 players')}</span>
            </Button>
            <Button
              onClick={handleTournamentClick}
              variant="primary"
              size="lg"
              className={patterns.gameModeButton.base}
              disabled={!hasEnoughPlayersTourn}
            >
              <span className={patterns.gameModeButton.icon}>🏆</span>
              <span className={patterns.gameModeButton.title}>{t('Tournament Mode')}</span>
              <span className={patterns.gameModeButton.players}>{t('4-8 players')}</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* 1v1 Modal */}
      {showModal1v1 && (
        <div className={patterns.modal.overlay}>
          <div className={patterns.modal.content}>
            {/* Header */}
            <div className={patterns.modal.header}>
              <h3 className={patterns.modal.title}>
                {t('Select Players')}
            </h3>
              <p className={patterns.modal.subtitle}>
                {t('Choose 2 players')} ({selected1v1Players.length}/2)
              </p>
            </div>
            
            {/* Body */}
            <div className={patterns.modal.body}>
            <div className={patterns.spacing.stack.sm}>
              {userPlayers.map((player) => (
                  <div
                    key={player.id}
                    className={`${patterns.modal.playerItem} ${
                      selected1v1Players.includes(player.id) ? patterns.modal.playerSelected : ''
                    }`}
                    onClick={() => handleToggle1v1Player(player.id)}
                  >
                    <div className={patterns.flex.rowGap.sm}>
                      <Avatar
                        src={player.avatar}
                        alt={player.display_name}
                        size="sm"
                      />
                  <span className={foundation.typography.body}>
                    {player.display_name}
                  </span>
                    </div>
                  <input
                    type="checkbox"
                    checked={selected1v1Players.includes(player.id)}
                      onChange={() => {}} // Handled by div onClick
                    disabled={
                      !selected1v1Players.includes(player.id) &&
                      selected1v1Players.length >= 2
                    }
                      className="pointer-events-none"
                  />
                  </div>
              ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className={patterns.modal.footer}>
              <Button
                onClick={() => setShowModal1v1(false)}
                variant="ghost"
                size="md"
              >
                {t('Cancel')}
              </Button>
              <Button
                onClick={handleStartMatch}
                variant="primary"
                size="md"
                disabled={selected1v1Players.length !== 2}
              >
                {t('Start Match')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tournament Modal */}
      {showModalTourn && (
        <div className={patterns.modal.overlay}>
          <div className={patterns.modal.content}>
            {/* Header */}
            <div className={patterns.modal.header}>
              <h3 className={patterns.modal.title}>
                {t('Select Tournament Players')}
              </h3>
              <p className={patterns.modal.subtitle}>
                {t('Choose 4-8 players')} ({selectedTournamentPlayers.length}/8)
              </p>
            </div>
            
            {/* Body */}
            <div className={patterns.modal.body}>
              <div className={patterns.spacing.stack.sm}>
                {userPlayers.map((player) => (
                  <div
                    key={player.id}
                    className={`${patterns.modal.playerItem} ${
                      selectedTournamentPlayers.includes(player.id) ? patterns.modal.playerSelected : ''
                    }`}
                    onClick={() => handleToggleTournamentPlayer(player.id)}
                  >
                    <div className={patterns.flex.rowGap.sm}>
                      <Avatar
                        src={player.avatar}
                        alt={player.display_name}
                        size="sm"
                      />
                      <span className={foundation.typography.body}>
                        {player.display_name}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedTournamentPlayers.includes(player.id)}
                      onChange={() => {}} // Handled by div onClick
                      disabled={
                        !selectedTournamentPlayers.includes(player.id) &&
                        selectedTournamentPlayers.length >= 8
                      }
                      className="pointer-events-none"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className={patterns.modal.footer}>
              <Button
                onClick={() => setShowModalTourn(false)}
                variant="ghost"
                size="md"
              >
                {t('Cancel')}
              </Button>
              <Button
                onClick={handleStartTournament}
                variant="primary"
                size="md"
                disabled={
                  selectedTournamentPlayers.length < 4 ||
                  selectedTournamentPlayers.length > 8
                }
              >
                {t('Start Tournament')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
