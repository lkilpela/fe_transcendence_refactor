import React from 'react'
import { patterns, foundation } from '@/assets/design-system'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  variant?: 'default' | 'highlighted' | 'compact'
  className?: string
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = 'default',
  className = ''
}) => {
  if (variant === 'compact') {
    return (
      <div className={`text-center ${className}`}>
        {icon && <div className="mb-1">{icon}</div>}
        <div className={foundation.typography.h3}>{value}</div>
        <div className={foundation.typography.small}>{title}</div>
      </div>
    )
  }

  if (variant === 'highlighted') {
    return (
      <div className={`${patterns.stats.card.base} bg-blue-500/20 border-blue-500/50 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={patterns.stats.card.title}>{title}</h3>
          {icon && <div className="text-blue-400">{icon}</div>}
        </div>
        <p className={`${patterns.stats.card.value} text-blue-300`}>{value}</p>
        {subtitle && <p className={foundation.typography.small}>{subtitle}</p>}
      </div>
    )
  }

  // Default variant
  return (
    <div className={`${patterns.stats.card.base} ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={patterns.stats.card.title}>{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className={patterns.stats.card.value}>{value}</p>
      {subtitle && <p className={foundation.typography.small}>{subtitle}</p>}
    </div>
  )
}

export default StatsCard 