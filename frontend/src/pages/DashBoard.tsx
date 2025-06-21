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
import { UserPlayer } from '@/types'

// Types for clean interfaces
interface PlayerActions {
  onCreatePlayer: (name: string) => void
  onUpdatePlayer: (id: string, updates: Partial<UserPlayer>) => void
  onDeletePlayer: (id: string) => void
}

interface SmartPrimaryActionProps extends PlayerActions {
  userPlayers: UserPlayer[]
}

// Extracted header component for reusability
const DashboardHeader: React.FC<{
  title: string
  subtitle: string
}> = ({ title, subtitle }) => (
  <div className={patterns.spacing.stack.sm}>
    <h2 className={foundation.typography.h2}>{title}</h2>
    <p className={foundation.typography.body}>{subtitle}</p>
  </div>
)

// Clean Smart Primary Action Component
const SmartPrimaryAction: React.FC<SmartPrimaryActionProps> = ({
  userPlayers,
  onCreatePlayer,
  onUpdatePlayer,
  onDeletePlayer
}) => {
  const playerCount = userPlayers.length
  const hasPlayers = playerCount > 0
  const hasEnoughFor1v1 = playerCount >= 2
  const hasEnoughForTournament = playerCount >= 4

  // Common player management props
  const playerManagementProps = {
    userPlayers,
    onCreatePlayer,
    onUpdatePlayer,
    onDeletePlayer
  }

  // State 1: No players
  if (!hasPlayers) {
    return (
      <div className={patterns.align.center}>
        <div className={patterns.spacing.stack.lg}>
          <DashboardHeader
            title="🎮 Ready to Play?"
            subtitle="Create your first player to start playing Pong!"
          />
          <PlayerManagement {...playerManagementProps} />
        </div>
      </div>
    )
  }

  // State 2: Not enough players for 1v1
  if (!hasEnoughFor1v1) {
    const playersNeeded = 2 - playerCount
    return (
      <div className={patterns.spacing.stack.lg}>
        <div className={patterns.align.center}>
          <DashboardHeader
            title="🏓 Almost Ready!"
            subtitle={`You have ${playerCount} player${playerCount !== 1 ? 's' : ''}. Create ${playersNeeded} more to start playing!`}
          />
        </div>
        <div className={layouts.grid.twoColumn}>
          <QuickPlay userPlayers={userPlayers} />
          <PlayerManagement {...playerManagementProps} />
        </div>
      </div>
    )
  }

  // State 3: Ready to play
  const title = hasEnoughForTournament ? '🏆 Tournament Ready!' : '🏓 Game Time!'
  const subtitle = hasEnoughForTournament 
    ? `${playerCount} players ready - Start a match or tournament!`
    : `${playerCount} players ready - Start a 1v1 match!`

  return (
    <div className={patterns.spacing.stack.lg}>
      <div className={patterns.align.center}>
        <DashboardHeader title={title} subtitle={subtitle} />
      </div>
      
      <QuickPlay userPlayers={userPlayers} />
      
      <PlayerManagement {...playerManagementProps} />
    </div>
  )
}

// Clean up the main Dashboard component
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

  // Extract cleanup logic to separate function
  const cleanupUnfinishedMatches = async () => {
    if (!user?.id) return

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

  useEffect(() => {
    cleanupUnfinishedMatches()
  }, [user?.id])

  // Early return for unauthenticated state
  if (!user?.username) {
    return (
      <PageLayout showSidebar showHeader showFooter background="primary">
        <div className={foundation.typography.body}>
          Please log in to view the dashboard
        </div>
      </PageLayout>
    )
  }

  const hasMatches = matches.length > 0
  const hasPlayers = userPlayers.length > 0

  return (
    <PageLayout showSidebar showHeader showFooter background="primary">
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

          {/* Main Content */}
          <div className={patterns.spacing.stack.xl}>
            
            {/* Smart Primary Action */}
            <SmartPrimaryAction
              userPlayers={userPlayers}
              onCreatePlayer={createPlayer}
              onUpdatePlayer={updatePlayer}
              onDeletePlayer={deletePlayer}
            />

                         {/* Secondary Info - Conditional rendering */}
             {hasMatches && (
               <div className={layouts.grid.twoColumn}>
                 <MatchHistory matches={matches as any} />
                 <TopPlayers players={userPlayers as any} />
               </div>
             )}

             {/* Tertiary Actions - Detailed Stats */}
             {hasPlayers && (
               <details className={patterns.spacing.section}>
                 <summary className={patterns.button.back}>
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
