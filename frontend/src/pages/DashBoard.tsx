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
              Welcome to Dashboard
            </h1>
            <div className={patterns.flex.rowGap.lg}>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className={patterns.spacing.stack.xl}>
            {/* Quick Play & Player Management */}
            <div className={layouts.grid.twoColumn}>
              <QuickPlay userPlayers={userPlayers} />
              <PlayerManagement
                userPlayers={userPlayers}
                onCreatePlayer={createPlayer}
                onUpdatePlayer={updatePlayer}
                onDeletePlayer={deletePlayer}
              />
            </div>

            {/* Stats & Match History */}
            <div className={layouts.grid.twoColumn}>
              <GameStats userPlayers={userPlayers} />
              <MatchHistory matches={matches} />
            </div>

            {/* Top Players */}
            <div className={patterns.spacing.section}>
              <TopPlayers players={userPlayers} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
