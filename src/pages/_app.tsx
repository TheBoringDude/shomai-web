import type { AppProps } from 'next/app';
import DefaultLayout from '../layouts/Default';
import '../styles/tailwind.css';

export default function CryptoPups({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}
