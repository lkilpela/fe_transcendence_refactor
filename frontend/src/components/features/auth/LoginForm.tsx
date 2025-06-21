import { forms } from '@/assets/design-system'
import {
  AuthCard,
  AuthFooter,
  AuthHeader,
  Button,
  Checkbox,
  Divider,
  FormField,
  SocialButton,
} from '@/components/ui'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
  onSubmit?: (data: {
    username: string
    password: string
    rememberMe: boolean
  }) => void
  onForgotPassword?: () => void
  onSignUp?: () => void
  onGoogleSignIn?: () => void
  isLoading?: boolean
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  onGoogleSignIn,
  isLoading = false,
}) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit?.(formData)
    },
    [formData, onSubmit],
  )

  return (
    <AuthCard>
      <AuthHeader />

      <form onSubmit={handleSubmit} className={forms.container}>
        <FormField
          id="username"
          name="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
          required
        />

        <FormField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          required
        />

        <div className={forms.auth.controls}>
          <Checkbox
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            label="Remember me"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={onForgotPassword}
            disabled={isLoading}
            className={forms.auth.link}
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          size="lg"
          className={forms.auth.fullWidth}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <Divider text="or" />

        <SocialButton
          provider="google"
          type="button"
          className={forms.auth.fullWidth}
          onClick={onGoogleSignIn}
          disabled={isLoading}
          isLoading={isLoading}
        >
          Sign in with Google
        </SocialButton>

        <AuthFooter
          text="Don't have an account?"
          linkText="Sign up"
          onLinkClick={() => {
            onSignUp?.()
            navigate('/register')
          }}
          disabled={isLoading}
        />
      </form>
    </AuthCard>
  )
}
