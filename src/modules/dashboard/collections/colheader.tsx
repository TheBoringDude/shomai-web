type ColHeaderProps = {
  collection_name: string;
};

const ColHeader = ({ collection_name }: ColHeaderProps) => {
  return (
    <div className="">
      <div>
        <h3 className="text-2xl font-black text-atomic-tangerine">{collection_name}</h3>
        <p className="text-white mt-1 font-black">World of Cryptopups</p>
      </div>
    </div>
  );
};

export default ColHeader;
