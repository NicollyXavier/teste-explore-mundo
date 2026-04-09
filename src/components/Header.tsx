import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>◎</span>
          <span className={styles.logoText}>Explore o Mundo</span>
        </Link>
        {!isHome && (
          <Link to="/" className={styles.back}>
            ← Todos os Países
          </Link>
        )}
      </div>
    </header>
  );
}
