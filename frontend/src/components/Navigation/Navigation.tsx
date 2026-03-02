import { Link } from 'react-router';
import type { User } from '../../interfaces/User';
import cornLogo from '../../assets/corn.svg';
import logoutIcon from '../../assets/logout.svg';
import loginIcon from '../../assets/login.svg';
import hamburgerMenu from '../../assets/hamburgerMenu.svg';
import closeMenuIcon from '../../assets/closeMenu.svg';
import { useState } from 'react';
import styles from './Navigation.module.css';

const Navigation = ({ signedInUser }: { signedInUser?: User }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const signedInUserFirstName = signedInUser
    ? signedInUser?.firstName?.charAt(0).toUpperCase() +
      signedInUser?.firstName?.slice(1)
    : '';

  const handleMenuToggle = () => {
    setMenuOpen((prev: boolean) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navigation} data-open={menuOpen}>
        <span>
          <Link
            to='/'
            title='Återgå till startsidan'
            className={styles.logoLink}
            onClick={closeMenu}
          >
            <img
              src={cornLogo}
              alt='alternativ grogrunds logo, en majskolv'
              height='46px'
              width='46px'
            />
          </Link>
        </span>
        <nav className={styles.menu}>
          {!signedInUser && (
            <Link to='/bli-medlem' onClick={closeMenu}>
              Bli medlem
            </Link>
          )}
          {signedInUser && (
            <Link to='/profil' onClick={closeMenu}>
              Inställningar
            </Link>
          )}
          {signedInUser?.role === 'admin' && (
            <>
              <Link to='/medlemmar' onClick={closeMenu}>
                Hantera medlemmar
              </Link>
              <Link to='/maila' onClick={closeMenu}>
                Maila
              </Link>
            </>
          )}
        </nav>
        {signedInUser ? (
          <>
            <span className={styles.displayUsername}>
              <p className={styles.loggedInLabel}>Inloggad som: </p>
              <p>{signedInUserFirstName}</p>
            </span>
            <button
              title='logga ut'
              className={styles.logoutButton}
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
            >
              <img src={logoutIcon} alt='Logga ut' height='24px' width='24px' />
            </button>
          </>
        ) : (
          <>
            <button
              title='Logga in'
              className={styles.navigationLoginButton}
              onClick={() => {
                window.location.href = '/login ';
              }}
            >
              <img src={loginIcon} alt='Logga in' height='24px' width='24px' />
            </button>
          </>
        )}
        <button
          className={styles.hamburgerMenu}
          aria-label='Växla navigering'
          aria-expanded={menuOpen}
          onClick={handleMenuToggle}
        >
          <img
            src={menuOpen ? closeMenuIcon : hamburgerMenu}
            height='24px'
            width='24px'
          />
        </button>
        {menuOpen && (
          <div className={styles.navigationPopupMenu}>
            {!signedInUser && (
              <Link to='/bli-medlem' onClick={closeMenu}>
                Bli medlem
              </Link>
            )}
            {signedInUser && (
              <Link to='/profil' onClick={closeMenu}>
                Inställningar
              </Link>
            )}
            {signedInUser?.role === 'admin' && (
              <>
                <Link to='/medlemmar' onClick={closeMenu}>
                  Hantera medlemmar
                </Link>
                <Link to='/maila' onClick={closeMenu}>
                  Maila
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
