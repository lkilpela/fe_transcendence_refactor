import React from 'react'
// import { useAuth, useAvatar, useUserPlayers, useMatchHistories } from '@/hooks'
import { PageLayout } from '@/components/layout'
import {
  PlayerManagement,
  GameStats,
  MatchHistory,
  QuickPlay,
  TopPlayers,
} from '@/components/features/dashboard'
import { SearchBar, AvatarMenu } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { foundation, layouts } from '@/assets/design-system'
import { cn } from '@/utils/cn'
// import { request } from '@/services'

const Dashboard: React.FC = () => {
  // const { user, logout } = useAuth()
  // const { avatar, handleAvatarChange } = useAvatar(user?.id?.toString() || '')
  // const { userPlayers, createPlayer, updatePlayer, deletePlayer } = useUserPlayers()
  // const { matches } = useMatchHistories()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!user?.id) return

  //   const deleteUnfinishedMatches = async () => {
  //     try {
  //         await request<{ message: string }>('/match-histories', {
  //           method: 'DELETE'
  //         })
  //     } catch (error) {
  //         console.error('Error deleting unfinished matches:', error)
  //     }
  //   }
  //   deleteUnfinishedMatches()
  // }, [user?.id])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?query=${query}`)
    }
  }

  // if (!user?.username) {
  //   return (
  //     <PageLayout
  //       showSidebar={true}
  //       showHeader={true}
  //       showFooter={true}
  //       background="primary"
  //     >
  //       <div className={cn(foundation.typography.body, layouts.hero.section)}>
  //         Please log in to view the dashboard
  //       </div>
  //     </PageLayout>
  //   )
  // }

  return (
    <PageLayout
      showSidebar={true}
      showHeader={true}
      showFooter={true}
      background="primary"
    >
      <div className={layouts.hero.section}>
        <div className={layouts.hero.container}>
          <div className={layouts.grid.header}>
            <h1 className={cn(foundation.typography.h1, layouts.hero.title)}>
              Welcome to Dashboard
            </h1>
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className={layouts.grid.twoColumn}>
            <PlayerManagement
              userPlayers={[]}
              onCreatePlayer={() => {}}
              onUpdatePlayer={() => {}}
              onDeletePlayer={() => {}}
            />

            <QuickPlay userPlayers={[]} />
          </div>

          <div className={layouts.grid.twoColumnWithMargin}>
            <GameStats userPlayers={[]} />
            <MatchHistory matches={[]} />
          </div>

          <div className="mt-6">
            <TopPlayers players={[]} />
          </div>

          <div className="mt-6">
            <AvatarMenu
              avatar=""
              onAvatarChange={() => {}}
              onLogout={() => {}}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Dashboard