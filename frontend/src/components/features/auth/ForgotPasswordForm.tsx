import { forms } from '@/assets/design-system'
import { AuthCard, AuthHeader, Button, FormField } from '@/components/ui'
import { apiService } from '@/services/api'
import React, { useState } from 'react'

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void
  onSubmitSuccess?: () => void
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
  onSubmitSuccess,
}) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Email is required')
      return
    }

    setIsSubmitting(true)
    setError(undefined)

    try {
      await apiService.requestPasswordReset(email)
      setSuccess(true)
      onSubmitSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <AuthCard>
        <AuthHeader
          title="Check Your Email"
          subtitle="We've sent password reset instructions to your email address."
        />
        <div className={forms.container}>
          <Button
            type="button"
            size="lg"
            className={forms.auth.fullWidth}
            onClick={onBackToLogin}
          >
            Back to Login
          </Button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Reset Password"
        subtitle="Enter your email address and we'll send you instructions to reset your password."
      />

      <form onSubmit={handleSubmit} className={forms.container}>
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          disabled={isSubmitting}
          required
        />

        <Button
          type="submit"
          size="lg"
          className={forms.auth.fullWidth}
          disabled={isSubmitting || !email.trim()}
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
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

export default ForgotPasswordForm
