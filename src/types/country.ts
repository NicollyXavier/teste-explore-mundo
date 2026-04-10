/**
 * Interface principal que representa um país retornado pela API RestCountries.
 * Todos os campos opcionais (?) podem não estar presentes para todos os países.
 */
export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  borders?: string[];
  area?: number;
  timezones?: string[];
  continents?: string[];
  cca3: string;
  cca2: string;
  tld?: string[];
  independent?: boolean;
  maps?: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  car?: {
    signs?: string[];
    side?: string;
  };
  latlng?: [number, number];
  landlocked?: boolean;
}
