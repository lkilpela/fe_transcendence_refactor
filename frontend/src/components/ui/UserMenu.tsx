import React from 'react'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { patterns } from '@/assets/design-system'

export const UserMenu: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (!user) return null

  return (
    <div className={patterns.userMenu.container}>
      <span className={patterns.userMenu.username}>{user.username}</span>
      <button
        onClick={handleLogout}
        className={patterns.userMenu.logoutButton}
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  )
} 