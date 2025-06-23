import React, { useState, useEffect } from 'react'
import { friendService } from '@/services'
import { SessionExpiredError } from '@/services'
import { Button, Card } from '@/components/ui'
import type { User, FriendStatus } from '@/types'
import { foundation, patterns } from '@/assets/design-system'
import { UserCheck, UserPlus, UserX, Clock, Users } from 'lucide-react'

interface FriendStatusButtonProps {
  user: User
}

export const FriendStatusButton: React.FC<FriendStatusButtonProps> = ({ user }) => {
  const [friendStatus, setFriendStatus] = useState<FriendStatus>('none')
  const [sendFriendRequest, setSendFriendRequest] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchFriendStatus = async () => {
      setIsLoading(true)
      try {
        const response = await friendService.getFriendStatus(user.id)
        setFriendStatus(response.item.status)
        // If the status is pending and the friend_id matches the user id, 
        // it means current user sent the request
        if (response.item.status === 'pending' && response.item.friend_id === user.id) {
          setSendFriendRequest(true)
        }
      } catch (error) {
        if (error instanceof SessionExpiredError) {
          // Session expired error is handled by the API service
          return
        }
        // If it's a 404 error or "Friendship not found", set status to 'none'
        if (error instanceof Error && (
          error.message.includes('404') || 
          error.message.includes('Friendship not found')
        )) {
          setFriendStatus('none')
          setSendFriendRequest(false)
        } else {
          console.error('Error fetching friend status:', error)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchFriendStatus()
  }, [user.id])

  const handleAddFriend = async () => {
    setIsLoading(true)
    try {
      await friendService.sendFriendRequest(user.id)
      setFriendStatus('pending')
      setSendFriendRequest(true)
    } catch (error) {
      if (error instanceof SessionExpiredError) {
        return
      }
      console.error('Error sending friend request:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFriend = async () => {
    setIsLoading(true)
    try {
      await friendService.removeFriend(user.id)
      setFriendStatus('none')
      setSendFriendRequest(false)
    } catch (error) {
      if (error instanceof SessionExpiredError) {
        return
      }
      console.error('Error removing friend:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcceptFriend = async () => {
    setIsLoading(true)
    try {
      await friendService.acceptFriendRequest(user.id)
      setFriendStatus('accepted')
    } catch (error) {
      if (error instanceof SessionExpiredError) {
        return
      }
      console.error('Error accepting friend request:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card variant="glass" padding="md" className="max-w-sm">
      <div className={patterns.spacing.stack.md}>
        
        {/* Friend Status Info */}
        {friendStatus === 'accepted' && (
          <div className={patterns.flex.rowGap.sm}>
            <Users className="w-4 h-4 text-green-400" />
            <span className={foundation.typography.small}>
              Status: {user.online_status === true ? (
                <span className="text-green-400">Online</span>
              ) : (
                <span className="text-gray-400">Offline</span>
              )}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className={patterns.spacing.stack.sm}>
          
          {/* Friends - Show Remove Button */}
          {friendStatus === 'accepted' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFriend}
              disabled={isLoading}
              isLoading={isLoading}
              className={patterns.friendButton.remove}
            >
              <UserX className="w-4 h-4" />
              Remove Friend
            </Button>
          )}

          {/* Pending - Current user sent request */}
          {friendStatus === 'pending' && sendFriendRequest === true && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFriend}
              disabled={isLoading}
              isLoading={isLoading}
              className={patterns.friendButton.cancel}
            >
              <Clock className="w-4 h-4" />
              Cancel Friend Request
            </Button>
          )}

          {/* Pending - Received request (need to accept/deny) */}
          {friendStatus === 'pending' && sendFriendRequest === false && (
            <div className={patterns.flex.rowGap.sm}>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAcceptFriend}
                disabled={isLoading}
                isLoading={isLoading}
                className={patterns.friendButton.accept}
              >
                <UserCheck className="w-4 h-4" />
                Accept
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFriend}
                disabled={isLoading}
                className={patterns.friendButton.deny}
              >
                <UserX className="w-4 h-4" />
                Deny
              </Button>
            </div>
          )}

          {/* No relationship - Show Add Friend */}
          {friendStatus === 'none' && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddFriend}
              disabled={isLoading}
              isLoading={isLoading}
              className={patterns.friendButton.add}
            >
              <UserPlus className="w-4 h-4" />
              Add Friend
            </Button>
          )}

        </div>
      </div>
    </Card>
  )
}
