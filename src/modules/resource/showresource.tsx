import { useResources } from './provider';

const ShowRamResource = () => {
  const { balance } = useResources();

  return (
    <div className="mb-8">
      <p className="text-sage text-xl inline-flex items-center">
        <span className="mr-1 tracking-wide">Available Ram:</span>
        <strong className="text-deep-champagne font-black text-2xl">{balance?.bytes} bytes</strong>
      </p>
    </div>
  );
};

export default ShowRamResource;
