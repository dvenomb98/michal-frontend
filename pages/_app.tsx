import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar';
import NextRouterLoader from '../components/Assets/NextRouteLoader';
import Footer from '../components/Navbar/Footer';
import { AuthContextProvider } from '../context/AuthContext';
import { CookiesProvider, useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import CookiesModal from '../components/Cookies/CookiesModal';

const ignoringPathnames = ['/'];

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [openCookiesModal, setOpenCookiesModal] = useState<boolean>(false);
  const [cookies] = useCookies();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    if (typeof cookies.analytics === 'undefined' || typeof cookies.required === 'undefined') {
      setOpenCookiesModal(true);
      return;
    }
  }, [isLoaded]);

  return (
    <>
      {!ignoringPathnames.includes(pathname) && <Navbar />}
      <AuthContextProvider>
        <CookiesProvider>
          <CookiesModal open={openCookiesModal} setOpen={setOpenCookiesModal} />
          <Component {...pageProps} />
        </CookiesProvider>
      </AuthContextProvider>
      {!ignoringPathnames.includes(pathname) && <Footer />}
      <NextRouterLoader />
    </>
  );
}
