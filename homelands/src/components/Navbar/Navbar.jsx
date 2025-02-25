import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`); //Placeholder for now
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link to="/" className={styles.navLogo}>
          HOMELANDS
        </Link>

        {/* Navigation Links */}
        <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Forside</Link>
          <Link to="/sale" onClick={() => setMenuOpen(false)}>Boliger til salg</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>

          {/* Search Bar */}
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Søg..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <FiSearch size={18} />
            </button>
          </form>
        </div>

        {/* Burger Menu Button */}
        <div className={styles.burgerMenu} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </div>
      </div>
    </nav>
  );
};
