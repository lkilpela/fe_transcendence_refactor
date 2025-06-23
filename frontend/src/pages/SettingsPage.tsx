import React from 'react'
import { useTranslate, useSettingsState } from '@/hooks'
import { AvatarUpload, TwoFactorSection } from '@/components/features/settings'
import { PageLayout } from '@/components/layout'
import { patterns } from '@/assets/design-system'

export const SettingsPage: React.FC = () => {
  const t = useTranslate()
  const {
    userData,
    tempData,
    editingField,
    error,
    success,
    avatarError,
    avatarSuccess,
    twoFaEnabled,
    qrDataUrl,
    twoFaToken,
    twoFaMessage,
    enable2fa,
    verify2FA,
    disable2FA,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleAvatarChange,
    handleDeleteAccount,
    handleTwoFaTokenChange,
  } = useSettingsState()

  return (
    <PageLayout showSidebar>
      <div className={patterns.settings.container}>
        
        <h1 className={patterns.settings.title}>
          {t('settings.title')}
        </h1>

        {error && (
          <div className={patterns.settings.messageError}>
            {error}
          </div>
        )}
        
        {success && (
          <div className={patterns.settings.messageSuccess}>
            {success}
          </div>
        )}

        <div className={patterns.settings.fieldWrapper}>
          <AvatarUpload
            avatarUrl={userData.avatar_url || ''}
            onAvatarChange={handleAvatarChange}
            avatarError={avatarError}
            avatarSuccess={avatarSuccess}
          />
        </div>

        <div className={patterns.settings.fieldContainer}>
          <label className={patterns.settings.fieldLabel}>Username</label>
          {editingField === 'username' ? (
            <input
              type="text"
              name="username"
              value={tempData.username}
              onChange={handleInputChange}
              onBlur={() => handleSaveClick()}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveClick()}
              autoFocus
              className={patterns.settings.input}
            />
          ) : (
            <div 
              onClick={() => handleEditClick('username')}
              className={patterns.settings.display}
            >
              {userData.username}
            </div>
          )}
        </div>

        <div className={patterns.settings.fieldContainer}>
          <label className={patterns.settings.fieldLabel}>Email</label>
          {editingField === 'email' ? (
            <input
              type="email"
              name="email"
              value={tempData.email}
              onChange={handleInputChange}
              onBlur={() => handleSaveClick()}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveClick()}
              autoFocus
              className={patterns.settings.input}
            />
          ) : (
            <div 
              onClick={() => handleEditClick('email')}
              className={patterns.settings.display}
            >
              {userData.email}
            </div>
          )}
        </div>

        <div className={patterns.settings.fieldContainer}>
          <label className={patterns.settings.fieldLabel}>Password</label>
          {editingField === 'password' ? (
            <input
              type="password"
              name="password"
              value={tempData.password || ''}
              onChange={handleInputChange}
              onBlur={() => handleSaveClick()}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveClick()}
              placeholder="Enter new password"
              autoFocus
              className={patterns.settings.input}
            />
          ) : (
            <div 
              onClick={() => handleEditClick('password')}
              className={patterns.settings.display}
            >
              ********
            </div>
          )}
        </div>

        <div className={patterns.settings.fieldWrapper}>
          <TwoFactorSection
            twoFaEnabled={twoFaEnabled}
            qrDataUrl={qrDataUrl}
            twoFaToken={twoFaToken}
            twoFaMessage={twoFaMessage}
            onEnable2FA={enable2fa}
            onDisable2FA={disable2FA}
            onVerify2FA={verify2FA}
            onTokenChange={handleTwoFaTokenChange}
          />
        </div>

        <button 
          onClick={handleDeleteAccount}
          className={patterns.settings.dangerButton}
        >
          Delete Account
        </button>
        
      </div>
    </PageLayout>
  )
}

