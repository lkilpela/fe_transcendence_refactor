import { layouts } from '@/assets/design-system'
import { Github } from 'lucide-react'
import React from 'react'

const Footer: React.FC = () => {
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
        <p className={layouts.footer.tech}>Built with React & TypeScript</p>
      </div>
    </footer>
  )
}

export default Footer
