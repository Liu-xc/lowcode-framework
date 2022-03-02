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
  Query: RequestConfig;
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
    Query,
    children,
    queryAdaptor,
    withQueryParams,
    resolveContext,
    ...otherProps
  } = props;

  const { loading, error, data, retry } = useObtainData(Query, { queryAdaptor });

  useEffect(() => {
    const { state } = resolveContext as ResolveContext;
    const { stateKey } = withQueryParams;
    state && stateKey && set(state.getValueProxy(), stateKey, data);
  }, [data, resolveContext, withQueryParams]);

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