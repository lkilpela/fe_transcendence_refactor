import { layouts } from '@/assets/design-system'
import { AvatarMenu } from '@/components/features/dashboard'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
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
        <div className="absolute right-0">
          <AvatarMenu onLogout={handleLogout} />
        </div>
      </div>
    </header>
  )
}

export default Header
