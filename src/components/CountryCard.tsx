import { Link } from 'react-router-dom';
import type { Country } from '../types/country';
import { formatPopulation } from '../utils/api';
import styles from './CountryCard.module.css';

interface Props {
  country: Country;
  index: number;
}

export function CountryCard({ country, index }: Props) {
  const delay = Math.min(index * 30, 400);

  return (
    <Link
      to={`/country/${country.cca3}`}
      className={styles.card}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.flagWrap}>
        <img
          src={country.flags.svg || country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className={styles.flag}
          loading="lazy"
        />
        <div className={styles.region}>{country.region}</div>
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{country.name.common}</h2>
        {country.subregion && (
          <p className={styles.subregion}>{country.subregion}</p>
        )}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>População</span>
            <span className={styles.statValue}>{formatPopulation(country.population)}</span>
          </div>
          {country.capital?.[0] && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>Capital</span>
              <span className={styles.statValue}>{country.capital[0]}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
