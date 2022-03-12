import React, { useEffect } from 'react';
import useObtainData from '@/data/useObtainData';
import { RequestConfig } from 'network';
import { ResolveContext } from 'render-engine';
import { set } from 'lodash';

export interface WithQueryProps {
  loading: boolean;
  error: Error;
  retry: () => void;
  queryAdaptor: (res: any) => any;
  query: RequestConfig;
}

export interface withQueryParams {
  stateKey: string;
}

/**
 * withQuery中通过useObtainData帮助组件处理数据请求，并控制组件对应的状态
 * 请求到的数据将会存放到stateKey下
*/
const withQuery = (Component: React.ComponentType<any>): React.FC<any> => props => {
  const {
    query,
    children,
    queryAdaptor,
    withQueryParams,
    resolvecontext,
    ...otherProps
  } = props;

  const { loading, error, data, retry } = useObtainData(query, { queryAdaptor });

  useEffect(() => {
    const { state } = resolvecontext as ResolveContext;
    const { stateKey } = withQueryParams;
    state && stateKey && set(state.getValueProxy(), stateKey, data);
  }, [data, resolvecontext, withQueryParams]);

  const node = (
    <Component
      loading={loading}
      error={error}
      retry={retry}
      {...otherProps}
    >
      {children}
    </Component>
  );

  return node;
};

export default withQuery;