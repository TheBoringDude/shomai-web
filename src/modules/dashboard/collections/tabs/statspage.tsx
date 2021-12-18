import { useMemo } from 'react';
import { useDashboard } from '../../dashprovider';

const StatsPage = () => {
  const { blends } = useDashboard();

  const totalBlends = useMemo(() => {
    if (!blends) return;

    return (
      blends.simblenders.data.length + blends.simswaps.data.length + blends.slotblenders.data.length
    );
  }, [blends]);

  return (
    <div>
      <h5 className="text-2xl font-black tracking-wide text-white mb-4 underline">Statistics</h5>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <div className="md:col-span-2 py-6 px-8 rounded-lg bg-atomic-tangerine">
          <p className="text-blueGray-800 mb-2 font-bold uppercase">Total Blends</p>
          <h4 className="mx-3 text-gunmetal font-black text-5xl tracking-wide">{totalBlends}</h4>
        </div>
        <div className="py-6 px-8 rounded-lg bg-deep-champagne">
          <p className="text-blueGray-700 mb-2 font-bold uppercase">Blend Uses</p>
          <h4 className="mx-3 text-charcoal font-black text-5xl tracking-wide">---</h4>
        </div>

        <div className="py-4 px-8 rounded-lg bg-gunmetal">
          <p className="text-neutral-400 text-sm uppercase tracking-wide">Simple Blend</p>
          <h4 className="text-3xl font-black text-white">{blends?.simblenders.data.length}</h4>
        </div>
        <div className="py-4 px-8 rounded-lg bg-gunmetal">
          <p className="text-neutral-400 text-sm uppercase tracking-wide">Slot Blend</p>
          <h4 className="text-3xl font-black text-white">{blends?.slotblenders.data.length}</h4>
        </div>
        <div className="py-4 px-8 rounded-lg bg-gunmetal">
          <p className="text-neutral-400 text-sm uppercase tracking-wide">Swap (not blend)</p>
          <h4 className="text-3xl font-black text-white">{blends?.simswaps.data.length}</h4>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
