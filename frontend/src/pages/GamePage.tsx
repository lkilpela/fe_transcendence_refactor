import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { PageLayout } from '@/components/layout'
import { patterns, foundation, layouts } from '@/assets/design-system'
import { Pong, PlayerInfo } from '@/components/features/game'
import useTranslate from '@/hooks/useTranslate'
import { useGameState } from '@/hooks/useGameState'
import { GameState } from '@/types'
import { GAME_CONSTANTS } from '@/utils/constants'

export const GamePage: React.FC = () => {
  const location = useLocation()
  const gameState = location.state as GameState
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const t = useTranslate()

  const {
    scores,
    matchStatus,
    matchResult,
    gameStarted,
    handleMatchEnd,
    handleMatchStatusChange,
    setScores
  } = useGameState()

  const getMatchTypeDisplay = () => {
    if (gameState?.matchType === 'final') return t('matchType.final')
    if (gameState?.matchType === '1v1') return t('matchType.1v1')
    return `SEMIFINAL ${gameState?.matchId || 1}`
  }

  return (
    <PageLayout
      showHeader={true}
      showFooter={false}
      showPongBackground={true}
      background="primary"
    >
      <div className={layouts.hero.section}>
        <div className={layouts.hero.container}>
          {/* Game Header with Player Info */}
          <div className={patterns.game.header.container}>
            <PlayerInfo
              player={gameState?.player1}
              score={scores.player1}
              controls={t(GAME_CONSTANTS.CONTROLS.PLAYER1)}
              defaultName="Player 1"
            />

            {/* Match Info */}
            <div className={patterns.game.header.matchInfo}>
              <span className={foundation.typography.h3}>
                {getMatchTypeDisplay()}
              </span>
              <span className={foundation.typography.small}>
                {GAME_CONSTANTS.MESSAGES.FIRST_TO_POINTS(GAME_CONSTANTS.MAX_SCORE)}
              </span>
            </div>

            <PlayerInfo
              player={gameState?.player2}
              score={scores.player2}
              controls={t(GAME_CONSTANTS.CONTROLS.PLAYER2)}
              defaultName="Player 2"
              isRightAligned={true}
            />
          </div>

          {/* Game Canvas Container */}
          <div className={patterns.game.canvas.wrapper}>
            <canvas
              ref={canvasRef}
              width={GAME_CONSTANTS.CANVAS.WIDTH}
              height={GAME_CONSTANTS.CANVAS.HEIGHT}
              className={patterns.game.canvas.element}
            />

            {/* Game Start Message */}
            {matchStatus === 'in_progress' && !gameStarted && (
              <div className={patterns.game.canvas.message.status}>
                <span className={foundation.typography.h2}>
                  {t(GAME_CONSTANTS.MESSAGES.SPACEBAR_TO_START)}
                </span>
              </div>
            )}

            {/* Match Result Message */}
            {matchResult && (
              <div className={patterns.game.canvas.message.result}>
                <span className={foundation.typography.h2}>{matchResult}</span>
                <span className={foundation.typography.body}>
                  {t(GAME_CONSTANTS.MESSAGES.RETURNING_TO_LOBBY)}
                </span>
              </div>
            )}
          </div>

          {/* Game Logic Component */}
          <Pong
            canvasRef={canvasRef}
            onMatchEnd={handleMatchEnd}
            onScoreUpdate={setScores}
            onMatchStatusChange={handleMatchStatusChange}
          />
        </div>
      </div>
    </PageLayout>
  )
}
