import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createApiMethod } from 'app-framework';
import { Skeleton } from 'antd';
import store, { exportSchema, replaceLayoutStore, RootState, updateSchema } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

// eslint-disable-next-line react/display-name
const withQuerySchema = (Component: React.ComponentType<any>) => (props: any) => {
  const dispatch = useDispatch();
  const { schemaName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [schema, setSchema] = useState(exportSchema());

  const url = useMemo(() => `/schemas/get/${schemaName}`, [schemaName]);
  const storeListener = debounce(useCallback(() => {
    console.log('call listener')
    setSchema(exportSchema());
  }, []), 100);

  useEffect(() => {
    console.log(schema);
  }, [schema]);

  useEffect(() => {
    const unsubscribe = store.subscribe(storeListener);
    return unsubscribe;
  }, [storeListener]);
  
  const request = useMemo(() => createApiMethod({
    method: 'GET',
  }), []);

  useEffect(() => {
    if (!schemaName) {
      setLoading(false);
      setError(undefined);
      return;
    }
    (async () => {
      setLoading(true);
      await request({ url }).then(
        (r: any) => {
          setSchema(r.schema.content);
          dispatch(replaceLayoutStore({
            layoutStore: r.state.content
          }));
          setLoading(false);
        }
      ).catch((e) => {
        setError(e);
      }).finally(() => setLoading(false));
    })();
  }, [request, schemaName, url, dispatch]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <>error</>
  }

  return <Component schema={schema} />
}

export default withQuerySchema;