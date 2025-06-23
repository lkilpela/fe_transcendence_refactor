import React from 'react'
import { useParams } from 'react-router-dom'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useAuth } from '@/hooks/useAuth'
import { PageLayout } from '@/components/layout'
import { FriendStatusButton, UserPlayers, ProfileMatchHistory } from '@/components/features/profile'
import { foundation, layouts, patterns } from '@/assets/design-system'
import { cn } from '@/utils/cn'

export const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { user: currentUser } = useAuth()
  const { user, isLoading, error } = useUserProfile(id)

  // Determine if this is the current user's own profile
  const isOwnProfile = currentUser?.id === user?.id

  if (isLoading) {
    return (
      <PageLayout 
        showSidebar 
        showHeader 
        showFooter 
        background="primary"
        isLoading={true}
      >
        <div className={foundation.typography.body}>Loading profile...</div>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout 
        showSidebar 
        showHeader 
        showFooter 
        background="primary"
      >
        <div className={layouts.hero.section}>
          <div className={layouts.hero.container}>
            <h1 className={cn(foundation.typography.h1, layouts.hero.title)}>
              Error loading profile
            </h1>
            <p className={cn(foundation.typography.body, layouts.hero.subtitle)}>
              {error}
            </p>
          </div>
        </div>
      </PageLayout>
    )
  }

  if (!user) {
    return (
      <PageLayout 
        showSidebar 
        showHeader 
        showFooter 
        background="primary"
      >
        <div className={layouts.hero.section}>
          <div className={layouts.hero.container}>
            <h1 className={cn(foundation.typography.h1, layouts.hero.title)}>
              User not found
            </h1>
            <p className={cn(foundation.typography.body, layouts.hero.subtitle)}>
              We couldn't find the user you're looking for.
            </p>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout 
      showSidebar 
      showHeader 
      showFooter 
      background="primary"
    >
      <div className={layouts.hero.section}>
        <div className={layouts.hero.container}>
          {/* Profile Header */}
          <div className={layouts.grid.header}>
            <h1 className={foundation.typography.h1}>
              {isOwnProfile ? 'Your Profile' : `${user.username}'s Profile`}
            </h1>
            
            {/* Friend Status Button for non-own profiles */}
            {!isOwnProfile && (
              <div className={patterns.flex.rowGap.sm}>
                <FriendStatusButton user={user} />
              </div>
            )}
          </div>

          {/* Main Profile Content */}
          <div className={patterns.spacing.stack.xl}>
            
            {/* User Players Section */}
            <div className={patterns.spacing.section}>
              <UserPlayers userId={user.id} />
            </div>
            
            {/* Match History Section */}
            <div className={patterns.spacing.section}>
              <ProfileMatchHistory userId={user.id} />
            </div>
            
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default ProfilePage