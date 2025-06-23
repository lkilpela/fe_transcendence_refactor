import React, { useMemo, useEffect, useState, useRef } from 'react'
import { patterns } from '@/assets/design-system'
import { Edit } from 'lucide-react'
import { API_URL } from '@/utils/constants'

interface AvatarUploadProps {
  avatarUrl: string
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  avatarError: string | null
  avatarSuccess: string | null
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  onAvatarChange,
  avatarError,
  avatarSuccess,
}) => {
  const [refreshKey, setRefreshKey] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // Force image refresh on successful upload
  useEffect(() => {
    if (avatarSuccess) {
      setRefreshKey(Date.now())
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [avatarSuccess])

  // Create full URL with cache-busting
  const imageUrl = useMemo(() => {
    if (!avatarUrl) return `${API_URL}/uploads/placeholder-avatar1.png`
    
    const fullUrl = avatarUrl.startsWith('http') ? avatarUrl : `${API_URL}${avatarUrl}`
    const separator = fullUrl.includes('?') ? '&' : '?'
    return `${fullUrl}${separator}t=${refreshKey || Date.now()}`
  }, [avatarUrl, refreshKey])

  const handleImageError = () => {
    if (imgRef.current) {
      imgRef.current.src = `${API_URL}/uploads/placeholder-avatar1.png`
    }
  }

  return (
    <div className={patterns.settings.avatarContainer}>
      <div className="relative inline-block">
        <img
          ref={imgRef}
          key={`avatar-${refreshKey}`}
          src={imageUrl}
          alt="Profile"
          className={patterns.settings.avatarImage}
          onError={handleImageError}
        />
        
        <div className={patterns.settings.avatarEditIcon}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Edit className="w-3 h-3 text-white" />
        </div>
      </div>
      
      {avatarError && <p className={patterns.settings.avatarError}>{avatarError}</p>}
      {avatarSuccess && <p className={patterns.settings.avatarSuccess}>{avatarSuccess}</p>}
    </div>
  )
} 