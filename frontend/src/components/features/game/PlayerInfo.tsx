import React from 'react'
import { patterns, foundation } from '@/assets/design-system'

interface PlayerInfoProps {
  player: { name: string; avatar: string; id: number } | undefined
  score: number
  controls: string
  defaultName: string
  isRightAligned?: boolean
}

export const PlayerInfo: React.FC<PlayerInfoProps> = React.memo(({ 
  player, 
  score, 
  controls, 
  defaultName, 
  isRightAligned = false 
}) => {
  return (
    <div className={patterns.game.header.player.container}>
      {!isRightAligned && (
        <img
          src={player?.avatar}
          alt={player?.name}
          className={patterns.avatar.lg}
        />
      )}
      <div className={patterns.game.header.player.info(isRightAligned)}>
        <span className={foundation.typography.label}>
          {player?.name || defaultName}
        </span>
        <span className={foundation.typography.h2}>{score}</span>
        <span className={foundation.typography.small}>{controls}</span>
      </div>
      {isRightAligned && (
        <img
          src={player?.avatar}
          alt={player?.name}
          className={patterns.avatar.lg}
        />
      )}
    </div>
  )
})

PlayerInfo.displayName = 'PlayerInfo'
