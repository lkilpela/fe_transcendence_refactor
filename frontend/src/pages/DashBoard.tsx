import React, { useEffect } from 'react'
import { useAuth, useAvatar, useUserPlayers, useMatchHistories } from '@/hooks'
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
import { Avatar, AvatarInput } from '@/components/ui/AvatarMenu'
import { useNavigate } from 'react-router-dom'
import { foundation, layouts, components, patterns } from '@/assets/design-system'

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const { avatar, handleAvatarChange } = useAvatar(user?.id?.toString() || '')
  const { userPlayers, createPlayer, updatePlayer, deletePlayer } = useUserPlayers()
  const { matches } = useMatchHistories()
  const navigate = useNavigate()

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

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?query=${query}`)
    }
  }

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
              <AvatarInput onAvatarChange={handleAvatarChange}>
                <Avatar src={avatar} alt="User Avatar" size="md" />
              </AvatarInput>
              <button 
                onClick={logout} 
                className={`${components.button.base} ${components.button.sizes.sm} ${patterns.button.danger}`}
              >
                Logout
              </button>
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

export default Dashboard