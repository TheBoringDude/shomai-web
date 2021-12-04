import { useState } from 'react';
import WithdrawRamModal from './withdraw-modal';

const WithdrawRam = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WithdrawRamModal open={open} onClose={() => setOpen(false)} />

      <button
        onClick={() => setOpen(true)}
        className="m-1 py-2 px-8 rounded-lg bg-sage hover:bg-deep-champagne text-gunmetal"
        type="button"
      >
        Withdraw Ram
      </button>
    </>
  );
};

export default WithdrawRam;
