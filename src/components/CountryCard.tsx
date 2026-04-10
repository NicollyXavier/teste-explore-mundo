import { Link } from 'react-router-dom';
import type { Country } from '../types/country';
import { formatPopulation } from '../utils/api';
import styles from './CountryCard.module.css';

interface Props {
  country: Country;
  index: number;
}

/**
 * Card clicável que representa um país na grade da página inicial.
 * O card inteiro é um link (<Link>) que navega para /country/:cca3.
 *
 * @param country - Objeto com os dados do país
 * @param index - Posição do card na lista (para stagger de animação)
 */
export function CountryCard({ country, index }: Props) {
  // Limita o atraso máximo a 400ms para que cards distantes não demorem demais
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
