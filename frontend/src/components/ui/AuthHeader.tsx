import { forms, foundation } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import React from 'react'

interface AuthHeaderProps {
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  showDefaultAvatar?: boolean
  avatarSeed?: string
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ 
  title = '', 
  subtitle, 
  icon, 
  showDefaultAvatar = true,
  avatarSeed = 'login'
}) => {
  const defaultAvatar = (
    <img
      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}&size=100`}
      alt="Avatar"
      className={forms.auth.icon}
    />
  )

  const displayIcon = icon || (showDefaultAvatar ? defaultAvatar : null)

  return (
    <div className={forms.auth.header}>
      {displayIcon && <div className={forms.auth.iconContainer}>{displayIcon}</div>}
      {title && <h3 className={foundation.typography.h3}>{title}</h3>}
      {subtitle && (
        <p className={cn(foundation.typography.body, forms.auth.subtitle)}>{subtitle}</p>
      )}
    </div>
  )
}

export default AuthHeader
