import { LinkSession } from 'anchor-link';
import { Api } from 'eosjs';

type WalletType = 'cloudwallet' | 'anchor';

interface WalletTransactionOptions {
  cloudwallet: Api;
  anchor: LinkSession;
}

interface WalletUser {
  type: WalletType;
  wallet: string;
  permission?: string;
  pubKeys: string[];
}

export type { WalletUser, WalletType, WalletTransactionOptions };
