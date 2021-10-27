const StatsPage = () => {
  return (
    <div>
      <h5 className="text-2xl font-black tracking-wide text-white mb-4 underline">Statistics</h5>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 py-6 px-8 rounded-lg bg-atomic-tangerine">
          <p className="text-blueGray-800 mb-2 font-bold uppercase">Total Blends</p>
          <h4 className="mx-3 text-gunmetal font-black text-5xl tracking-wide">12</h4>
        </div>
        <div className="py-6 px-8 rounded-lg bg-deep-champagne">
          <p className="text-blueGray-700 mb-2 font-bold uppercase">Blend Uses</p>
          <h4 className="mx-3 text-charcoal font-black text-5xl tracking-wide">100</h4>
        </div>

        <div className="py-4 px-8 rounded-lg bg-gunmetal">
          <p className="text-gray-400 text-sm uppercase tracking-wide">Simple Blend</p>
          <h4 className="text-3xl font-black text-white">100</h4>
        </div>
        <div className="py-4 px-8 rounded-lg bg-gunmetal">
          <p className="text-gray-400 text-sm uppercase tracking-wide">Multi Blend</p>
          <h4 className="text-3xl font-black text-white">100</h4>
        </div>
        <div className="py-4 px-8 rounded-lg bg-gunmetal">
          <p className="text-gray-400 text-sm uppercase tracking-wide">Swap (not blend)</p>
          <h4 className="text-3xl font-black text-white">100</h4>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
