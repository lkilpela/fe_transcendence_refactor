import { layouts, patterns } from '@/assets/design-system'
import { Github } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import i18n from '../../i18n/config'

const Footer: React.FC = () => {
  const [language, setLanguage] = useState(i18n.language)
  const [theme, setTheme] = useState('Dark')

  useEffect(() => {
    setLanguage(i18n.language)
  }, [])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguage(lng)
  }

  const setThemePreference = (newTheme: string) => {
    setTheme(newTheme)
    // Add theme logic here if needed
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
              <option value="System">Auto</option>
            </select>
          </div>
        </div>
        
        <p className={layouts.footer.tech}>Built with React & TypeScript</p>
      </div>
    </footer>
  )
}

export default Footer
