import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createApiMethod } from 'app-framework';
import { set } from 'lodash';
import { message } from 'antd';

const queryFormDataPlugin = {
  HOC: (Comp: React.ComponentType<any>, resolvecontext: any): React.ComponentType<any> => {
    const WrappedComponent: React.ComponentType<any> = props => {
      const queryParams = resolvecontext.resolvedSchema.queryFormData;
      const {
        url,
        params,
        data,
        method = 'GET',
        stateKey,
        adaptor,
        beforeFormat,
      } = queryParams;

      const [formData, setFormData] = useState([]); 
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState();
      const [dep, setDep] = useState(0);

      const forceUpdate = useCallback(() => {
        setDep(d => d + 1);
      }, []);

      const request = useMemo(() => createApiMethod({
        url,
        method
      }), [url, method]);

      useEffect(() => {
        setError(undefined);
        if (!url) {
          return;
        }
        setLoading(true);
        request({
          data,
          params
        }).then((res) => {
          console.log(res);
          beforeFormat && typeof beforeFormat === 'function' && beforeFormat(res);
          const formattedData = adaptor && typeof adaptor === 'function' && adaptor(res);
          set(resolvecontext.sv, stateKey, formattedData);
          setFormData(formattedData);
        }).catch((e) => {
          console.error(e);
          message.error(e.message, 2)
          setError(e);
        }).finally(() => {
          setLoading(false);
        });
      }, [data, request, params, beforeFormat, adaptor, stateKey, dep, url]);

      return <Comp {...props} value={formData} loading={loading} error={error} retry={forceUpdate} />; 
    }
    return WrappedComponent;
  },
  SchemaKeys: ['queryFormData']
}

export default queryFormDataPlugin;