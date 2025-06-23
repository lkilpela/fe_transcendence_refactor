import React from 'react'
import { patterns } from '@/assets/design-system'

interface TwoFactorSectionProps {
  twoFaEnabled: boolean
  qrDataUrl: string | null
  twoFaToken: string
  twoFaMessage: string | null
  onEnable2FA: () => void
  onDisable2FA: () => void
  onVerify2FA: () => void
  onTokenChange: (token: string) => void
}

export const TwoFactorSection: React.FC<TwoFactorSectionProps> = ({
  twoFaEnabled,
  qrDataUrl,
  twoFaToken,
  twoFaMessage,
  onEnable2FA,
  onDisable2FA,
  onVerify2FA,
  onTokenChange,
}) => {
  return (
    <div className={patterns.settings.fieldContainer}>
      <label className={patterns.settings.fieldLabel}>Two-Factor Authentication</label>
      
      {twoFaEnabled ? (
        <button 
          onClick={onDisable2FA}
          className={patterns.settings.dangerButtonInline}
        >
          Disable 2FA
        </button>
      ) : (
        <div className={patterns.settings.fieldContainer}>
          <button 
            onClick={onEnable2FA}
            className={patterns.settings.display}
          >
            Enable 2FA
          </button>
          
          {qrDataUrl && (
            <div className={patterns.settings.qrContainer}>
              <img 
                src={qrDataUrl} 
                alt="Scan QR code" 
                className={patterns.settings.qrImage}
              />
              <input
                type="text"
                value={twoFaToken}
                onChange={(e) => onTokenChange(e.target.value)}
                maxLength={6}
                placeholder="Enter 6-digit code"
                className={patterns.settings.qrInput}
              />
              <button 
                onClick={onVerify2FA}
                className={patterns.settings.successButtonInline}
              >
                Verify & Enable
              </button>
            </div>
          )}
          
          {twoFaMessage && (
            <p className={patterns.settings.qrMessage}>{twoFaMessage}</p>
          )}
        </div>
      )}
    </div>
  )
} 