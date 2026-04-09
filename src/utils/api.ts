import type { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

const LIST_FIELDS = 'name,flags,population,region,subregion,capital,cca3';

const DETAIL_FIELDS = 'name,flags,population,region,subregion,capital,languages,currencies,borders,area,timezones,continents,cca3,cca2,tld,independent,maps,coatOfArms,car,latlng,landlocked';

export async function fetchAllCountries(): Promise<Country[]> {
  const res = await fetch(`${BASE_URL}/all?fields=${LIST_FIELDS}`);
  if (!res.ok) throw new Error('Failed to fetch countries');
  return res.json();
}

export async function fetchCountryByCode(code: string): Promise<Country> {
  const res = await fetch(`${BASE_URL}/alpha/${code}?fields=${DETAIL_FIELDS}`);
  if (!res.ok) throw new Error(`Failed to fetch country: ${code}`);
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function fetchCountriesByCodes(codes: string[]): Promise<Country[]> {
  if (!codes.length) return [];
  const res = await fetch(`${BASE_URL}/alpha?codes=${codes.join(',')}&fields=name,flags,cca3`);
  if (!res.ok) return [];
  return res.json();
}

export function formatPopulation(pop: number): string {
  if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`;
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(0)}K`;
  return pop.toString();
}

export function formatArea(area: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(area)) + ' km²';
}
