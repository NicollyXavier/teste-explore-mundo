import styles from './SubregionFilter.module.css';

interface Props {
  subregions: string[];
  selected: string;
  onChange: (val: string) => void;
}

/**
 * Dropdown (select) para filtrar países por sub-região.
 *
 * A primeira opção ("Todas as Sub-Regiões") tem valor "" e representa
 * a ausência de filtro — quando selecionada, todos os países são exibidos.
 *
 * @param subregions - Array com os nomes das sub-regiões disponíveis
 * @param selected - Valor da sub-região selecionada no momento
 * @param onChange - Função chamada com a nova sub-região ao mudar a seleção
 */
export function SubregionFilter({ subregions, selected, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <select
        value={selected}
        onChange={e => onChange(e.target.value)}
        className={styles.select}
        aria-label="Filter by sub-region"
      >
        <option value="">Todas as Sub-Regiões</option>
        {subregions.map(sr => (
          <option key={sr} value={sr}>{sr}</option>
        ))}
      </select>
      <svg className={styles.chevron} viewBox="0 0 12 8" fill="none">
        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
