import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createApiMethod } from 'app-framework';
import { message, Skeleton } from 'antd';
import store, { exportSchema, replaceLayoutStore, resetDrag, resetLayout, RootState, updateSchema } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, isEqual } from 'lodash';

export const useQuerySchema = () => {
  const dispatch = useDispatch();
  const { schemaName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [schema, setSchema] = useState(exportSchema());
  const [dep, setDep] = useState(0);
  const prevSchema = useRef<any>();

  const url = useMemo(() => `/schemas/get/${schemaName}`, [schemaName]);
  const updateSchema = useCallback(debounce(() => {
    const newSchema = exportSchema();
    if (isEqual(newSchema, prevSchema.current)) {
      return;
    }
    prevSchema.current = newSchema;
    setSchema(newSchema);
  }, 200), []);

  useEffect(() => {
    updateSchema();
  }, [updateSchema]);

  useEffect(() => {
    const unsubscribe = store.subscribe(updateSchema);
    return unsubscribe;
  }, [updateSchema]);
  
  const request = useMemo(() => createApiMethod({
    method: 'GET',
  }), []);

  const retry = useCallback(() => {
    setDep(p => p + 1);
  }, []);

  useEffect(() => {
    if (!schemaName) {
      setLoading(false);
      setError(undefined);
      dispatch(resetLayout());
      dispatch(resetDrag());
      return;
    }
    (async () => {
      setLoading(true);
      await request({ url }).then(
        (r: any) => {
          dispatch(replaceLayoutStore({
            layoutStore: r.state.content
          }));
          updateSchema();
          setLoading(false);
        }
      ).catch((e) => {
        setError(e);
        message.error(`${e.message}\n加载异常，请检查schema`, 3);
      }).finally(() => setLoading(false));
    })();
  }, [request, schemaName, url, dispatch, updateSchema, dep]);

  return {
    loading,
    error,
    schema,
    retry
  };
}


// eslint-disable-next-line react/display-name
const withQuerySchema = (Component: React.ComponentType<any>) => (props: any) => {
  const { loading, error, schema, retry } = useQuerySchema();

  useEffect(() => {
    window.addEventListener('resetSchema', retry);
    return () => window.removeEventListener('resetSchema', retry);
  }, [retry]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <>error</>
  }

  return <Component schema={schema} />
}

export default withQuerySchema;