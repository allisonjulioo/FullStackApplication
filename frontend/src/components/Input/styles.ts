import styled from 'styled-components';

export const InputStyled = styled.input`
  background: ${({ theme }) => theme.common.white};
  color: ${({ theme }) => theme.typography.color};
  border: 1px solid ${({ theme }) => theme.palette.grey.main};
  padding: 1em;
  border-radius: ${({ theme }) => theme.radius};
`;
