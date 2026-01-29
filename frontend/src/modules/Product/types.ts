export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export type SortField = 'name' | 'price' | 'category';
export type SortOrder = 'asc' | 'desc';

export interface ProductFilters {
  search: string;
  priceMin: string;
  priceMax: string;
  sortField: SortField;
  sortOrder: SortOrder;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  modalOpen: boolean;
}
