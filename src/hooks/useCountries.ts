import { useState, useEffect, useMemo } from 'react';
import type { Country } from '../types/country';
import { fetchAllCountries } from '../utils/api';

/**
 * Hook responsável por buscar e armazenar a lista completa de países da API.
 * Executa a requisição uma única vez ao montar o componente (array de dependências vazio).
 * Os países retornados são ordenados alfabeticamente pelo nome comum.
 *
 * @returns Objeto com:
 *   - `countries`: array de países (vazio enquanto carrega)
 *   - `loading`: true enquanto a requisição está em andamento
 *   - `error`: mensagem de erro, ou null se não houver falha
 */
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

/**
 * Hook que filtra a lista de países com base no texto de busca e na sub-região selecionada.
 * `useMemo` para evitar reprocessamento desnecessário — o cálculo só é refeito
 * quando `countries`, `search` ou `subregion` mudam.
 *
 * @param countries - Lista completa de países
 * @param search - Texto digitado pelo usuário (filtra por nome comum ou oficial)
 * @param subregion - Sub-região selecionada no filtro (string vazia = sem filtro)
 * @returns Array de países que atendem aos critérios de busca e filtro
 */
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

/**
 * Hook que extrai e ordena todas as sub-regiões únicas presentes na lista de países.
 * Usado para popular o componente SubregionFilter com as opções disponíveis.
 * Usa `useMemo` para que o cálculo só ocorra quando a lista de países mudar.
 *
 * @param countries - Lista completa de países
 * @returns Array de strings com as sub-regiões únicas, em ordem alfabética
 */
export function useSubregions(countries: Country[]): string[] {
  return useMemo(() => {
    const set = new Set<string>();
    countries.forEach(c => { if (c.subregion) set.add(c.subregion); });
    return Array.from(set).sort();
  }, [countries]);
}
