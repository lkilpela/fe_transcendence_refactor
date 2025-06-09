import { components, foundation } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import React from 'react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  className,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`

  return (
    <label htmlFor={checkboxId} className={components.checkbox.container}>
      <input
        id={checkboxId}
        type="checkbox"
        className={cn(
          components.checkbox.input,
          foundation.states.focus,
          className,
        )}
        {...props}
      />
      <span className={cn(components.checkbox.label, 'ml-2')}>{label}</span>
    </label>
  )
}

export default Checkbox
