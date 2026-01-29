import styled from 'styled-components';

export const LoadingContainer = styled.div`
  background-color: ${({ theme }) => theme.common.white};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  z-index: 0;
  gap: 4em;

  > div {
    background-color: ${({ theme }) => theme.palette.primary.main};
    z-index: 1;
    width: 50px;
    height: 50px;
  }
  > h4 {
    color: ${({ theme }) => theme.common.black};
  }
`;
