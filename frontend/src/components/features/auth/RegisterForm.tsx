import { forms } from '@/assets/design-system'
import {
  AuthCard,
  AuthFooter,
  AuthHeader,
  Button,
  Divider,
  FormField,
  SocialButton,
} from '@/components/ui'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/authService'

interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  submit: string
}

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void
  onSuccess?: () => void
  onGoogleSignUp?: () => void
  isLoading?: boolean
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onSuccess,
  onGoogleSignUp,
  isLoading = false,
}) => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    submit: '',
  })

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({})

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
      // Clear error when user starts typing
      if (errors[name as keyof RegisterFormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    },
    [errors],
  )

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        setIsSubmitting(true)
        
        // Call parent's onSubmit if provided, otherwise handle internally
        if (onSubmit) {
          await onSubmit(formData)
        } else {
          await authService.register(
            formData.username,
            formData.email,
            formData.password
          )
        }
        
        // Call success callback or navigate by default
        if (onSuccess) {
          onSuccess()
        } else {
          navigate('/')
        }
      } catch (error) {
        console.log('Registration error:', error)
        if (error instanceof Error) {
          if (error.message.includes('409')) {
            setErrors({ 
              submit: 'Username or email already exists. Please try another one.' 
            })
          } else {
            setErrors({ 
              submit: error.message 
            })
          }
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
      <AuthCard>
        <AuthHeader avatarSeed="register" />

        <form onSubmit={handleSubmit} className={forms.container}>
          <FormField
            id="username"
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            disabled={isLoading}
            required
          />

          <FormField
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
            required
          />

          <FormField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={isLoading}
            required
          />

          <FormField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            disabled={isLoading}
            required
          />

          {errors.submit && (
            <div className={forms.field}>
              <p className={forms.auth.error}>{errors.submit}</p>
            </div>
          )}

          <Button
            type="submit"
            className={forms.auth.fullWidth}
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Divider text="or" />

          <SocialButton
            provider="google"
            type="button"
            className={forms.auth.fullWidth}
            onClick={onGoogleSignUp}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Sign up with Google
          </SocialButton>

          <AuthFooter
            text="Already have an account?"
            linkText="Sign in"
            onLinkClick={() => navigate('/')}
            disabled={isLoading}
          />
      </form>
    </AuthCard>
  )
}

export default RegisterForm
