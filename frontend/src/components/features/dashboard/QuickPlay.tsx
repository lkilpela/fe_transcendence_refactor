import React from 'react'
import { Card, Button, Input } from '@/components/ui'
import { cn } from '@/utils/cn'
import { foundation } from '@/assets/design-system'
import { UserPlayer } from '@/types'

interface QuickPlayProps {
  userPlayers: UserPlayer[]
  onStartGame: () => void
  onJoinGame: (gameId: string) => void
  className?: string
}

const QuickPlay: React.FC<QuickPlayProps> = ({
  userPlayers,
  onStartGame,
  onJoinGame,
  className,
}) => {
  const [gameId, setGameId] = React.useState('')

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault()
    if (gameId.trim()) {
      onJoinGame(gameId.trim())
      setGameId('')
    }
  }

  return (
    <Card variant="glass" padding="lg" className={className}>
      <h2 className={foundation.typography.h3}>Quick Play</h2>
      
      <div className="mt-6 space-y-4">
        <Button
          onClick={onStartGame}
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!userPlayers.length}
        >
          Start New Game
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className={cn('w-full border-t', foundation.glass.light)} />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={cn('px-2', foundation.typography.small)}>or</span>
          </div>
        </div>

        <form onSubmit={handleJoinGame}>
          <div className="flex gap-2">
            <Input
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="Enter game ID"
              size="md"
            />
            <Button
              type="submit"
              variant="ghost"
              size="md"
            >
              Join Game
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}

export default QuickPlay 