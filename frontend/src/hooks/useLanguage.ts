import i18n from '@/i18n/config'
import { storage } from '@/utils/storage'
import { useCallback, useEffect, useState } from 'react'

export type Language = 'en' | 'fi' | 'ja' | 'sv'

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Initialize from i18n current language or localStorage
    const storedLang = storage.get('language', i18n.language) as Language
    return storedLang
  })

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage)
    i18n.changeLanguage(newLanguage)
    storage.set('language', newLanguage)
  }, [])

  // Sync with i18n changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLanguageState(lng as Language)
    }

    i18n.on('languageChanged', handleLanguageChange)
    return () => i18n.off('languageChanged', handleLanguageChange)
  }, [])

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = storage.get('language', null)
    if (savedLanguage) {
      setLanguage(savedLanguage as Language)
    }
  }, [setLanguage])

  return {
    language,
    setLanguage,
  }
}
