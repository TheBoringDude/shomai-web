import { XCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import AddSlotTarget from './add-target';
import { useSlotBlend } from './provider';
import SetTargetOdds from './set-targetodds';

const SlotBlendTargets = () => {
  const { targets, dispatchTargets } = useSlotBlend();

  return (
    <>
      {/* add targets */}
      <div>
        <h4 className="font-black text-2xl text-gray-100">Targets</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center mt-6">
          {targets.map((i) => (
            <div key={i.templateid} className="relative group bg-charcoal rounded-xl p-2">
              {targets.length > 1 && <SetTargetOdds target={i} />}

              <button
                onClick={() => {
                  dispatchTargets({ type: 'remove', template: i.templateid });
                }}
                className="absolute z-10 -top-2 -right-2 hover:scale-105 transform text-sage"
              >
                <XCircleIcon className="w-8 h-8" />
              </button>

              <span className="z-10 -bottom-1 -left-2 absolute text-xs rounded-md bg-atomic-tangerine py-2 px-3">
                #{i.templateid} / ({i.odds}%)
              </span>
              <Image
                src={`https://ipfs.io/ipfs/${i.image}`}
                alt=""
                height="400"
                width="300"
                objectFit="contain"
                className="z-0"
              />
            </div>
          ))}
          <AddSlotTarget />
        </div>
      </div>
    </>
  );
};

export default SlotBlendTargets;
