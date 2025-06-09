import { forms, foundation } from '@/assets/design-system'
import React from 'react'

interface AuthFooterProps {
  text: string
  linkText: string
  onLinkClick: () => void
  disabled?: boolean
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  text,
  linkText,
  onLinkClick,
  disabled = false,
}) => {
  return (
    <div className={forms.auth.footer}>
      <span className={foundation.typography.small}>{text} </span>
      <button
        type="button"
        onClick={onLinkClick}
        disabled={disabled}
        className={forms.auth.link}
      >
        {linkText}
      </button>
    </div>
  )
}

export default AuthFooter
