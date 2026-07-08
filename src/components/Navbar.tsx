import { NavLink } from 'react-router-dom';

import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.scss';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/search', label: 'Search', end: false },
  { to: '/shelf', label: 'My Shelf', end: false },
  { to: '/stats', label: 'Stats', end: false },
];

/** Top navigation bar with brand, route links, and the theme toggle. */
function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand}>
          <span aria-hidden="true">📚</span> BookNook
        </NavLink>

        <nav className={styles.links}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}

export default Navbar;
