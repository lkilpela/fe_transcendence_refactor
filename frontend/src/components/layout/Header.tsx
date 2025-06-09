import { header } from '@/assets/design-system'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className={header.base}>
      <div className={header.container}>
        <h1 className={header.title}>Ping.Pong.Play!</h1>
      </div>
    </header>
  )
}

export default Header
