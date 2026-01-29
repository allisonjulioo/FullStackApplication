import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import { theme } from 'theme/theme';
import { Card } from 'components/Card';
import { Layout } from 'components/Layout';
import { Modal } from 'components/Modal';
import { Empty } from 'components/Empty';
import { UniversalLoading } from 'components/UniversalLoading';
import productReducer from 'modules/Product/store/productSlice';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>, { wrapper: Wrapper });
    expect(screen.getByText('Card content')).toBeTruthy();
  });
});

describe('Layout', () => {
  it('renders children and header', () => {
    render(
      <Layout>
        <p>Page content</p>
      </Layout>,
      { wrapper: Wrapper },
    );
    expect(screen.getByText('Product Manager')).toBeTruthy();
    expect(screen.getByText('Page content')).toBeTruthy();
  });
});

describe('Modal', () => {
  it('renders children when open', () => {
    const onClose = jest.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
      { wrapper: Wrapper },
    );
    expect(screen.getByText('Modal content')).toBeTruthy();
  });

  it('does not render children when closed', () => {
    const onClose = jest.fn();
    render(
      <Modal open={false} onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
      { wrapper: Wrapper },
    );
    expect(screen.queryByText('Modal content')).toBeNull();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
      { wrapper: Wrapper },
    );
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
      { wrapper: Wrapper },
    );
    fireEvent.click(screen.getByTestId('modal-close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders with fullscreen prop', () => {
    const onClose = jest.fn();
    render(
      <Modal open={true} onClose={onClose} fullscreen>
        <p>Fullscreen</p>
      </Modal>,
      { wrapper: Wrapper },
    );
    expect(screen.getByText('Fullscreen')).toBeTruthy();
  });
});

describe('Empty', () => {
  it('renders default text', () => {
    render(<Empty />, { wrapper: Wrapper });
    expect(screen.getByText('Nenhum produto encontrado')).toBeTruthy();
    expect(
      screen.getByText('Tente ajustar os filtros ou cadastre um novo produto.'),
    ).toBeTruthy();
  });

  it('renders custom text', () => {
    render(<Empty text="Custom empty" />, { wrapper: Wrapper });
    expect(screen.getByText('Custom empty')).toBeTruthy();
  });
});

describe('UniversalLoading', () => {
  it('renders loading text', () => {
    render(<UniversalLoading />, { wrapper: Wrapper });
    expect(screen.getByText('Carregando produtos...')).toBeTruthy();
  });
});
