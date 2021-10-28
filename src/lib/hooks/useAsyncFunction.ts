import { useEffect, useState } from 'react';

type FuncType<X> = (...args: unknown[]) => Promise<X>;

const useAsyncFunction = <X>(f: FuncType<X>) => {
  const [done, setDone] = useState(false);
  const [data, setData] = useState<X | undefined>();

  useEffect(() => {
    if (!done) return;

    const func = async () => {
      const x = await f();

      setData(x);
      setDone(true);
    };

    func();
  });

  return { data, done };
};

export type { FuncType };

export default useAsyncFunction;
