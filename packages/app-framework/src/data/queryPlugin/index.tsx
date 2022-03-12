import React from 'react';
import { ResolvePlugin } from 'render-engine';

const queryPlugin: ResolvePlugin = {
  HOC: (Component, resolvecontext) => {
    const WrappedComponent: React.ComponentType<any> = props => {
      const querySchema = resolvecontext.resolvedSchema.query;
      return <Component query={querySchema} resolvecontext={resolvecontext} {...props} />;
    }
    return WrappedComponent;
  },
  SchemaKeys: ['query']
};

export default queryPlugin;