import { useAuth, useTranslate } from '@/hooks'
import { settingsService } from '@/services'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import i18n from '../i18n/config'

interface UserData {
  username: string
  email: string
  password?: string
  avatar_url?: string
}

export const useSettingsState = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const t = useTranslate()

  const [userData, setUserData] = useState<UserData>({
    username: user?.username || '',
    email: '',
    password: '',
    avatar_url: '',
  })
  const [tempData, setTempData] = useState<UserData>({
    username: '',
    email: '',
    password: '',
  })
  const [editingField, setEditingField] = useState<keyof UserData | null>(null)
  const [language, setLanguage] = useState(i18n.language)
  const [theme, setTheme] = useState('Dark')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [avatarError, setAvatarError] = useState<string | null>(null)
  const [avatarSuccess, setAvatarSuccess] = useState<string | null>(null)

  const [twoFaEnabled, setTwoFaEnabled] = useState<boolean>(false)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [twoFaToken, setTwoFaToken] = useState<string>('')
  const [twoFaMessage, setTwoFaMessage] = useState<string | null>(null)

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!user?.id) return
        const userProfile = await settingsService.getUserProfile(
          user.id.toString(),
        )
        setUserData({
          username: userProfile.username,
          email: userProfile.email,
          password: '',
          avatar_url: userProfile.avatar_url || '',
        })
      } catch (err) {
        console.error('Failed to load profile', err)
      }
    }
    if (user?.id) loadProfile()
  }, [user?.id])

  // Load 2FA status
  useEffect(() => {
    const fetch2faStatus = async () => {
      try {
        const isEnabled = await settingsService.get2FAStatus()
        setTwoFaEnabled(isEnabled)
      } catch {
        setTwoFaEnabled(false)
      }
    }

    fetch2faStatus()
  }, [])

  // 2FA operations
  const enable2fa = async () => {
    try {
      const qrDataUrl = await settingsService.setup2FA()
      setQrDataUrl(qrDataUrl)
      setTwoFaMessage(null)
    } catch {
      setTwoFaMessage('Failed to generate QR code')
    }
  }

  const verify2FA = async () => {
    try {
      await settingsService.verify2FA(twoFaToken)
      setTwoFaEnabled(true)
      setQrDataUrl(null)
      setTwoFaToken('')
      setTwoFaMessage('2FA enabled!')
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Invalid 2FA code'
      setTwoFaMessage(errorMessage)
    }
  }

  const disable2FA = async () => {
    try {
      await settingsService.disable2FA()
      setTwoFaEnabled(false)
      setTwoFaMessage('2FA disabled.')
    } catch {
      setTwoFaMessage('Failed to disable 2FA')
    }
  }

  // Field editing operations
  const handleEditClick = (field: keyof UserData) => {
    setEditingField(field)
    setTempData((prev) => ({
      ...prev,
      [field]: field === 'password' ? '' : userData[field],
    }))
    setError(null)
    setSuccess(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveClick = async () => {
    if (!editingField || !user?.id) return

    try {
      const fieldToUpdate = editingField
      const newValue = tempData[fieldToUpdate] || ''

      await settingsService.updateUserField(
        user.id.toString(),
        fieldToUpdate,
        newValue,
      )

      setUserData((prev) => ({
        ...prev,
        [fieldToUpdate]: fieldToUpdate === 'password' ? '********' : newValue,
      }))

      setEditingField(null)
      setSuccess(`${fieldToUpdate} updated successfully`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      setError(error instanceof Error ? error.message : t('errors.general'))
    }
  }

  const handleCancelClick = () => {
    setEditingField(null)
    setError(null)
  }

  // Avatar operations
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarError(null)
    setAvatarSuccess(null)
    if (!user?.id) return

    const file = e.target.files?.[0]
    if (!file) return

    try {
      const avatarUrl = await settingsService.uploadAvatar(
        user.id.toString(),
        file,
      )
      console.log('New avatar URL received:', avatarUrl)
      console.log('Previous avatar URL:', userData.avatar_url)
      setUserData((prev) => ({
        ...prev,
        avatar_url: avatarUrl,
      }))
      setAvatarSuccess('Profile picture updated!')
      setTimeout(() => setAvatarSuccess(null), 3000)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setAvatarError(errorMessage)
    }
  }

  // Account operations
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch {
      setError('Failed to logout')
    }
  }

  const handleDeleteAccount = async () => {
    if (!user?.id) {
      setError('Could not delete account: User ID is missing')
      return
    }
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.',
      )
    ) {
      try {
        await settingsService.deleteUser(user.id.toString())
        await logout()
        navigate('/')
      } catch {
        setError('Failed to delete account')
      }
    }
  }

  // Language operations
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguage(lng)
  }

  const handleTwoFaTokenChange = (token: string) => {
    setTwoFaToken(token)
  }

  return {
    userData,
    tempData,
    editingField,
    language,
    theme,
    error,
    success,
    avatarError,
    avatarSuccess,
    twoFaEnabled,
    qrDataUrl,
    twoFaToken,
    twoFaMessage,
    setTheme,
    enable2fa,
    verify2FA,
    disable2FA,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleCancelClick,
    handleAvatarChange,
    handleLogout,
    handleDeleteAccount,
    changeLanguage,
    handleTwoFaTokenChange,
  }
}
