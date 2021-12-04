import { useState } from 'react';
import DepositRamModal from './deposit-modal';

const DepositRam = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DepositRamModal open={open} onClose={() => setOpen(false)} />

      <button
        onClick={() => setOpen(true)}
        className="m-1 py-2 px-8 rounded-lg bg-sage hover:bg-deep-champagne text-gunmetal"
        type="button"
      >
        Deposit Ram
      </button>
    </>
  );
};

export default DepositRam;
