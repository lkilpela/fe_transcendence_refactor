import React, { useState, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { patterns } from '@/assets/design-system'
import { DEFAULT_AVATAR } from '@/utils/constants'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
  onError?: () => void
  className?: string
  loading?: boolean
}

/**
 * Pure UI Avatar Component
 * 
 * Responsibilities:
 * - Render avatar image with proper fallbacks
 * - Handle loading and error states
 * - Apply consistent styling and sizing
 * - Provide click handlers
 * 
 * Does NOT:
 * - Make API calls
 * - Process URLs or handle uploads
 * - Manage user state
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  onClick,
  onError,
  className,
  loading = false,
}) => {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_AVATAR)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(DEFAULT_AVATAR)
      onError?.()
    }
  }

  // Update imgSrc when src prop changes
  useEffect(() => {
    if (src && src !== imgSrc && !hasError) {
      setImgSrc(src)
      setHasError(false)
    } else if (!src) {
      setImgSrc(DEFAULT_AVATAR)
      setHasError(false)
    }
  }, [src, imgSrc, hasError])

  if (loading) {
    return (
      <div
        className={cn(
          patterns.avatar[size],
          'bg-gray-600 animate-pulse flex items-center justify-center',
          className
        )}
      >
        <div className="w-1/2 h-1/2 bg-gray-500 rounded-full" />
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      onClick={onClick}
      onError={handleError}
      className={cn(
        patterns.avatar[size],
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
    />
  )
}
