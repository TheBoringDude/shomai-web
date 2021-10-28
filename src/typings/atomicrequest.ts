interface AtomicRequest<T> {
  success: boolean;
  data: T;
  query_time: number;
}

export type { AtomicRequest };
