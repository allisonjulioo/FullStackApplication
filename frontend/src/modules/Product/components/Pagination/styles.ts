import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  margin-top: 2em;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  border: 1px solid ${({ theme }) => theme.palette.grey.main};
  background: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.common.white};
  color: ${({ active, theme }) =>
    active ? theme.palette.primary.contrastText : theme.typography.color};
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius};
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 14px;

  &:hover {
    filter: brightness(95%);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
