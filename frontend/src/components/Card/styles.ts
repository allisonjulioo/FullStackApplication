import styled from 'styled-components';

export const CardStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.8em 1em;
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.common.white};
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 8px 4px rgb(51 51 51 / 10%);
  }
`;
