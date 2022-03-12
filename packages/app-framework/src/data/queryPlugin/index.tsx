import React from 'react';
import { ResolvePlugin } from 'render-engine';

const queryPlugin: ResolvePlugin = {
  HOC: (Component, resolveContext) => {
    const WrappedComponent: React.ComponentType<any> = props => {
      const querySchema = resolveContext.resolvedSchema.query;
      return <Component query={querySchema} resolveContext={resolveContext} {...props} />;
    }
    return WrappedComponent;
  },
  SchemaKeys: ['query']
};

export default queryPlugin;