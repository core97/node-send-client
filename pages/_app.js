import { Layout } from 'components/Layout';
import AuthState from 'contexts/auth/authState';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthState>
  );
}

export default MyApp;
