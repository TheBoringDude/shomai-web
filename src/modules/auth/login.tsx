import { useAuthFunctions } from '@cryptopuppie/next-waxauth';
import { toast } from 'react-toastify';
import { SimpleModal } from 'unstyled-lightbox';

type AuthLoginProps = {
  open: boolean;
  onClose: () => void;
};

const AuthLogin = ({ open, onClose }: AuthLoginProps) => {
  const { loginWithAnchor, loginWithCloudWallet } = useAuthFunctions();

  return (
    <SimpleModal
      open={open}
      onClose={onClose}
      className="fixed w-full h-full bg-black/60 z-50 inset-0 flex items-center justify-center"
      overlayClassname="absolute h-full w-full z-30"
    >
      <div className="z-50 bg-gray-100 w-full max-w-lg rounded-xl p-8 text-center">
        <h4 className="font-black text-2xl text-gunmetal">Authenticate your Wax Wallet</h4>

        <div className="mt-6 flex flex-col">
          {!(process.env.NEXT_PUBLIC_ISTESTNET === 'true') && (
            <button
              onClick={async () => {
                // try to login
                try {
                  await loginWithCloudWallet();

                  toast.success('Successfully logged in!');

                  // close modal
                  onClose();
                } catch (e) {
                  console.error(e);
                  toast.error(String(e));
                }
              }}
              className="my-1 bg-gray-800 hover:bg-gray-900 text-neutral-100 uppercase py-3 rounded-md px-4 text-lg font-black tracking-wide"
              type="button"
            >
              Login with Wax Cloud Wallet
            </button>
          )}

          <button
            onClick={async () => {
              // try to login
              try {
                await loginWithAnchor();

                toast.success('Successfully logged in!');

                // close modal
                onClose();
              } catch (e) {
                console.error(e);
                toast.error(String(e));
              }
            }}
            className="my-1 bg-blue-600 hover:bg-blue-700 text-neutral-100 uppercase py-3 rounded-md px-4 text-lg font-black tracking-wide"
            type="button"
          >
            Login with Anchor
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default AuthLogin;
