import type { FriendRequestMessage, FriendStatusResponse, User } from '@/types'
import { request } from './api'

/**
 * Friend Service
 * Handles all friend-related API operations
 */
export const friendService = {
  /**
   * Get friend status between current user and another user
   * @param userId - The ID of the user to check friendship status with
   * @returns Promise with friend status data
   */
  async getFriendStatus(userId: number): Promise<FriendStatusResponse> {
    return request<FriendStatusResponse>(`/friends/${userId}/status`)
  },

  /**
   * Send a friend request to another user
   * @param userId - The ID of the user to send friend request to
   * @returns Promise with friend request data
   */
  async sendFriendRequest(userId: number): Promise<FriendRequestMessage> {
    return request<FriendRequestMessage>(`/friend-requests/${userId}`, {
      method: 'POST',
    })
  },

  /**
   * Accept a friend request from another user
   * @param userId - The ID of the user whose friend request to accept
   * @returns Promise with updated friend data
   */
  async acceptFriendRequest(userId: number): Promise<FriendRequestMessage> {
    return request<FriendRequestMessage>(`/friend-requests/${userId}`, {
      method: 'PATCH',
    })
  },

  /**
   * Remove a friend or deny a friend request
   * @param userId - The ID of the user to remove/deny
   * @returns Promise with deletion confirmation
   */
  async removeFriend(userId: number): Promise<{ message: string }> {
    return request<{ message: string }>(`/friends/${userId}`, {
      method: 'DELETE',
    })
  },

  /**
   * Get all friends of the current user
   * @returns Promise with list of friends
   */
  async getFriends(): Promise<{ friends: User[] }> {
    return request<{ friends: User[] }>('/friends')
  },
}
