import { storage } from '@/utils/storage'
import { useEffect, useState } from 'react'

export type Theme = 'Dark' | 'Light' | 'Auto'

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Initialize theme from localStorage or default to 'Dark'
    return storage.get('theme', 'Dark')
  })

  const applyTheme = (selectedTheme: Theme) => {
    const html = document.documentElement

    if (selectedTheme === 'Dark') {
      html.classList.add('dark')
    } else if (selectedTheme === 'Light') {
      html.classList.remove('dark')
    } else if (selectedTheme === 'Auto') {
      // System preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      if (prefersDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    // Store theme preference in localStorage
    storage.set('theme', newTheme)
    // Apply the theme immediately
    applyTheme(newTheme)
  }

  // Apply theme on component mount and when theme changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Listen for system theme changes when in Auto mode
  useEffect(() => {
    if (theme === 'Auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => applyTheme('Auto')

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  return {
    theme,
    setTheme,
  }
}
