import React from 'react'
import { LogOut, Pencil, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useTranslate from '@/hooks/useTranslate'
import { patterns } from '@/assets/design-system'

interface AvatarMenuProps {
  avatar: string
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onLogout: () => void
}

export const AvatarMenu: React.FC<AvatarMenuProps> = ({
  avatar,
  onAvatarChange,
  onLogout,
}) => {
  const navigate = useNavigate()
  const t = useTranslate()

  return (
    <div className={patterns.avatarMenu.container}>
      <div className={patterns.avatarMenu.trigger}>
        <img 
          src={avatar} 
          alt="User avatar" 
          className={patterns.avatar.lg}
        />
        <div className={`${patterns.status.base} ${patterns.status.variants.online}`} />
      </div>
      
      <div className={patterns.dropdown.container}>
        <div className={patterns.avatarMenu.avatar.container}>
          <img 
            src={avatar} 
            alt="User avatar" 
            className={patterns.avatar.xl}
          />
          <button
            type="button"
            className={patterns.avatarMenu.avatar.editButton}
            onClick={() => document.getElementById('avatar-upload')?.click()}
            aria-label="Edit avatar"
          >
            <Pencil size={14} />
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="hidden"
            id="avatar-upload"
            aria-label="Upload profile picture"
          />
        </div>

        <div className={patterns.dropdown.content}>
          <button 
            className={patterns.dropdown.button}
            onClick={() => navigate('/settings')}
          >
            <Settings size={16} />
            <span>{t('Profile Settings')}</span>
          </button>
          
          <button 
            className={patterns.dropdown.buttonDanger}
            onClick={onLogout}
          >
            <LogOut size={16} />
            <span>{t('Sign Out')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
