import Head from 'next/head';
import { Header } from 'components/Header';

export const Layout = ({ children }) => {
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
