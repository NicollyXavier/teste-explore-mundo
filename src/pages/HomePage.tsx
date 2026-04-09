import { useState } from 'react';
import { useCountries, useFilteredCountries, useSubregions } from '../hooks/useCountries';
import { CountryCard } from '../components/CountryCard';
import { SearchBar } from '../components/SearchBar';
import { SubregionFilter } from '../components/SubregionFilter';
import styles from './HomePage.module.css';

export function HomePage() {
  const { countries, loading, error } = useCountries();
  const [search, setSearch] = useState('');
  const [subregion, setSubregion] = useState('');

  const subregions = useSubregions(countries);
  const filtered = useFilteredCountries(countries, search, subregion);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Explore o Mundo</p>
        <h1 className={styles.heroTitle}>Cada nação,<br />em um só lugar.</h1>
        <p className={styles.heroSub}>
          {countries.length > 0
            ? `${countries.length} países · Pesquise, Filtre, Descubra`
            : 'Pesquise, Filtre, Descubra'}
        </p>
        <p className={styles.heroSub}>
          Digite o nome dos países em inglês!
        </p>
      </section>

      <div className={styles.toolbar}>
        <SearchBar value={search} onChange={setSearch} />
        <SubregionFilter
          subregions={subregions}
          selected={subregion}
          onChange={setSubregion}
        />
        {(search || subregion) && (
          <button
            className={styles.clearAll}
            onClick={() => { setSearch(''); setSubregion(''); }}
          >
            Clear filters
          </button>
        )}
      </div>

      {(search || subregion) && !loading && (
        <p className={styles.resultCount}>
          {filtered.length === 0
            ? 'Nenhum país encontrado'
            : `${filtered.length} país${filtered.length === 1 ? '' : 'es'} encontrado${filtered.length === 1 ? '' : 's'}`}
        </p>
      )}

      {error && (
        <div className={styles.error}>
          <p>⚠ Não foi possível carregar os países. Verifique sua conexão e tente novamente</p>
          <p className={styles.errorDetail}>{error}</p>
        </div>
      )}

      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((country, i) => (
            <CountryCard key={country.cca3} country={country} index={i} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && !error && (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>◌</span>
          <p className={styles.emptyTitle}>Nenhum resultado</p>
          <p className={styles.emptySub}>Tente uma pesquisa ou filtro diferente.</p>
        </div>
      )}
    </main>
  );
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={`${styles.skeletonFlag} skeleton`} />
      <div className={styles.skeletonBody}>
        <div className={`${styles.skeletonLine} skeleton`} style={{ width: '65%', height: 18 }} />
        <div className={`${styles.skeletonLine} skeleton`} style={{ width: '45%', height: 13, marginTop: 6 }} />
        <div className={`${styles.skeletonLine} skeleton`} style={{ width: '80%', height: 13, marginTop: 16 }} />
      </div>
    </div>
  );
}
