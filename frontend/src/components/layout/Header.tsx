import { layouts } from '@/assets/design-system'
import { useAuth } from '@/hooks/useAuth'
import { LogOut } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async (): Promise<void> => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className={layouts.header.base}>
      <div className={layouts.header.container}>
        <h1 className={layouts.header.title}>Ping.Pong.Play!</h1>
        <div className={layouts.header.userSection}>
          <span className={layouts.header.username}>
            {user?.username || 'User'}
          </span>
          <button 
            onClick={handleLogout}
            className={layouts.header.logoutButton}
            type="button"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
