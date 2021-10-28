import { useRouter } from 'next/dist/client/router';
import ColProvider from '../../lib/dash/colprovider';
import joinString from '../../lib/joinstring';
import MultiBlend from './multi';
import SimpleBlend from './simple/page';
import SwapBlend from './swap';
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
        <SwapBlend />
      ) : (
        <UnknownBlend />
      )}
    </ColProvider>
  );
};

export default NewBlendPage;
