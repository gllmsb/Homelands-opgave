import React, { useState, useContext } from 'react';
import styles from './Navbar.module.scss';
import { Link, useNavigate } from 'react-router-dom'; 
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { UserContext } from '../../context/UserContext';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/sale?search=${searchQuery.trim()}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navLogo}>
          HOMELANDS
        </Link>

        <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Forside</Link>
          <Link to="/sale" onClick={() => setMenuOpen(false)}>Boliger til salg</Link>

          {user ? (
            <Link 
            to="#" 
            className={styles.logoutButton} 
            onClick={() => { logout(navigate); setMenuOpen(false); }}>
            Logout
          </Link>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}

          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Søg efter adresse, by osv..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <FiSearch size={18} />
            </button>
          </form>
        </div>

        <div className={styles.burgerMenu} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </div>
      </div>
    </nav>
  );
};
