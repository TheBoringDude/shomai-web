import * as waxjs from '@waxio/waxjs/dist';
import { endpoint } from '../../lib/waxnet';
import { WalletUser } from '../../typings/acount/user';

const wax = new waxjs.WaxJS({ rpcEndpoint: endpoint, tryAutoLogin: false });

const loginWithCloudWallet = async (): Promise<WalletUser> => {
  const userAccount = await wax.login();
  const pubKeys = wax.pubKeys;

  return { type: 'cloudwallet', wallet: userAccount, pubKeys };
};

export { loginWithCloudWallet };
