import { useRouter } from 'next/dist/client/router';
import ColProvider from '../../../../lib/dash/colprovider';
import joinString from '../../../../lib/joinstring';
import SimpleBlend from './simple';
import UnknownBlend from './unknown';

const NewBlendPage = () => {
  const router = useRouter();
  const { colname, blend } = router.query;

  if (!colname || !blend) {
    return <></>;
  }

  return (
    <ColProvider collection={joinString(colname)}>
      {blend === 'simple' ? <SimpleBlend /> : <UnknownBlend />}
    </ColProvider>
  );
};

export default NewBlendPage;
