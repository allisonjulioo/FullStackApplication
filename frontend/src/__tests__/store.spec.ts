import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import productReducer, {
  fetchProducts,
  createProduct,
  toggleModal,
} from 'modules/Product/store/productSlice';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const createTestStore = () =>
  configureStore({ reducer: { products: productReducer } });

describe('productSlice', () => {
  it('has correct initial state', () => {
    const store = createTestStore();
    expect(store.getState().products).toEqual({
      products: [],
      loading: false,
      modalOpen: false,
    });
  });

  it('toggleModal sets modalOpen', () => {
    const store = createTestStore();
    store.dispatch(toggleModal(true));
    expect(store.getState().products.modalOpen).toBe(true);
    store.dispatch(toggleModal(false));
    expect(store.getState().products.modalOpen).toBe(false);
  });

  it('fetchProducts fulfilled', async () => {
    const products = [
      {
        id: 1,
        name: 'Test',
        category: 'Cat',
        price: 10,
        description: 'Desc',
        image: 'img',
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: products });
    const store = createTestStore();
    await store.dispatch(fetchProducts());
    expect(store.getState().products.products).toEqual(products);
    expect(store.getState().products.loading).toBe(false);
  });

  it('fetchProducts pending sets loading', () => {
    mockedAxios.get.mockReturnValueOnce(new Promise(() => {}));
    const store = createTestStore();
    store.dispatch(fetchProducts());
    expect(store.getState().products.loading).toBe(true);
  });

  it('fetchProducts rejected sets loading false', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('fail'));
    const store = createTestStore();
    await store.dispatch(fetchProducts());
    expect(store.getState().products.loading).toBe(false);
  });

  it('createProduct fulfilled adds product and closes modal', async () => {
    const newProduct = {
      id: 2,
      name: 'New',
      category: 'Cat',
      price: 20,
      description: 'D',
      image: 'i',
    };
    mockedAxios.post.mockResolvedValueOnce({ data: newProduct });
    const store = createTestStore();
    store.dispatch(toggleModal(true));
    await store.dispatch(
      createProduct({
        name: 'New',
        category: 'Cat',
        price: 20,
        description: 'D',
        image: 'i',
      }),
    );
    expect(store.getState().products.products).toContainEqual(newProduct);
    expect(store.getState().products.modalOpen).toBe(false);
  });
});
