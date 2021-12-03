import { CogIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import BlendConfigModal from './modal';

type ShowBlendConfigProps = {
  blenderid: number;
};

const ShowBlendConfig = ({ blenderid }: ShowBlendConfigProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BlendConfigModal blenderid={blenderid} open={open} onClose={() => setOpen(false)} />

      <button
        onClick={() => setOpen(true)}
        title="Edit blend config"
        className="absolute top-1 right-1 text-white hover:scale-105 transform"
      >
        <CogIcon className="h-7 w-7" />
      </button>
    </>
  );
};

export default ShowBlendConfig;
