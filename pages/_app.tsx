import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar';
import NextRouterLoader from '../components/Assets/NextRouteLoader';
import Footer from '../components/Navbar/Footer';
import { AuthContextProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const ignoringPathnames = ['/'];

  return (
    <>
      {!ignoringPathnames.includes(pathname) && <Navbar />}
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
      {!ignoringPathnames.includes(pathname) && <Footer />}
      <NextRouterLoader />
    </>
  );
}
