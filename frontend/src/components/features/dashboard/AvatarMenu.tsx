import React, { useState, useRef, useEffect } from 'react'
import { LogOut, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useTranslate from '@/hooks/useTranslate'
import { patterns } from '@/assets/design-system'
import { Avatar } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { API_URL, DEFAULT_AVATAR } from '@/utils/constants'

interface AvatarMenuProps {
  onLogout: () => void
}

export const AvatarMenu: React.FC<AvatarMenuProps> = ({
  onLogout,
}) => {
  const navigate = useNavigate()
  const t = useTranslate()
  const { user } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Process avatar URL - handle relative paths
  const getAvatarUrl = () => {
    if (!user?.avatar_url) return DEFAULT_AVATAR
    
    // If it's a relative uploads path, prefix with API_URL
    if (user.avatar_url.startsWith('/uploads/')) {
      return `${API_URL}${user.avatar_url}`
    }
    
    return user.avatar_url
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setShowDropdown(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false)
    }, 150) // Small delay to allow moving to dropdown
  }

  const handleProfileClick = () => {
    setShowDropdown(false)
    navigate(`/profile/${user?.id}`)
  }

  const handleSettingsClick = () => {
    setShowDropdown(false)
    navigate('/settings')
  }

  const handleLogoutClick = () => {
    setShowDropdown(false)
    onLogout()
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div 
      className={patterns.avatarMenu.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Avatar Trigger - Always visible */}
      <div className={patterns.avatarMenu.trigger}>
        <Avatar 
          src={getAvatarUrl()}
          alt="User avatar" 
          size="lg"
        />
        <div className={`${patterns.status.base} ${patterns.status.variants.online}`} />
      </div>
      
      {/* Dropdown Menu - Controlled by JavaScript state */}
      {showDropdown && (
        <div className={patterns.avatarMenu.dropdown}>
          {/* Menu Options */}
          <div className={patterns.avatarMenu.menu.container}>
            <button 
              className={patterns.avatarMenu.menu.item}
              onClick={handleProfileClick}
            >
              <User size={16} />
              <span>{t('Profile')}</span>
            </button>
            
            <button 
              className={patterns.avatarMenu.menu.item}
              onClick={handleSettingsClick}
            >
              <Settings size={16} />
              <span>{t('Settings')}</span>
            </button>
            
            <button 
              className={patterns.avatarMenu.menu.itemDanger}
              onClick={handleLogoutClick}
            >
              <LogOut size={16} />
              <span>{t('Sign Out')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
