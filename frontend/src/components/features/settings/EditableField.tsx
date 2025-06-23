import { Check, Edit2, X } from 'lucide-react'
import React from 'react'
import { useTranslate } from '@/hooks'
import { patterns } from '@/assets/design-system'

interface UserData {
  username: string
  email: string
  password?: string
  avatar_url?: string
}

interface EditableFieldProps {
  field: keyof UserData
  value: string
  icon?: React.ReactNode
  type?: string
  isEditing: boolean
  tempValue: string
  onEdit: (field: keyof UserData) => void
  onSave: () => void
  onCancel: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const EditableField: React.FC<EditableFieldProps> = ({
  field,
  value,
  icon,
  type = 'text',
  isEditing,
  tempValue,
  onEdit,
  onSave,
  onCancel,
  onChange,
}) => {
  const t = useTranslate()

  return (
    <div className={patterns.settings.editableFieldContainer}>
      <div className={patterns.settings.editableFieldHeader}>
        {icon && <span className={patterns.settings.editableFieldIcon}>{icon}</span>}
        <label className={patterns.settings.editableFieldLabel}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
        </label>
      </div>
      
      {isEditing ? (
        <input
          type={type}
          name={field}
          value={tempValue}
          onChange={onChange}
          placeholder={`Enter your ${field}`}
          autoFocus
          className={patterns.settings.editableFieldInput}
        />
      ) : (
        <div className={patterns.settings.editableFieldDisplay}>
          {field === 'password' ? '********' : value}
        </div>
      )}
      
      <div className={patterns.settings.editableFieldActions}>
        {!isEditing ? (
          <button 
            className={patterns.settings.editableFieldButtonEdit}
            onClick={() => onEdit(field)}
          >
            <Edit2 size={16} />
            {t('Edit')}
          </button>
        ) : (
          <div className={patterns.settings.editableFieldActionsGroup}>
            <button 
              className={patterns.settings.editableFieldButtonSave}
              onClick={onSave}
            >
              <Check size={16} />
              {t('Save')}
            </button>
            <button 
              className={patterns.settings.editableFieldButtonCancel}
              onClick={onCancel}
            >
              <X size={16} />
              {t('Cancel')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 