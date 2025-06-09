import { components } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import React from 'react'

interface DividerProps {
  text?: string
  className?: string
}

const Divider: React.FC<DividerProps> = ({ text, className }) => (
  text ? (
    <div className={cn(components.divider.withText, className)}>
      <div className={components.divider.base} />
      <span className={components.divider.textSpan}>{text}</span>
      <div className={components.divider.base} />
    </div>
  ) : (
    <div className={cn(components.divider.base, className)} />
  )
)

export default Divider