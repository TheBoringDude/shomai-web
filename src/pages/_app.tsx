import WaxAuthProvider from '@cryptopuppie/next-waxauth';
import type { AppProps } from 'next/app';
import DefaultLayout from '../layouts/Default';
import { chainId, dapp, endpoint } from '../lib/waxnet';
import '../styles/tailwind.css';

export default function ShomaiBlends({ Component, pageProps }: AppProps) {
  return (
    <WaxAuthProvider net={{ endpoint, chainId, dApp: dapp }}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </WaxAuthProvider>
  );
}
