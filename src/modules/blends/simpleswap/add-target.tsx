import { XCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useSimpleSwap } from './provider';
import AddTargetSimpleSwap from './target';

const SimpleSwapTarget = () => {
  const { target, setTarget } = useSimpleSwap();

  return (
    <>
      {/* add target */}
      <div className="text-center">
        <h4 className="font-black text-2xl text-gray-100">Target</h4>
        <div className="mt-6">
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
            <AddTargetSimpleSwap />
          )}
        </div>
      </div>
    </>
  );
};

export default SimpleSwapTarget;
