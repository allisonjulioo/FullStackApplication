import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/theme';
import { ProductCard } from 'modules/Product/components/ProductCard';
import { ProductList } from 'modules/Product/components/ProductList';
import { ProductFilters } from 'modules/Product/components/ProductFilters';
import { ProductForm } from 'modules/Product/components/ProductForm';
import { Pagination } from 'modules/Product/components/Pagination';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockProduct = {
  id: 1,
  name: 'Produto Teste',
  category: 'Categoria',
  price: 199.9,
  description: 'Descrição do produto teste',
  image: 'https://example.com/img.jpg',
};

describe('ProductCard', () => {
  it('renders product info', () => {
    render(<ProductCard product={mockProduct} index={0} />, {
      wrapper: Wrapper,
    });
    expect(screen.getByText('Produto Teste')).toBeTruthy();
    expect(screen.getByText('Categoria')).toBeTruthy();
    expect(screen.getByAltText('Produto Teste')).toBeTruthy();
  });
});

describe('ProductList', () => {
  it('renders list of products', () => {
    render(<ProductList products={[mockProduct]} />, { wrapper: Wrapper });
    expect(screen.getByText('Produto Teste')).toBeTruthy();
  });

  it('renders empty list', () => {
    render(<ProductList products={[]} />, { wrapper: Wrapper });
    expect(screen.queryByText('Produto Teste')).toBeNull();
  });
});

describe('ProductFilters', () => {
  it('renders all filter fields', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    render(
      <ProductFilters
        filters={{
          search: '',
          priceMin: '',
          priceMax: '',
          sortField: 'name',
          sortOrder: 'asc',
        }}
        onFilterChange={onChange}
        onClear={onClear}
      />,
      { wrapper: Wrapper },
    );
    expect(screen.getByPlaceholderText('Buscar por nome...')).toBeTruthy();
    expect(screen.getByPlaceholderText('Preço mín')).toBeTruthy();
    expect(screen.getByPlaceholderText('Preço máx')).toBeTruthy();
    expect(screen.getByText('Limpar filtros')).toBeTruthy();
  });

  it('calls onFilterChange on input', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    render(
      <ProductFilters
        filters={{
          search: '',
          priceMin: '',
          priceMax: '',
          sortField: 'name',
          sortOrder: 'asc',
        }}
        onFilterChange={onChange}
        onClear={onClear}
      />,
      { wrapper: Wrapper },
    );
    fireEvent.change(screen.getByPlaceholderText('Buscar por nome...'), {
      target: { value: 'test' },
    });
    expect(onChange).toHaveBeenCalledWith('search', 'test');
  });

  it('calls onFilterChange on price min', () => {
    const onChange = jest.fn();
    render(
      <ProductFilters
        filters={{
          search: '',
          priceMin: '',
          priceMax: '',
          sortField: 'name',
          sortOrder: 'asc',
        }}
        onFilterChange={onChange}
        onClear={jest.fn()}
      />,
      { wrapper: Wrapper },
    );
    fireEvent.change(screen.getByPlaceholderText('Preço mín'), {
      target: { value: '100' },
    });
    expect(onChange).toHaveBeenCalledWith('priceMin', '100');
  });

  it('calls onFilterChange on price max', () => {
    const onChange = jest.fn();
    render(
      <ProductFilters
        filters={{
          search: '',
          priceMin: '',
          priceMax: '',
          sortField: 'name',
          sortOrder: 'asc',
        }}
        onFilterChange={onChange}
        onClear={jest.fn()}
      />,
      { wrapper: Wrapper },
    );
    fireEvent.change(screen.getByPlaceholderText('Preço máx'), {
      target: { value: '500' },
    });
    expect(onChange).toHaveBeenCalledWith('priceMax', '500');
  });

  it('calls onFilterChange on sort field change', () => {
    const onChange = jest.fn();
    render(
      <ProductFilters
        filters={{
          search: '',
          priceMin: '',
          priceMax: '',
          sortField: 'name',
          sortOrder: 'asc',
        }}
        onFilterChange={onChange}
        onClear={jest.fn()}
      />,
      { wrapper: Wrapper },
    );
    fireEvent.change(screen.getByDisplayValue('Nome'), {
      target: { value: 'price' },
    });
    expect(onChange).toHaveBeenCalledWith('sortField', 'price');
  });

  it('calls onFilterChange on sort order change', () => {
    const onChange = jest.fn();
    render(
      <ProductFilters
        filters={{
          search: '',
          priceMin: '',
          priceMax: '',
          sortField: 'name',
          sortOrder: 'asc',
        }}
        onFilterChange={onChange}
        onClear={jest.fn()}
      />,
      { wrapper: Wrapper },
    );
    fireEvent.change(screen.getByDisplayValue('Crescente'), {
      target: { value: 'desc' },
    });
    expect(onChange).toHaveBeenCalledWith('sortOrder', 'desc');
  });

  it('calls onClear', () => {
    const onClear = jest.fn();
    render(
      <ProductFilters
        filters={{
          search: '',
          priceMin: '',
          priceMax: '',
          sortField: 'name',
          sortOrder: 'asc',
        }}
        onFilterChange={jest.fn()}
        onClear={onClear}
      />,
      { wrapper: Wrapper },
    );
    fireEvent.click(screen.getByText('Limpar filtros'));
    expect(onClear).toHaveBeenCalled();
  });

  it('renders and calls onApply', () => {
    const onApply = jest.fn();
    render(
      <ProductFilters
        filters={{
          search: '',
          priceMin: '',
          priceMax: '',
          sortField: 'name',
          sortOrder: 'asc',
        }}
        onFilterChange={jest.fn()}
        onClear={jest.fn()}
        onApply={onApply}
      />,
      { wrapper: Wrapper },
    );
    fireEvent.click(screen.getByText('Aplicar Filtros'));
    expect(onApply).toHaveBeenCalled();
  });
});

