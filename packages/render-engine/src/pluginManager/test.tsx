import React from 'react';
import { ResolvePlugin } from '.';

const testPlugin: ResolvePlugin = {
  HOC: (Component) => (props) => (
    <>
      testPlugin
      <Component {...props} />
    </>
  ),
};

export default testPlugin;