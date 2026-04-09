import { useState, useEffect, useMemo } from 'react';
import type { Country } from '../types/country';
import { fetchAllCountries } from '../utils/api';

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllCountries()
      .then(data => {
        setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { countries, loading, error };
}

export function useFilteredCountries(
  countries: Country[],
  search: string,
  subregion: string
) {
  return useMemo(() => {
    let result = countries;

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter(c =>
        c.name.common.toLowerCase().includes(query) ||
        c.name.official.toLowerCase().includes(query)
      );
    }

    if (subregion) {
      result = result.filter(c => c.subregion === subregion);
    }

    return result;
  }, [countries, search, subregion]);
}

export function useSubregions(countries: Country[]): string[] {
  return useMemo(() => {
    const set = new Set<string>();
    countries.forEach(c => { if (c.subregion) set.add(c.subregion); });
    return Array.from(set).sort();
  }, [countries]);
}
