import { PaginationContainer, PageButton } from './styles';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer>
      <PageButton disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        ←
      </PageButton>
      {pages.map(p => (
        <PageButton key={p} active={p === page} onClick={() => onPageChange(p)}>
          {p}
        </PageButton>
      ))}
      <PageButton
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        →
      </PageButton>
    </PaginationContainer>
  );
};
