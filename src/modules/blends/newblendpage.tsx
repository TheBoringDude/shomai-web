import { useRouter } from 'next/dist/client/router';
import ColProvider from '../../lib/collections/colprovider';
import joinString from '../../lib/joinstring';
import MultiBlend from './multi';
import RouteBlends from './routeblends';
import SimpleBlend from './simple/page';
import SimpleSwap from './simpleswap/page';
import SlotBlend from './slotblend/page';
import UnknownBlend from './unknown';

const NewBlendPage = () => {
  const router = useRouter();
  const { colname, blend } = router.query;

  if (!colname || !blend) {
    return <></>;
  }

  return (
    <ColProvider collection={joinString(colname)}>
      <RouteBlends>
        {blend === 'simple' ? (
          <SimpleBlend />
        ) : blend === 'multi' ? (
          <MultiBlend />
        ) : blend === 'slot' ? (
          <SlotBlend />
        ) : blend === 'swap' ? (
          <SimpleSwap />
        ) : (
          <UnknownBlend />
        )}
      </RouteBlends>
    </ColProvider>
  );
};

export default NewBlendPage;
