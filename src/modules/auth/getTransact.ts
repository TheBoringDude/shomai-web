import { WaxJS } from '@waxio/waxjs/dist';
import { dapp, endpoint } from '../../lib/waxnet';
import { WalletUser } from '../../typings/acount/user';
import { anchorLink } from './anchor';

const getTransact = async (user: WalletUser) => {
  switch (user.type) {
    case 'anchor': {
      const session = await anchorLink.restoreSession(dapp);

      return session;
    }

    case 'cloudwallet': {
      return new WaxJS({ rpcEndpoint: endpoint, userAccount: user.wallet, pubKeys: user.pubKeys })
        .api;
    }

    default:
      return null;
  }
};

export default getTransact;
