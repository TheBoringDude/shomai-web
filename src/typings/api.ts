interface APIRequest<T> {
  error: boolean;
  data?: T;
  message?: string;
}

interface SERVICELIST_PROPS {
  whitelists: string[];
  blacklists: string[];
}

export type { APIRequest, SERVICELIST_PROPS };
