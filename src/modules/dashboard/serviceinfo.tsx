import { useCollection } from '../../lib/collections/colprovider';

const ServiceInfo = () => {
  const { collection } = useCollection();

  return (
    <>
      <div className="w-5/6 mx-auto bg-deep-champagne py-2 px-3 rounded-lg text-center text-gunmetal mt-12">
        <p className="text-sm tracking-wide">
          [info] This service is still in beta and is only available to specific collections.
        </p>
      </div>
    </>
  );
};

export default ServiceInfo;
