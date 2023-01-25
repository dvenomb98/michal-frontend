import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar';
import NextRouterLoader from '../components/Assets/NextRouteLoader';
import Footer from '../components/Navbar/Footer';

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	return (
		<>
			{pathname !== '/' && <Navbar />}
			<Component {...pageProps} />
			{pathname !== '/' && <Footer />}
			<NextRouterLoader />
		</>
	);
}
