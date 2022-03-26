import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createApiMethod } from 'app-framework';
import { Skeleton } from 'antd';
import store, { exportSchema, replaceLayoutStore, RootState, updateSchema } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, isEqual } from 'lodash';

// eslint-disable-next-line react/display-name
const withQuerySchema = (Component: React.ComponentType<any>) => (props: any) => {
  const dispatch = useDispatch();
  const { schemaName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [schema, setSchema] = useState(exportSchema());
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
          dispatch(replaceLayoutStore({
            layoutStore: r.state.content
          }));
          updateSchema();
          setLoading(false);
        }
      ).catch((e) => {
        setError(e);
      }).finally(() => setLoading(false));
    })();
  }, [request, schemaName, url, dispatch, updateSchema]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <>error</>
  }

  return <Component schema={schema} />
}

export default withQuerySchema;