import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createApiMethod } from 'app-framework';
import { Skeleton } from 'antd';

// eslint-disable-next-line react/display-name
const withQuerySchema = (Component: React.ComponentType<any>) => (props: any) => {
  const { schemaName } = useParams();
  const [schema, setSchema] = useState();
  const [state, setState] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const url = useMemo(() => `/schemas/get/${schemaName}`, [schemaName]);
  
  const request = useMemo(() => createApiMethod({
    method: 'GET',
  }), []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await request({ url }).then(
        (r: any) => {
          setSchema(r.schema.content);
          setState(r.state.content);
          setLoading(false);
        }
      ).catch((e) => {
        setError(e);
      }).finally(() => setLoading(false));
    })();
  }, [request, schemaName, url]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <>error</>
  }

  return <Component schema={schema} state={state} />
}

export default withQuerySchema;