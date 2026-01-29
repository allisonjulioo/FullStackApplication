import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'store';
import {
  fetchProducts,
  createProduct,
  toggleModal,
} from '../store/productSlice';
import { Product, ProductFilters, SortField, SortOrder } from '../types';

const ITEMS_PER_PAGE = 6;

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, modalOpen } = useSelector(
    (state: RootState) => state.products,
  );

  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    priceMin: '',
    priceMax: '',
    sortField: 'name',
    sortOrder: 'asc',
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(s));
    }

    if (filters.priceMin) {
      result = result.filter(p => p.price >= Number(filters.priceMin));
    }

    if (filters.priceMax) {
      result = result.filter(p => p.price <= Number(filters.priceMax));
    }

    result.sort((a, b) => {
      const field = filters.sortField;
      const order = filters.sortOrder === 'asc' ? 1 : -1;
      if (field === 'price') {
        return (a.price - b.price) * order;
      }
      return a[field].localeCompare(b[field]) * order;
    });

    return result;
  }, [products, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      priceMin: '',
      priceMax: '',
      sortField: 'name',
      sortOrder: 'asc',
    });
    setPage(1);
  }, []);

  const updateFilter = useCallback(
    (key: keyof ProductFilters, value: string) => {
      setFilters(prev => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [],
  );

  const handleCreate = useCallback(
    (product: Omit<Product, 'id'>) => {
      dispatch(createProduct(product));
    },
    [dispatch],
  );

  const openModal = useCallback(() => dispatch(toggleModal(true)), [dispatch]);
  const closeModal = useCallback(
    () => dispatch(toggleModal(false)),
    [dispatch],
  );

  return {
    products: paginated,
    allProducts: filtered,
    loading,
    modalOpen,
    filters,
    page: currentPage,
    totalPages,
    setPage,
    updateFilter,
    clearFilters,
    handleCreate,
    openModal,
    closeModal,
  };
};
