import { components } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  variant?: 'base' | 'form'
}

const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  variant = 'base',
  className,
  ...props
}) => {
  return (
    <label className={cn(components.label[variant], className)} {...props}>
      {children}
      {required && <span className={components.label.required}>*</span>}
    </label>
  )
}

export default Label
