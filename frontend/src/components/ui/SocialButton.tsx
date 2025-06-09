import { components } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import React from 'react'

interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'google'
  isLoading?: boolean
  children?: React.ReactNode
}

const googleIcon = (
  <img
    src="https://www.google.com/s2/favicons?domain=google.com&sz=64"
    alt="Google"
    className="h-6 w-6"
  />
)

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(
        components.button.base,
        components.button.sizes.md,
        components.button.variants.ghost,
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className={components.button.loading.spinner}></div>
      ) : (
        googleIcon
      )}
      {children ||
        `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    </button>
  )
}

export default SocialButton
