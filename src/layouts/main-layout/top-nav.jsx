import React from 'react'
import ChangeLanguage from '../../components/change-language'
import ChangeTheme from '../../components/change-theme'
import { useAppContext } from '../../contexts/app/app-context'

export default function TopNav() {

  const {toggleSidebar}=useAppContext()
  return (
    <nav className="navbar">
          <a
            className="sidebar-toggle"
            onClick={toggleSidebar}
          >
            <i className="hamburger align-self-center"></i>
          </a>
          <div className="d-flex align-items-center gap-2 ms-auto me-3">
            <ChangeLanguage/>
            <ChangeTheme/>
          </div>
        </nav>
  )
}
