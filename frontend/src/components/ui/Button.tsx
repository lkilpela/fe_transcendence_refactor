import React from 'react'
import { components } from '@/assets/design-system'
import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  className,
  children,
  ...props
}) => {
  const isDisabled = disabled || isLoading

  return (
    <button
      className={cn(
        components.button.base,
        components.button.variants[variant],
        components.button.sizes[size],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && <span className={components.button.loading.spinner} />}
      {children}
    </button>
  )
}
export default Button

