import { XCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useSimpleBlend } from './provider';
import AddTargetSimple from './target';

const SimpleBlendTarget = () => {
  const { target, setTarget } = useSimpleBlend();

  return (
    <>
      {/* add target */}
      <div className="">
        <h4 className="font-black text-2xl text-gray-100">Target</h4>
        <div className="mt-6 grid grid-cols-4 gap-4">
          {target ? (
            <div className="relative bg-charcoal rounded-xl p-2">
              <button
                onClick={() => {
                  setTarget(undefined);
                }}
                className="absolute z-10 -top-2 -right-2 hover:scale-105 transform text-sage"
              >
                <XCircleIcon className="w-8 h-8" />
              </button>

              <span className="z-10 -bottom-1 -left-2 absolute text-xs rounded-md bg-atomic-tangerine py-2 px-3">
                {target.collection} / #{target.template}
              </span>
              <Image
                src={`https://ipfs.io/ipfs/${target.image}`}
                alt=""
                height="400"
                width="300"
                objectFit="contain"
                className="z-0 relative"
              />
            </div>
          ) : (
            <AddTargetSimple />
          )}
        </div>
      </div>
    </>
  );
};

export default SimpleBlendTarget;
