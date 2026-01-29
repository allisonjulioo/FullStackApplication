import { ProductFilters as FiltersType, SortField, SortOrder } from 'modules/Product/types';
import {
  FiltersContainer,
  FilterInput,
  Select,
  PriceGroup,
  ClearButton,
  ApplyButton,
} from './styles';

interface ProductFiltersProps {
  filters: FiltersType;
  onFilterChange: (key: keyof FiltersType, value: string) => void;
  onClear: () => void;
  onApply?: () => void;
}

export const ProductFilters = ({
  filters,
  onFilterChange,
  onClear,
  onApply,
}: ProductFiltersProps) => {
  return (
    <FiltersContainer>
      <FilterInput
        placeholder="Buscar por nome..."
        value={filters.search}
        onChange={e => onFilterChange('search', e.target.value)}
      />

      <PriceGroup>
        <FilterInput
          type="number"
          placeholder="Preço mín"
          value={filters.priceMin}
          onChange={e => onFilterChange('priceMin', e.target.value)}
        />
        <span>-</span>
        <FilterInput
          type="number"
          placeholder="Preço máx"
          value={filters.priceMax}
          onChange={e => onFilterChange('priceMax', e.target.value)}
        />
      </PriceGroup>

      <Select
        value={filters.sortField}
        onChange={e => onFilterChange('sortField', e.target.value as SortField)}
      >
        <option value="name">Nome</option>
        <option value="price">Preço</option>
        <option value="category">Categoria</option>
      </Select>

      <Select
        value={filters.sortOrder}
        onChange={e => onFilterChange('sortOrder', e.target.value as SortOrder)}
      >
        <option value="asc">Crescente</option>
        <option value="desc">Decrescente</option>
      </Select>

      <ClearButton onClick={onClear}>Limpar filtros</ClearButton>

      {onApply && (
        <ApplyButton type="button" onClick={onApply}>
          Aplicar Filtros
        </ApplyButton>
      )}
    </FiltersContainer>
  );
};
