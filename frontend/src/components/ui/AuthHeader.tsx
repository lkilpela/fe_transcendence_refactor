import { forms, typography } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import React from 'react'

interface AuthHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className={forms.auth.header}>
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <h3 className={typography.h3}>{title}</h3>
      {subtitle && <p className={cn(typography.body, 'mt-2')}>{subtitle}</p>}
    </div>
  )
}

export default AuthHeader