describe('ProductForm', () => {
  it('renders form fields', () => {
    render(<ProductForm onSubmit={jest.fn()} />, { wrapper: Wrapper });
    expect(screen.getByText('Novo Produto')).toBeTruthy();
    expect(screen.getByPlaceholderText('Nome do produto')).toBeTruthy();
    expect(screen.getByPlaceholderText('Categoria')).toBeTruthy();
    expect(screen.getByPlaceholderText('Preço')).toBeTruthy();
    expect(screen.getByPlaceholderText('Descrição')).toBeTruthy();
    expect(screen.getByPlaceholderText('URL da imagem')).toBeTruthy();
    expect(screen.getByText('Cadastrar')).toBeTruthy();
  });

  it('submits form with valid data', () => {
    const onSubmit = jest.fn();
    render(<ProductForm onSubmit={onSubmit} />, { wrapper: Wrapper });

    fireEvent.change(screen.getByPlaceholderText('Nome do produto'), {
      target: { value: 'Produto' },
    });
    fireEvent.change(screen.getByPlaceholderText('Categoria'), {
      target: { value: 'Cat' },
    });
    fireEvent.change(screen.getByPlaceholderText('Preço'), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByPlaceholderText('Descrição'), {
      target: { value: 'Desc' },
    });
    fireEvent.change(screen.getByPlaceholderText('URL da imagem'), {
      target: { value: 'https://img.com/a.jpg' },
    });

    fireEvent.click(screen.getByText('Cadastrar'));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Produto',
      category: 'Cat',
      price: 100,
      description: 'Desc',
      image: 'https://img.com/a.jpg',
    });
  });

  it('does not submit with empty fields', () => {
    const onSubmit = jest.fn();
    render(<ProductForm onSubmit={onSubmit} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Cadastrar'));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('Pagination', () => {
  it('renders page buttons', () => {
    const onChange = jest.fn();
    render(<Pagination page={1} totalPages={3} onPageChange={onChange} />, {
      wrapper: Wrapper,
    });
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('does not render when totalPages is 1', () => {
    const { container } = render(
      <Pagination page={1} totalPages={1} onPageChange={jest.fn()} />,
      { wrapper: Wrapper },
    );
    expect(container.innerHTML).toBe('');
  });

  it('calls onPageChange on click', () => {
    const onChange = jest.fn();
    render(<Pagination page={1} totalPages={3} onPageChange={onChange} />, {
      wrapper: Wrapper,
    });
    fireEvent.click(screen.getByText('2'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange on next', () => {
    const onChange = jest.fn();
    render(<Pagination page={1} totalPages={3} onPageChange={onChange} />, {
      wrapper: Wrapper,
    });
    fireEvent.click(screen.getByText('→'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange on prev', () => {
    const onChange = jest.fn();
    render(<Pagination page={2} totalPages={3} onPageChange={onChange} />, {
      wrapper: Wrapper,
    });
    fireEvent.click(screen.getByText('←'));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('disables prev on first page', () => {
    render(
      <Pagination page={1} totalPages={3} onPageChange={jest.fn()} />,
      { wrapper: Wrapper },
    );
    expect((screen.getByText('←') as HTMLButtonElement).disabled).toBe(true);
  });

  it('disables next on last page', () => {
    render(
      <Pagination page={3} totalPages={3} onPageChange={jest.fn()} />,
      { wrapper: Wrapper },
    );
    expect((screen.getByText('→') as HTMLButtonElement).disabled).toBe(true);
  });
});
