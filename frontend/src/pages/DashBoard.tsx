import React, { useEffect } from 'react'
import { useAuth, useUserPlayers, useMatchHistories } from '@/hooks'
import { storage } from '@/utils/storage'
import { PageLayout } from '@/components/layout'
import {
  PlayerManagement,
  GameStats,
  MatchHistory,
  QuickPlay,
  TopPlayers,
} from '@/components/features/dashboard'
import { SearchBar } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { foundation, layouts, patterns } from '@/assets/design-system'

// Smart Primary Action Component
const SmartPrimaryAction: React.FC<{
  userPlayers: any[]
  onCreatePlayer: (name: string) => void
  onUpdatePlayer: (id: string, updates: any) => void
  onDeletePlayer: (id: string) => void
}> = ({ userPlayers, onCreatePlayer, onUpdatePlayer, onDeletePlayer }) => {
  const hasPlayers = userPlayers.length > 0
  const hasEnoughFor1v1 = userPlayers.length >= 2
  const hasEnoughForTournament = userPlayers.length >= 4

  if (!hasPlayers) {
    // No players - Show create player as primary action
    return (
      <div className="text-center space-y-6 py-8">
        <div className="space-y-3">
          <h2 className={foundation.typography.h2}>🎮 Ready to Play?</h2>
          <p className={foundation.typography.body}>
            Create your first player to start playing Pong!
          </p>
        </div>
        <PlayerManagement
          userPlayers={userPlayers}
          onCreatePlayer={onCreatePlayer}
          onUpdatePlayer={onUpdatePlayer}
          onDeletePlayer={onDeletePlayer}
        />
      </div>
    )
  }

  if (hasPlayers && !hasEnoughFor1v1) {
    // Has some players but not enough for 1v1
    return (
      <div className="space-y-6">
        <div className="text-center space-y-3 py-4">
          <h2 className={foundation.typography.h2}>🏓 Almost Ready!</h2>
          <p className={foundation.typography.body}>
            You have {userPlayers.length} player{userPlayers.length !== 1 ? 's' : ''}. 
            Create {2 - userPlayers.length} more to start playing!
          </p>
        </div>
        <div className={layouts.grid.twoColumn}>
          <QuickPlay userPlayers={userPlayers} />
          <PlayerManagement
            userPlayers={userPlayers}
            onCreatePlayer={onCreatePlayer}
            onUpdatePlayer={onUpdatePlayer}
            onDeletePlayer={onDeletePlayer}
          />
        </div>
      </div>
    )
  }

  // Has enough players - Show QuickPlay as primary action
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 py-4">
        <h2 className={foundation.typography.h2}>
          {hasEnoughForTournament ? '🏆 Tournament Ready!' : '🏓 Game Time!'}
        </h2>
        <p className={foundation.typography.body}>
          {hasEnoughForTournament 
            ? `${userPlayers.length} players ready - Start a match or tournament!`
            : `${userPlayers.length} players ready - Start a 1v1 match!`
          }
        </p>
      </div>
      <QuickPlay userPlayers={userPlayers} />
    </div>
  )
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const { userPlayers, createPlayer, updatePlayer, deletePlayer } = useUserPlayers()
  const { matches } = useMatchHistories()
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?query=${query}`)
    }
  }

  useEffect(() => {
    if (!user?.id) return

    const deleteUnfinishedMatches = async () => {
      try {
          const token = storage.get('token', null)
          await fetch(`${import.meta.env.VITE_API_URL || 'https://localhost:3001'}/match-histories`, {
            method: 'DELETE',
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          })
      } catch (error) {
          console.error('Error deleting unfinished matches:', error)
      }
    }
    deleteUnfinishedMatches()
  }, [user?.id])

  if (!user?.username) {
    return (
      <PageLayout
        showSidebar={true}
        showHeader={true}
        showFooter={true}
        background="primary"
      >
        <div className={foundation.typography.body}>
          Please log in to view the dashboard
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      showSidebar={true}
      showHeader={true}
      showFooter={true}
      background="primary"
    >
      <div className={layouts.hero.section}>
        <div className={layouts.hero.container}>
          {/* Header */}
          <div className={layouts.grid.header}>
            <h1 className={foundation.typography.h1}>
              Welcome back, {user.username}!
            </h1>
            <div className={patterns.flex.rowGap.lg}>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Main Content - Smart Adaptive Layout */}
          <div className={patterns.spacing.stack.xl}>
            
            {/* Smart Primary Action - Adapts based on player count */}
            <SmartPrimaryAction
              userPlayers={userPlayers}
              onCreatePlayer={createPlayer}
              onUpdatePlayer={updatePlayer}
              onDeletePlayer={deletePlayer}
            />

            {/* Secondary Info - Only show if user has played games */}
            {matches.length > 0 && (
              <div className={layouts.grid.twoColumn}>
                <MatchHistory matches={matches as any} />
                <TopPlayers players={userPlayers as any} />
              </div>
            )}

            {/* Tertiary Actions - Only show if user has players */}
            {userPlayers.length > 0 && (
              <details className="mt-8">
                <summary className="cursor-pointer text-lg font-semibold text-white hover:text-blue-400 transition-colors mb-4">
                  📊 View Detailed Stats
                </summary>
                <div className={patterns.spacing.stack.lg}>
                  <GameStats userPlayers={userPlayers as any} />
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
