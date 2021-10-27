import { useState } from 'react';
import { SimpleModal } from 'unstyled-lightbox';
import { useHasMounted } from '../../hooks/useHasMounted';

const HomeLogin = () => {
  const mounted = useHasMounted;
  const [open, setOpen] = useState(false);

  if (!mounted) return;

  return (
    <>
      <SimpleModal
        open={open}
        onClose={() => setOpen(false)}
        className="fixed w-full h-full bg-black/60 z-50 inset-0 flex items-center justify-center"
        overlayClassname="absolute h-full w-full z-30"
      >
        <div className="z-50 bg-white w-full max-w-lg rounded-xl p-8 text-center">
          <h4 className="font-bold text-xl text-gunmetal">Authenticate your Wax Wallet</h4>

          <div className="mt-6 flex flex-col">
            <button
              className="my-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md px-4 text-lg"
              type="button"
            >
              Login with Wax Cloud Wallet
            </button>

            <button
              className="my-1 bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md px-4 text-lg"
              type="button"
            >
              Login with Anchor
            </button>
          </div>
        </div>
      </SimpleModal>

      <button
        onClick={() => setOpen(true)}
        className="tracking-wide hover:text-atomic-tangerine"
        type="button"
      >
        Wallet Login
      </button>
    </>
  );
};

export default HomeLogin;
