import React, { useEffect } from 'react';
import useObtainData from '../useObtainData';
import { QueryConfig } from 'network';
import { ResolveContext } from 'render-engine';

export interface WithQueryProps {
  loading: boolean;
  error: Error;
  retry: () => void;
  queryAdaptor: (res: any) => any;
  Query: QueryConfig;
}

export interface withQueryParams {
  stateKey: string;
}

const withQuery = (Component: React.ComponentType<any>): React.ComponentType<any> => props => {
  const {
    Query,
    children,
    queryAdaptor,
    withQueryParams,
    resolveContext,
    ...otherProps
  } = props;

  const { loading, error, data, retry } = useObtainData(Query, {queryAdaptor});

  useEffect(() => {
    const { sv } = resolveContext as ResolveContext;
    const { stateKey } = withQueryParams;
    sv &&( sv[stateKey] = data);
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
}

export default withQuery;