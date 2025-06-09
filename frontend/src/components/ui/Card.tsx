import { components } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'solid'
  padding?: 'sm' | 'md' | 'lg'
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'glass',
  padding = 'md',
}) => {
  return (
    <div
      className={cn(
        components.card.base,
        components.card.variants[variant],
        components.card.padding[padding],
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Card
