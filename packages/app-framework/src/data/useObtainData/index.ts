import { } from '@/types';
import { useEffect, useState, useMemo } from 'react';
import { QueryConfig, createApiMethod, RequestResponse } from 'network';
import useForceUpdate from '@/utils/useForceUpdate'

export interface ObtainDataRes {
  loading: boolean;
  data: any;
  error?: Error;
  retry: () => void;
}

export interface ObtainDataOptions {
  [k: string]: any;
  queryAdaptor?: (res: any) => any;
}

export default function useObtainData(query: QueryConfig, options: ObtainDataOptions = {}): ObtainDataRes {
  const [res, setRes] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const request = useMemo(() => createApiMethod(query), [query]);
  const [dep, retry] = useForceUpdate();
  const { queryAdaptor } = options;

  useEffect(() => {
    (async () => {
      setError(undefined);
      setLoading(true);
      setRes(undefined);
      try {
        const res = (await request({})) as RequestResponse;
        const { data } = queryAdaptor ? queryAdaptor(res) : res;
        setRes(data);
      } catch (e: any) {
        setError(new Error(e?.message || `数据请求异常: ${query.url}`));
      } finally {
        setLoading(false);
      }
    })()
  }, [request, dep, query, queryAdaptor]);

  return {
    loading,
    data: res,
    error,
    retry
  };
}