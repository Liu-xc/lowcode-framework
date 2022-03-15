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
  
  const request = useMemo(() => createApiMethod({
    method: 'GET',
  }), []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await request({ url: `/schemas/get/${schemaName}` }).then(
        (r: any) => {
          setSchema(r.schema.content);
          setState(r.state.content);
          setLoading(false);
        }
      ).catch(() => setLoading(false));
    })();
  }, [request, schemaName]);

  if (loading) {
    return <Skeleton />;
  }
  return <Component schema={schema} state={state} />
}

export default withQuerySchema;