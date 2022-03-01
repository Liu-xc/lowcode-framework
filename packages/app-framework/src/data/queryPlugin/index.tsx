import React from 'react';
import { ResolvePlugin } from 'render-engine';

const queryPlugin: ResolvePlugin = {
  HOC: (Component, resolveContext) => {
    const WrappedComponent: React.ComponentType<any> = props => {
      const querySchema = resolveContext.resolvedSchema.Query;
      return <Component Query={querySchema} resolveContext={resolveContext} {...props} />;
    }
    return WrappedComponent;
  },
  SchemaKeys: ['Query']
};

export default queryPlugin;