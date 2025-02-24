import React, { useState } from 'react'
import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navLogo}>
         HOMELANDS
        </Link>

        <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/sale" onClick={() => setMenuOpen(false)}>Boliger til salg</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>

        <div className={burgerMenu} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </div>
      </div>
    </nav>
  )
}

