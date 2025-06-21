import React from 'react'
import { LogOut, Pencil, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useTranslate from '@/hooks/useTranslate'
import { cn } from '@/utils/cn'
import { components, foundation, patterns, sharedStyles } from '@/assets/design-system'

interface AvatarMenuProps {
  avatar: string
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onLogout: () => void
}

// Extracted common class combinations for better reusability
const avatarClasses = {
  small: cn(components.avatar.base, components.avatar.sizes.lg),
  large: cn(components.avatar.base, components.avatar.sizes.xl),
}

const buttonClasses = {
  edit: cn(
    components.button.base,
    components.button.variants.ghost,
    components.button.sizes.sm,
    foundation.position.absolute.bottomRight
  ),
  menuItem: (variant: 'ghost' | 'danger') => cn(
    patterns.dropdown.button,
    components.button.variants[variant],
    components.button.sizes.md
  ),
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({
  avatar,
  onAvatarChange,
  onLogout,
}) => {
  const navigate = useNavigate()
  const t = useTranslate()

  return (
    <div className={foundation.position.relative}>
      <div className={sharedStyles.flexRow}>
        <img 
          src={avatar} 
          alt="User avatar" 
          className={avatarClasses.small}
        />
        <div className={cn(
          foundation.position.absolute.bottomRight,
          patterns.status.base,
          patterns.status.variants.online
        )} />
      </div>
      
      <div className={cn(patterns.dropdown.container, foundation.position.absolute.topRight)}>
        <div className={cn(
          'mb-4',
          foundation.position.relative,
          foundation.position.centerContent
        )}>
          <img 
            src={avatar} 
            alt="User avatar" 
            className={avatarClasses.large}
          />
          <button
            type="button"
            className={buttonClasses.edit}
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
            className={buttonClasses.menuItem('ghost')}
            onClick={() => navigate('/settings')}
          >
            <Settings size={16} />
            <span>{t('Profile Settings')}</span>
          </button>
          
          <button 
            className={buttonClasses.menuItem('danger')}
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

export default AvatarMenu 