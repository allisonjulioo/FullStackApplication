import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from 'store';
import { theme } from 'theme/theme';
import { GlobalStyle } from 'theme/global-styles';
import { Layout } from 'components/Layout';

export const App = ({ Component, pageProps }: AppProps) => {
  const [mockReady, setMockReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('enableMock')) {
      import('../src/mocks/browser').then(({ worker }) => {
        worker.start({ onUnhandledRequest: 'bypass' }).then(() => {
          setMockReady(true);
        });
      });
    } else {
      setMockReady(true);
    }
  }, []);

  if (!mockReady) return null;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
