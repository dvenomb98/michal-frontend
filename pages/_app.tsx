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
import { DefaultSeo } from 'next-seo';
import { SeoData } from '../types/firebaseTypes';

const ignoringPathnames = ['/'];

const seoDefaultTitle = 'Perspective video';
const seoDefaultDescription =
  'Nádherné a profesionální videa ze svateb, událostí, plesů a reprezentativní reklamní videa na míru';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [openCookiesModal, setOpenCookiesModal] = useState<boolean>(false);
  const [cookies] = useCookies();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const seoData = pageProps?.data?.seoData;

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
      <DefaultSeo
        title={seoData?.title || seoDefaultTitle}
        description={seoData?.description || seoDefaultDescription}
      />
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
