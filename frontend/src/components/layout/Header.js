// frontend/src/components/layout/Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import SearchBox from '../common/SearchBox'; // 1. SearchBox ko import karein

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>MERN Blog</Link>
        
        {/* 2. SearchBox ko yahan add karein */}
        <div style={styles.searchContainer}>
          <SearchBox />
        </div>

        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}><Link to="/" style={styles.navLink}>Home</Link></li>
            {userInfo ? (
              <>
                <li style={styles.navItem}><Link to="/create-post" style={styles.navLink}>Create Post</Link></li>
                <li style={styles.navItem}>
                  <button onClick={handleLogout} style={styles.button}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li style={styles.navItem}><Link to="/login" style={styles.navLink}>Login</Link></li>
                <li style={styles.navItem}><Link to="/register" style={styles.navLink}>Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

// 3. Styles ko update karein
const styles = {
  header: { background: '#2c3e50', color: '#fff', padding: '1rem 0' },
  container: { width: '90%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' },
  searchContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 2rem',
  },
  navList: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center' },
  navItem: { marginLeft: '1.5rem' },
  navLink: { color: '#fff', textDecoration: 'none', fontSize: '1rem' },
  button: { background: '#e74c3c', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }
};

export default Header;