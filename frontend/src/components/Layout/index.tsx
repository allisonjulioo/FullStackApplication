import { PropsWithChildren } from 'react';
import { Container, Content, Head, LogoText } from './styles';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Content>
        <Head>
          <section>
            <LogoText>Product Manager</LogoText>
          </section>
        </Head>
        <main>{children}</main>
      </Content>
    </Container>
  );
};
