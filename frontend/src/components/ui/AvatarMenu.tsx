import React from 'react'
import Button from './Button'
import { cn } from '@/utils/cn'

interface AvatarMenuProps {
  avatar: string
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLogout: () => void
  className?: string
}

export const AvatarMenu: React.FC<AvatarMenuProps> = ({
  avatar,
  onAvatarChange,
  onLogout,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="relative">
        <img
          src={avatar}
          alt="User avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <input
          type="file"
          accept="image/*"
          onChange={onAvatarChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <Button onClick={onLogout} variant="ghost">
        Logout
      </Button>
    </div>
  )
}

export default AvatarMenu 