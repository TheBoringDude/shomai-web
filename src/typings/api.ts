import { SIMPLEBLENDS, SIMPLESWAPS, SLOTBLENDS } from './blends/blends';

interface APIRequest<T> {
  error: boolean;
  data?: T;
  message?: string;
}

interface BASEBLENDINFO_PROPS<T> {
  name: string;
  info: string;
  data: T;
}

export interface ChainRequestProps<T> {
  rows: T[];
  more: boolean;
  next_key: string;
}

type COLLECTIONBLENDS_PROPS = {
  simblenders: BASEBLENDINFO_PROPS<SIMPLEBLENDS[]>;
  simswaps: BASEBLENDINFO_PROPS<SIMPLESWAPS[]>;
  slotblenders: BASEBLENDINFO_PROPS<SLOTBLENDS[]>;
};

interface SERVICELIST_PROPS {
  whitelists: string[];
  blacklists: string[];
}

export type { APIRequest, SERVICELIST_PROPS, COLLECTIONBLENDS_PROPS, BASEBLENDINFO_PROPS };
