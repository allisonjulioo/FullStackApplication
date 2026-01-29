import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Content = styled.div`
  width: 100%;
  margin: 0 1em;
  main {
    width: 100%;
    max-width: 1024px;
    padding: 3em 0;
    margin: 0 auto;

    @media (max-width: ${({ theme }) => theme.breakpointMD}) {
      padding: 1em 0;
    }
    > h2 {
      margin-bottom: 0.5em;
    }
  }
`;

export const Head = styled.nav`
  width: 100%;
  height: 48px;
  padding: 1em 0;
  margin: 0 0 1em;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.main};
  display: flex;
  align-items: center;
  justify-content: space-between;
  section {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const LogoText = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-size: 16px !important;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
`;
