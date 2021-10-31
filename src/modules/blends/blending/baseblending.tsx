import { useRouter } from 'next/dist/client/router';
import ColProvider from '../../../lib/dash/colprovider';
import joinString from '../../../lib/joinstring';
import BlendingProvider from './blending-provider';
import SimpleBlending from './simple/blendpage';
import SimpleSwapBlending from './simpleswap/blendpage';

const BaseBlending = () => {
  const router = useRouter();
  const { colname, blend } = router.query;

  const x = joinString(blend)?.split('-');

  if (!colname && !blend) {
    return <></>;
  }

  return (
    <ColProvider collection={joinString(colname)}>
      <BlendingProvider collection={joinString(colname)} blend={x[1]} id={Number(x[0])}>
        {x[1] === 'sb' ? <SimpleBlending /> : x[1] === 'sw' ? <SimpleSwapBlending /> : <></>}
      </BlendingProvider>
    </ColProvider>
  );
};

export default BaseBlending;
