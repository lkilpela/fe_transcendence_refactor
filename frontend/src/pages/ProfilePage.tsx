import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Avatar } from '@/components/ui'
import { PageLayout } from '@/components/layout'
import { FriendStatusButton, UserPlayers, ProfileMatchHistory } from '@/components/features/profile'
import { request } from '@/services/api'
import { User } from '@/types'
import { foundation, layouts, patterns } from '@/assets/design-system'
import { storage } from '@/utils/storage'

/**
 * ProfilePage Component
 * 
 * Features:
 * - Clean layout using PageLayout with sidebar, header, and footer
 * - Consistent styling with design system patterns
 * - User profile header with avatar, online status, and friend actions
 * - Two-column layout with UserPlayers and ProfileMatchHistory
 * - Responsive design for mobile and desktop
 * - Loading and error states
 * - Own profile detection
 */

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) return

      try {
        const response = await request<User>(`/users/${id}`)
        setUser(response)
        
        const currentUser = storage.get('user', null) as User | null
        if (currentUser && currentUser.username === response.username) {
          setIsOwnProfile(true)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUserProfile()
  }, [id])

    if (isLoading) {
    return (
      <PageLayout showSidebar showHeader showFooter background="primary" isLoading>
        <div className={foundation.typography.body}>Loading profile...</div>
      </PageLayout>
    )
  }

  if (!user) {
    return (
      <PageLayout showSidebar showHeader showFooter background="primary">
        <div className={layouts.hero.container}>
          <Card variant="glass" padding="lg" className="text-center">
            <h1 className={foundation.typography.h2}>User Not Found</h1>
            <p className={foundation.typography.body}>
              We couldn't find the profile you're looking for.
            </p>
          </Card>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout showSidebar showHeader showFooter background="primary">
      <div className={layouts.hero.container}>
        <div className={patterns.spacing.stack.xl}>
          {/* Profile Header */}
          <Card variant="glass" padding="lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className={patterns.flex.rowGap.lg}>
                <div className="relative">
                  <Avatar 
                    src={user.avatar_url || '/placeholder-avatar.png'} 
                    alt={user.username} 
                    size="xl"
                  />
                  {user.online_status !== undefined && (
                    <div className={`${patterns.status.base} ${patterns.status.variants[user.online_status ? 'online' : 'offline']}`} />
                  )}
                </div>
                
                <div className={patterns.spacing.stack.sm}>
                  <div>
                    <h1 className={foundation.typography.h1}>
                      {user.username}
                    </h1>
                    <p className={foundation.typography.body}>
                      Member since {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                  
                  {user.online_status !== undefined && (
                    <div className={patterns.flex.rowGap.sm}>
                      <div className={`w-2 h-2 rounded-full ${user.online_status ? 'bg-green-400' : 'bg-gray-400'}`} />
                      <span className={foundation.typography.small}>
                        {user.online_status ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {!isOwnProfile && (
                <div className="flex-shrink-0">
                  <FriendStatusButton user={user} />
                </div>
              )}
            </div>
          </Card>

          {/* Profile Content */}
          <div className={layouts.grid.twoColumn}>
            <div className={patterns.spacing.stack.lg}>
              <UserPlayers userId={user.id} />
            </div>
            
            <div className={patterns.spacing.stack.lg}>
              <ProfileMatchHistory userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
