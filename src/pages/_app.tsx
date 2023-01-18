import '@/styles/globals.css';
// import { Intser } from '@next/font/google';
import type { AppProps } from 'next/app';

// const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
