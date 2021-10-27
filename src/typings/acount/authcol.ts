export interface AuthorizedCollectionsProps {
  success: boolean;
  data: AuthColDataProps[];
  query_time: number;
}

export interface AuthColDataProps {
  contract: string;
  collection_name: string;
  name: string;
  img: string;
  author: string;
  allow_notify: boolean;
  authorized_accounts: string[];
  notify_accounts: any[];
  market_fee: number;
  data: AuthColDataDataProps;
  created_at_time: string;
  created_at_block: string;
}

export interface AuthColDataDataProps {
  img: string;
  url: string;
  name: string;
  description: string;
}
