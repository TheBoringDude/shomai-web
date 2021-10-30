import { useRouter } from 'next/dist/client/router';
import ColProvider from '../../../lib/dash/colprovider';
import joinString from '../../../lib/joinstring';
import BlendingProvider from './blending-provider';
import SimpleBlending from './simple/blendpage';

const BaseBlending = () => {
  const router = useRouter();
  const { collection, blend } = router.query;

  const x = joinString(blend)?.split('-');

  if (!collection && !blend) {
    return <></>;
  }

  return (
    <ColProvider collection={joinString(collection)}>
      <BlendingProvider collection={joinString(collection)} blend={x[1]} id={Number(x[0])}>
        {x[1] === 'sb' ? <SimpleBlending /> : <></>}
      </BlendingProvider>
    </ColProvider>
  );
};

export default BaseBlending;
