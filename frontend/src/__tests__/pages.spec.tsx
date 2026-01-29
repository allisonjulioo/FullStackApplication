import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from 'modules/Product/store/productSlice';
import { theme } from 'theme/theme';
import Home from '../../pages/index';
import App from '../../pages/_app';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/head', () => {
  const MockHead = ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children);
  return { __esModule: true, default: MockHead };
});

const createStore = (preloaded?: any) =>
  configureStore({
    reducer: { products: productReducer },
    preloadedState: preloaded,
  });

const renderHome = (preloaded?: any) => {
  const store = createStore(preloaded);
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </Provider>,
  );
};

describe('Home page', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: [] });
  });

  it('shows loading when loading with no products', async () => {
    mockedAxios.get.mockReturnValueOnce(new Promise(() => {}));
    const store = createStore({
      products: { products: [], loading: true, modalOpen: false },
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Home />
          </ThemeProvider>
        </Provider>,
      );
    });
    expect(screen.getByText('Carregando produtos...')).toBeTruthy();
  });

  it('shows empty state when no products', async () => {
    await act(async () => {
      renderHome();
    });
    expect(screen.getByText('Nenhum produto encontrado')).toBeTruthy();
  });

  it('shows products and pagination', async () => {
    const products = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      category: 'Cat',
      price: 10 * (i + 1),
      description: 'Desc',
      image: 'https://img.com/a.jpg',
    }));
    mockedAxios.get.mockResolvedValueOnce({ data: products });
    await act(async () => {
      renderHome();
    });
    expect(screen.getByText('Product 1')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('opens product modal on desktop button', async () => {
    await act(async () => {
      renderHome();
    });
    fireEvent.click(screen.getAllByText('Novo Produto')[0]);
    expect(screen.getByPlaceholderText('Nome do produto')).toBeTruthy();
  });

  it('opens filter modal on FAB click', async () => {
    await act(async () => {
      renderHome();
    });
    fireEvent.click(screen.getByLabelText('Filtros'));
    expect(screen.getAllByPlaceholderText('Buscar por nome...').length).toBeGreaterThanOrEqual(1);
  });

  it('opens filter modal and clicks apply', async () => {
    await act(async () => {
      renderHome();
    });
    fireEvent.click(screen.getByLabelText('Filtros'));
    expect(screen.getByText('Aplicar Filtros')).toBeTruthy();
    fireEvent.click(screen.getByText('Aplicar Filtros'));
  });

  it('opens filter modal and clicks close', async () => {
    await act(async () => {
      renderHome();
    });
    fireEvent.click(screen.getByLabelText('Filtros'));
    const closeButtons = screen.getAllByTestId('modal-close');
    fireEvent.click(closeButtons[0]);
  });

  it('opens product modal on FAB click', async () => {
    await act(async () => {
      renderHome();
    });
    fireEvent.click(screen.getByLabelText('Novo produto'));
    expect(screen.getByPlaceholderText('Nome do produto')).toBeTruthy();
  });
});

describe('_app', () => {
  it('renders the page component', () => {
    const TestPage = () => <p>Test page</p>;
    render(<App Component={TestPage} pageProps={{}} router={{} as any} />);
    expect(screen.getByText('Test page')).toBeTruthy();
    expect(screen.getByText('Product Manager')).toBeTruthy();
  });
});
