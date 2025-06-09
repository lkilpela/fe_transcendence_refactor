import { forms } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import React from 'react'
import Card from './Card'

interface AuthCardProps {
  children: React.ReactNode
  className?: string
}

const AuthCard: React.FC<AuthCardProps> = ({ children, className }) => {
  return (
    <Card variant="glass" className={cn(forms.auth.card, className)}>
      {children}
    </Card>
  )
}

export default AuthCard
 