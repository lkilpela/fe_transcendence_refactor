import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { request } from '@/services/api'
import { User } from '@/types'
import { foundation } from '@/assets/design-system'

interface FriendStatus {
  status: 'none' | 'pending' | 'accepted'
  friend_id?: number
}

interface FriendStatusButtonProps {
  user: User
}

export const FriendStatusButton: React.FC<FriendStatusButtonProps> = ({ user }) => {
  const [friendStatus, setFriendStatus] = useState<'none' | 'pending' | 'accepted'>('none')
  const [sendFriendRequest, setSendFriendRequest] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchFriendStatus = async () => {
      try {
        const response = await request<{ item: FriendStatus }>(`/friends/${user.id}/status`)
        setFriendStatus(response.item.status)
        if (response.item.status === 'pending' && response.item.friend_id === user.id) {
          setSendFriendRequest(true)
        }
      } catch (error: any) {
        if (error.message?.includes('404')) {
          // No friendship exists
          setFriendStatus('none')
          setSendFriendRequest(false)
        } else {
          console.error('Error fetching friend status:', error)
        }
      }
    }
    fetchFriendStatus()
  }, [user.id])

  const handleAddFriend = async () => {
    setIsLoading(true)
    try {
      await request(`/friend-requests/${user.id}`, { method: 'POST' })
      setFriendStatus('pending')
      setSendFriendRequest(true)
    } catch (error) {
      console.error('Error sending friend request:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFriend = async () => {
    setIsLoading(true)
    try {
      await request(`/friends/${user.id}`, { method: 'DELETE' })
      setFriendStatus('none')
      setSendFriendRequest(false)
    } catch (error) {
      console.error('Error removing friend:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcceptFriend = async () => {
    setIsLoading(true)
    try {
      await request(`/friend-requests/${user.id}`, { method: 'PATCH' })
      setFriendStatus('accepted')
    } catch (error) {
      console.error('Error accepting friend request:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {friendStatus === 'accepted' && (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${user.online_status ? 'bg-green-400' : 'bg-gray-400'}`} />
          <span className={foundation.typography.small}>
            {user.online_status ? 'Online' : 'Offline'}
          </span>
        </div>
      )}
      
      <div className="flex gap-2">
        {friendStatus === 'accepted' && (
          <Button 
            variant="ghost" 
            onClick={handleRemoveFriend}
            isLoading={isLoading}
            className="text-red-400 hover:text-red-300"
          >
            Remove Friend
          </Button>
        )}
        
        {friendStatus === 'pending' && sendFriendRequest && (
          <Button 
            variant="ghost" 
            onClick={handleRemoveFriend}
            isLoading={isLoading}
            className="text-red-400 hover:text-red-300"
          >
            Cancel Request
          </Button>
        )}
        
        {friendStatus === 'pending' && !sendFriendRequest && (
          <>
            <Button 
              variant="primary" 
              onClick={handleAcceptFriend}
              isLoading={isLoading}
            >
              Accept Friend Request
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleRemoveFriend}
              isLoading={isLoading}
              className="text-red-400 hover:text-red-300"
            >
              Deny Request
            </Button>
          </>
        )}
        
        {friendStatus === 'none' && (
          <Button 
            variant="primary" 
            onClick={handleAddFriend}
            isLoading={isLoading}
          >
            Add Friend
          </Button>
        )}
      </div>
    </div>
  )
}

export default FriendStatusButton 