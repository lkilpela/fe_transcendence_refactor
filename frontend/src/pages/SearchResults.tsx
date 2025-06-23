import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Card, Avatar, Button } from '@/components/ui'
import PageLayout from '@/components/layout/PageLayout'
import { request } from '@/services/api'
import { User } from '@/types'
import { foundation, layouts, patterns } from '@/assets/design-system'
import { Search, UserPlus, Users } from 'lucide-react'

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const query = searchParams.get('query') || ''

  useEffect(() => {
    const searchUsers = async () => {
      if (!query.trim()) return

      setIsLoading(true)
      try {
        // You'll need to create this endpoint in your backend
        const response = await request<User[]>(`/users/search?query=${encodeURIComponent(query)}`)
        setUsers(response || [])
      } catch (error) {
        console.error('Error searching users:', error)
        setUsers([])
      } finally {
        setIsLoading(false)
      }
    }

    searchUsers()
  }, [query])

  const handleViewProfile = (userId: number) => {
    navigate(`/profile/${userId}`)
  }

  if (isLoading) {
    return (
      <PageLayout showSidebar showHeader showFooter background="primary" isLoading>
        <div className={foundation.typography.body}>
          Searching for users...
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout showSidebar showHeader showFooter background="primary">
      <div className={layouts.hero.container}>
        <div className={patterns.spacing.stack.xl}>
          {/* Search Header */}
          <Card variant="glass" padding="lg">
            <div className={patterns.flex.rowGap.md}>
              <Search className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <h1 className={foundation.typography.h1}>
                  Search Results
                </h1>
                {query && (
                  <p className={foundation.typography.body}>
                    Found {users.length} result{users.length !== 1 ? 's' : ''} for "{query}"
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Search Results */}
          <Card variant="glass" padding="lg">
            {users.length > 0 ? (
              <div className={patterns.spacing.stack.md}>
                <div className={patterns.flex.rowGap.sm}>
                  <Users className="w-5 h-5 text-gray-400" />
                  <h2 className={foundation.typography.h3}>Users</h2>
                </div>
                
                <div className={patterns.spacing.section}>
                  {users.map((user) => (
                    <UserSearchCard 
                      key={user.id} 
                      user={user} 
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              </div>
            ) : query ? (
              <EmptyState 
                icon={<Search className="w-12 h-12 text-gray-400" />}
                title="No users found"
                description={`No users found for "${query}"`}
                subtitle="Try searching with a different username"
              />
            ) : (
              <EmptyState 
                icon={<Users className="w-12 h-12 text-gray-400" />}
                title="Start your search"
                description="Enter a search term to find users"
                subtitle="Use the search bar in the dashboard to get started"
              />
            )}
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}

// Reusable UserSearchCard component
interface UserSearchCardProps {
  user: User
  onViewProfile: (userId: number) => void
}

const UserSearchCard: React.FC<UserSearchCardProps> = ({ user, onViewProfile }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <div className={patterns.flex.rowGap.md}>
        <div className="relative">
          <Avatar 
            src={user.avatar_url || '/placeholder-avatar.png'} 
            alt={user.username} 
            size="lg"
          />
          {user.online_status !== undefined && (
            <div className={`${patterns.status.base} ${patterns.status.variants[user.online_status ? 'online' : 'offline']}`} />
          )}
        </div>
        
        <div className={patterns.spacing.stack.sm}>
          <div>
            <h3 className={foundation.typography.medium}>{user.username}</h3>
            <p className={foundation.typography.small}>
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
      
      <Button 
        variant="primary" 
        onClick={() => onViewProfile(user.id)}
        className="flex items-center gap-2 flex-shrink-0"
      >
        <UserPlus className="w-4 h-4" />
        View Profile
      </Button>
    </div>
  )
}

// Reusable EmptyState component
interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  subtitle?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, subtitle }) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className={foundation.typography.h3}>{title}</h3>
      <p className={foundation.typography.body}>{description}</p>
      {subtitle && (
        <p className={foundation.typography.small}>{subtitle}</p>
      )}
    </div>
  )
}

export default SearchResults 