const DashHeader = () => {
  return (
    <header className="bg-charcoal py-4">
      <nav className="mx-auto w-11/12 flex items-center justify-between">
        <h1 className="font-black text-xl text-deep-champagne">shomai</h1>

        <div className="text-center">
          <h3 className="text-atomic-tangerine font-black text-sm">@5g2vm.wam</h3>
          <p className="text-xs text-gray-300 font-bold tracking-tight">( 8.33 WAX )</p>
        </div>
      </nav>
    </header>
  );
};

export default DashHeader;
