import '../styles/globals.css'; // Import global styles
import type { AppProps } from 'next/app';
import Header from '../components/Header'; // Import the Header component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
