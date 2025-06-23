import { forms } from '@/assets/design-system'
import { AuthCard, AuthHeader, Button, FormField } from '@/components/ui'
import { authService } from '@/services/authService'
import React, { useState } from 'react'

interface TwoFactorFormProps {
  tempToken?: string
  onSuccess: (token: string) => void
  onBackToLogin?: () => void
}

export const TwoFactorForm: React.FC<TwoFactorFormProps> = ({
  onSuccess,
  onBackToLogin,
}) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim() || code.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }

    setIsSubmitting(true)
    setError(undefined)

    try {
      const response = await authService.verify2FA(code)
      onSuccess(response.token)
    } catch (err) {
      setError(err instanceof Error ? err.message : '2FA verification failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Two-Factor Authentication"
        subtitle="Enter the 6-digit code from your authenticator app"
      />

      <form onSubmit={handleSubmit} className={forms.container}>
        <FormField
          id="code"
          name="code"
          label="Authentication Code"
          type="text"
          placeholder="000000"
          value={code}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 6)
            setCode(value)
          }}
          error={error}
          disabled={isSubmitting}
          required
        />

        <Button
          type="submit"
          size="lg"
          className={forms.auth.fullWidth}
          disabled={isSubmitting || code.length !== 6}
        >
          {isSubmitting ? 'Verifying...' : 'Verify Code'}
        </Button>

        <button
          type="button"
          onClick={onBackToLogin}
          disabled={isSubmitting}
          className={forms.auth.link}
        >
          Back to Login
        </button>
      </form>
    </AuthCard>
  )
}
