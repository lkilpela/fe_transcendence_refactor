import { components, tokens, typography } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import React from 'react'

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: 'md' | 'lg'
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  size = 'md',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={components.input.container}>
      {label && (
        <label htmlFor={inputId} className={components.label.base}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          components.input.base,
          error
            ? components.input.variants.error
            : components.input.variants.default,
          components.input.sizes[size],
          className,
        )}
        {...props}
      />
      {error && (
        <p className={cn('text-sm', tokens.colors.semantic.error)}>{error}</p>
      )}
      {helperText && !error && <p className={typography.small}>{helperText}</p>}
    </div>
  )
}

export default Input
