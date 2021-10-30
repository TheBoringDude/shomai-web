import useSWR from 'swr';
import { AtomicRequest } from '../../typings/atomicrequest';
import { fetcher } from '../fetcher';

const useCallAPI = <T>(url: string) => {
  const { data } = useSWR<AtomicRequest<T>>(url, fetcher);

  return data?.data;
};

export default useCallAPI;
