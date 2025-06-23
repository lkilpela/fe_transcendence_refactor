import React from 'react'
import { patterns, foundation } from '@/assets/design-system'
import { Avatar } from '@/components/ui'

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
        <Avatar
          src={player?.avatar}
          alt={player?.name || defaultName}
          size="lg"
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
        <Avatar
          src={player?.avatar}
          alt={player?.name || defaultName}
          size="lg"
        />
      )}
    </div>
  )
})

PlayerInfo.displayName = 'PlayerInfo'
