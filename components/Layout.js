import Head from 'next/head';
import { useContext, useEffect } from 'react';
import authContext from 'contexts/auth/authContext';
import { Header } from 'components/Header';

export const Layout = ({ children }) => {
  const AuthContext = useContext(authContext);
  const { userAuthenticated } = AuthContext;

  useEffect(() => {
    userAuthenticated();
  }, []);

  return (
    <>
      <Head>
        <title>Node Send</title>
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <Header />
          <main className="mt-20">{children}</main>
        </div>
      </div>
    </>
  );
};
