import { layouts, patterns } from '@/assets/design-system'
import { Github } from 'lucide-react'
import React from 'react'
import { useTheme, useLanguage, type Theme, type Language } from '@/hooks' 
import { DEVELOPERS, LANGUAGE_OPTIONS, type Developer, type LanguageOption } from '@/utils/constants'

const Footer: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()

  return (
    <footer className={layouts.footer.base}>
      <div className={layouts.footer.container}>
        {/* Developer Links Section */}
        <DeveloperSection />
        
        {/* App Preferences Section */}
        <PreferencesSection 
          language={language}
          theme={theme}
          onLanguageChange={setLanguage}
          onThemeChange={setTheme}
        />
        
        {/* Tech Stack Info */}
        <p className={layouts.footer.tech}>Built with React & TypeScript</p>
      </div>
    </footer>
  )
}

// Separated Developer Links Component
const DeveloperSection: React.FC = () => (
  <div className={layouts.footer.developers.container}>
    <p className={layouts.footer.copyright}>
      © 2025 Ping.Pong.Play! - Hive Helsinki
    </p>
    <div className={layouts.footer.developers.row}>
      <span className={layouts.footer.developers.label}>Developers:</span>
      {DEVELOPERS.map((dev: Developer) => (
        <a
          key={dev.url}
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
)

// Separated Preferences Component
interface PreferencesSectionProps {
  language: Language
  theme: Theme
  onLanguageChange: (language: Language) => void
  onThemeChange: (theme: Theme) => void
}

const PreferencesSection: React.FC<PreferencesSectionProps> = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
}) => (
  <div className={patterns.appPreferences.container}>
    <div className={patterns.appPreferences.preference}>
      <label className={patterns.appPreferences.label}>Language:</label>
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className={patterns.appPreferences.select}
      >
        {LANGUAGE_OPTIONS.map(({ value, label }: LanguageOption) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
    
    <div className={patterns.appPreferences.preference}>
      <label className={patterns.appPreferences.label}>Theme:</label>
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value as Theme)}
        className={patterns.appPreferences.select}
      >
        <option value="Dark">Dark</option>
        <option value="Light">Light</option>
        <option value="Auto">Auto</option>
      </select>
    </div>
  </div>
)

export default Footer
