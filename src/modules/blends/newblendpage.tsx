import { useRouter } from 'next/dist/client/router';
import ColProvider from '../../lib/collections/colprovider';
import joinString from '../../lib/joinstring';
import MultiBlend from './multi';
import SimpleBlend from './simple/page';
import SimpleSwap from './simpleswap/page';
import UnknownBlend from './unknown';

const NewBlendPage = () => {
  const router = useRouter();
  const { colname, blend } = router.query;

  if (!colname || !blend) {
    return <></>;
  }

  return (
    <ColProvider collection={joinString(colname)}>
      {blend === 'simple' ? (
        <SimpleBlend />
      ) : blend === 'multi' ? (
        <MultiBlend />
      ) : blend === 'swap' ? (
        <SimpleSwap />
      ) : (
        <UnknownBlend />
      )}
    </ColProvider>
  );
};

export default NewBlendPage;
