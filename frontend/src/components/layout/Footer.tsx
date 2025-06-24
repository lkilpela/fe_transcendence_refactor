import { layouts, patterns } from '@/assets/design-system'
import { storage } from '@/utils/storage'
import { Github } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import i18n from '../../i18n/config'

const Footer: React.FC = () => {
  const [language, setLanguage] = useState(i18n.language)
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or default to 'Dark'
    return storage.get('theme', 'Dark')
  })

  useEffect(() => {
    setLanguage(i18n.language)
  }, [])

  useEffect(() => {
    // Apply theme on component mount and when theme changes
    applyTheme(theme)
  }, [theme])

  const applyTheme = (selectedTheme: string) => {
    const html = document.documentElement
    
    if (selectedTheme === 'Dark') {
      html.classList.add('dark')
    } else if (selectedTheme === 'Light') {
      html.classList.remove('dark')
    } else if (selectedTheme === 'Auto') {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguage(lng)
  }

  const setThemePreference = (newTheme: string) => {
    setTheme(newTheme)
    // Store theme preference in localStorage
    storage.set('theme', newTheme)
    // Apply the theme immediately
    applyTheme(newTheme)
  }

  return (
    <footer className={layouts.footer.base}>
      <div className={layouts.footer.container}>
        <div className={layouts.footer.developers.container}>
          <p className={layouts.footer.copyright}>
            © 2025 Ping.Pong.Play! - Hive Helsinki
          </p>
          <div className={layouts.footer.developers.row}>
            <span className={layouts.footer.developers.label}>Developers:</span>
            {[
              { name: 'Developer 1', url: 'https://github.com/ito-miyuki' },
              { name: 'Developer 2', url: 'https://github.com/k2matu' },
              { name: 'Developer 3', url: 'https://github.com/Vallehtelia' },
              {
                name: 'Developer 4',
                url: 'https://github.com/oliverhertzberg',
              },
              { name: 'Developer 5', url: 'https://github.com/lkilpela' },
            ].map((dev, index) => (
              <a
                key={index}
                href={dev.url}
                target="_blank"
                rel="noopener noreferrer"
                className={layouts.footer.developers.link}
                aria-label={`${dev.name} GitHub Profile`}
              >
                <Github className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        
        {/* App Preferences */}
        <div className={patterns.appPreferences.container}>
          <div className={patterns.appPreferences.preference}>
            <label className={patterns.appPreferences.label}>Language:</label>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className={patterns.appPreferences.select}
            >
              <option value="en">EN</option>
              <option value="fi">FI</option>
              <option value="sv">SV</option>
              <option value="ja">JA</option>
            </select>
          </div>
          
          <div className={patterns.appPreferences.preference}>
            <label className={patterns.appPreferences.label}>Theme:</label>
            <select
              value={theme}
              onChange={(e) => setThemePreference(e.target.value)}
              className={patterns.appPreferences.select}
            >
              <option value="Dark">Dark</option>
              <option value="Light">Light</option>
              <option value="Auto">Auto</option>
            </select>
          </div>
        </div>
        
        <p className={layouts.footer.tech}>Built with React & TypeScript</p>
      </div>
    </footer>
  )
}

export default Footer
