import { forms } from '@/assets/design-system'
import React from 'react'
import Input from './Input'
import Label from './Label'

interface FormFieldProps {
  id: string
  name: string
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
  required?: boolean
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
}) => {
  return (
    <div className={forms.field}>
      <Label htmlFor={id} variant="form">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}

export default FormField
 