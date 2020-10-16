import { Layout } from 'components/Layout';
import AuthState from 'contexts/auth/authState';
import AppState from 'contexts/app/appState';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <AppState>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppState>
    </AuthState>
  );
}

export default MyApp;
