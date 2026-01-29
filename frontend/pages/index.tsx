import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Empty } from 'components/Empty';
import { UniversalLoading } from 'components/UniversalLoading';
import { useProducts } from 'modules/Product/hooks/useProducts';
import { ProductList } from 'modules/Product/components/ProductList';
import { ProductFilters } from 'modules/Product/components/ProductFilters';
import { ProductForm } from 'modules/Product/components/ProductForm';
import { Pagination } from 'modules/Product/components/Pagination';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1em;
`;

const ResultCount = styled.span`
  color: #949494;
`;

const DesktopButton = styled(Button)`
  @media (max-width: ${({ theme }) => theme.breakpointMD}) {
    display: none;
  }
`;

const DesktopFilters = styled.div`
  margin-top: 1.5em;

  @media (max-width: ${({ theme }) => theme.breakpointMD}) {
    display: none;
  }
`;

const ModalFilterTitle = styled.h3`
  margin-bottom: 1em;
  padding-top: 1em;
`;

const FabContainer = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpointMD}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 5;
  }
`;

const Fab = styled.button<{ $size?: number }>`
  width: ${({ $size }) => $size || 56}px;
  height: ${({ $size }) => $size || 56}px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:active {
    transform: scale(0.92);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
`;

const FabFilter = styled(Fab)`
  background: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  font-size: 20px;
`;

const FabAdd = styled(Fab)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 28px;
`;

export const Home = () => {
  const {
    products,
    allProducts,
    loading,
    modalOpen,
    filters,
    page,
    totalPages,
    setPage,
    updateFilter,
    clearFilters,
    handleCreate,
    openModal,
    closeModal,
  } = useProducts();

  const [filterModalOpen, setFilterModalOpen] = useState(false);

  if (loading && allProducts.length === 0) {
    return <UniversalLoading />;
  }

  return (
    <>
      <Head>
        <title>Product Manager</title>
      </Head>

      <Header>
        <div>
          <h2>Produtos</h2>
          <ResultCount>{allProducts.length} produto(s) encontrado(s)</ResultCount>
        </div>
        <DesktopButton onClick={openModal}>Novo Produto</DesktopButton>
      </Header>

      <DesktopFilters>
        <ProductFilters
          filters={filters}
          onFilterChange={updateFilter}
          onClear={clearFilters}
        />
      </DesktopFilters>

      {products.length === 0 ? (
        <Empty />
      ) : (
        <>
          <ProductList products={products} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <FabContainer>
        <FabFilter
          $size={48}
          onClick={() => setFilterModalOpen(true)}
          aria-label="Filtros"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
        </FabFilter>
        <FabAdd $size={56} onClick={openModal} aria-label="Novo produto">
          +
        </FabAdd>
      </FabContainer>

      <Modal open={filterModalOpen} onClose={() => setFilterModalOpen(false)} fullscreen>
        <ModalFilterTitle>Filtros</ModalFilterTitle>
        <ProductFilters
          filters={filters}
          onFilterChange={updateFilter}
          onClear={clearFilters}
          onApply={() => setFilterModalOpen(false)}
        />
      </Modal>

      <Modal open={modalOpen} onClose={closeModal} fullscreen>
        <ProductForm onSubmit={handleCreate} />
      </Modal>
    </>
  );
};

export default Home;
