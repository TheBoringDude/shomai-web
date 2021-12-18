import WaxAuthProvider from '@cryptopuppie/next-waxauth';
import { UseEOSProvider } from '@cryptopuppie/useeoschain';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from '../layouts/Default';
import { chainId, dapp, endpoint } from '../lib/waxnet';
import '../styles/tailwind.css';

export default function ShomaiBlends({ Component, pageProps }: AppProps) {
  return (
    <WaxAuthProvider net={{ endpoint, chainId, dApp: dapp }}>
      <UseEOSProvider endpoint={endpoint}>
        <DefaultLayout>
          <Component {...pageProps} />

          <ToastContainer
            closeOnClick
            autoClose={5000}
            draggable
            theme="colored"
            className="text-sm"
          />
        </DefaultLayout>
      </UseEOSProvider>
    </WaxAuthProvider>
  );
}
