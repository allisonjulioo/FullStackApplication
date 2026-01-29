import styled from 'styled-components';

export const ButtonStyled = styled.button`
  border: 0;
  padding: 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  border-radius: ${({ theme }) => theme.radius};
  padding: 12px 36px;

  &:hover {
    filter: brightness(120%);
  }

  &:active {
    background: ${({ theme }) => theme.palette.primary.main};
    box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
  }
`;
