import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { useMemo } from 'react';
import { GET_COLLECTION_TEMPLATES } from '../../../../lib/account/getauthcol';
import { useCollection } from '../../../../lib/collections/colprovider';
import useCallAPI from '../../../../lib/hooks/useCallAPI';
import { useSlotBlender } from './provider';

const SlotBlendingTargets = () => {
  const { collection } = useCollection();
  const { config_target } = useSlotBlender();

  // get target templates only
  const target_templates = useMemo(() => {
    return config_target.targets.map((i) => i.templateid);
  }, [config_target]);

  const data = useCallAPI<ITemplate[]>(
    GET_COLLECTION_TEMPLATES(collection, undefined, target_templates)
  );

  const getOdds = (t: number) => {
    return config_target.targets.filter((i) => i.templateid === t)[0].odds;
  };

  return (
    <div className="">
      <h4 className="text-2xl text-gray-100 font-black">Targets</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center mt-6">
        {data?.map((i, index) => (
          <div key={index} className="flex justify-center relative bg-charcoal rounded-xl p-2">
            <span
              title="Template odds"
              className="absolute -top-1 -right-2 bg-deep-champagne text-gunmetal text-xl py-2 px-4 ronded-lg z-10 font-black rounded-lg"
            >
              {getOdds(Number(i.template_id))} %
            </span>

            <Image
              src={`https://ipfs.io/ipfs/${i.immutable_data.img}`}
              alt=""
              height="400"
              width="300"
              objectFit="contain"
              className="z-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotBlendingTargets;
