import React from 'react'
import { cn } from '@/utils/cn'
import { patterns } from '@/assets/design-system'

interface AvatarProps {
  src: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
  className?: string
}

// Simple, reusable Avatar component
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  onClick,
  className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={cn(
        patterns.avatar[size],
        onClick && 'cursor-pointer',
        className
      )}
    />
  )
}

interface AvatarInputProps {
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
  className?: string
}

// Reusable avatar input wrapper
export const AvatarInput: React.FC<AvatarInputProps> = ({
  onAvatarChange,
  children,
  className
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      <input
        type="file"
        accept="image/*"
        onChange={onAvatarChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Change avatar"
      />
    </div>
  )
}

// Named exports for clarity
export { Avatar as default } 