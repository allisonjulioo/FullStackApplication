import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from 'modules/Product/store/productSlice';
import { theme } from 'theme/theme';

import Home from '../../pages/index';

jest.mock('next/head', () => {
  const MockHead = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(React.Fragment, null, children);
  };
  return { __esModule: true, default: MockHead };
});

const createTestStore = () =>
  configureStore({
    reducer: { products: productReducer },
    preloadedState: {
      products: {
        products: [
          {
            id: 1,
            name: 'Produto Teste',
            category: 'Teste',
            price: 99.9,
            description: 'Descrição teste',
            image: 'https://example.com/img.jpg',
          },
        ],
        loading: false,
        modalOpen: false,
      },
    },
  });

describe('Home Page Snapshot', () => {
  it('should match snapshot', () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
