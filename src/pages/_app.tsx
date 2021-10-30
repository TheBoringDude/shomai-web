import type { AppProps } from 'next/app';
import DefaultLayout from '../layouts/Default';
import AuthProvider from '../modules/auth/provider';
import '../styles/tailwind.css';

export default function ShomaiBlends({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AuthProvider>
  );
}
