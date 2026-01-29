import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from 'modules/Product/store/productSlice';
import { useProducts } from 'modules/Product/hooks/useProducts';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const products = [
  { id: 1, name: 'Banana', category: 'Fruta', price: 5, description: 'D', image: 'i' },
  { id: 2, name: 'Arroz', category: 'Grão', price: 20, description: 'D', image: 'i' },
  { id: 3, name: 'Carne', category: 'Proteína', price: 50, description: 'D', image: 'i' },
  { id: 4, name: 'Doce', category: 'Sobremesa', price: 10, description: 'D', image: 'i' },
  { id: 5, name: 'Erva', category: 'Tempero', price: 3, description: 'D', image: 'i' },
  { id: 6, name: 'Feijão', category: 'Grão', price: 8, description: 'D', image: 'i' },
  { id: 7, name: 'Goiaba', category: 'Fruta', price: 7, description: 'D', image: 'i' },
];

const createWrapper = () => {
  const store = configureStore({ reducer: { products: productReducer } });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  return { wrapper, store };
};

describe('useProducts', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: products });
  });

  it('fetches products on mount', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    expect(result.current.allProducts.length).toBe(7);
  });

  it('paginates products (6 per page)', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    expect(result.current.products.length).toBe(6);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.page).toBe(1);
  });

  it('changes page', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    act(() => result.current.setPage(2));
    expect(result.current.page).toBe(2);
    expect(result.current.products.length).toBe(1);
  });

  it('filters by search', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    act(() => result.current.updateFilter('search', 'ban'));
    expect(result.current.allProducts.length).toBe(1);
    expect(result.current.allProducts[0].name).toBe('Banana');
  });

  it('filters by priceMin', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    act(() => result.current.updateFilter('priceMin', '10'));
    expect(result.current.allProducts.every(p => p.price >= 10)).toBe(true);
  });

  it('filters by priceMax', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    act(() => result.current.updateFilter('priceMax', '10'));
    expect(result.current.allProducts.every(p => p.price <= 10)).toBe(true);
  });

  it('sorts by price desc', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    act(() => {
      result.current.updateFilter('sortField', 'price');
      result.current.updateFilter('sortOrder', 'desc');
    });
    const prices = result.current.allProducts.map(p => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  it('sorts by category', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    act(() => result.current.updateFilter('sortField', 'category'));
    const cats = result.current.allProducts.map(p => p.category);
    for (let i = 0; i < cats.length - 1; i++) {
      expect(cats[i].localeCompare(cats[i + 1])).toBeLessThanOrEqual(0);
    }
  });

  it('clears filters', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    act(() => result.current.updateFilter('search', 'xyz'));
    expect(result.current.allProducts.length).toBe(0);
    act(() => result.current.clearFilters());
    expect(result.current.allProducts.length).toBe(7);
  });

  it('opens and closes modal', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    act(() => result.current.openModal());
    expect(result.current.modalOpen).toBe(true);
    act(() => result.current.closeModal());
    expect(result.current.modalOpen).toBe(false);
  });

  it('creates product', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { id: 8, name: 'Novo', category: 'X', price: 1, description: 'D', image: 'i' },
    });
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    await act(async () => {
      result.current.handleCreate({
        name: 'Novo',
        category: 'X',
        price: 1,
        description: 'D',
        image: 'i',
      });
    });
    expect(result.current.allProducts.find(p => p.name === 'Novo')).toBeTruthy();
  });

  it('resets page on filter change', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useProducts(), { wrapper });
    await act(async () => {});
    act(() => result.current.setPage(2));
    expect(result.current.page).toBe(2);
    act(() => result.current.updateFilter('search', ''));
    expect(result.current.page).toBe(1);
  });
});
