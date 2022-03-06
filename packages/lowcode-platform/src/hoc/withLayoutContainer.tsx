import React, { useMemo } from 'react';
import LayoutContainer from '../components/LayoutContainer';
import { ComponentsMap } from '../components/dragComps';

// eslint-disable-next-line react/display-name
const withLayoutContainer = (Component: React.ComponentType<any>) => (props: any) => {
  const {
    children,
    layoutConfigs,
    style = {},
    ...compProps
  } = props;

  const layoutStyle: React.CSSProperties = useMemo(() => (
    {
      minHeight: '200px',
      border: '1px dashed blue'
    }
  ), []);

  const computedStyle = useMemo(() => ({ ...layoutStyle, ...style }), [style, layoutStyle]);

  return (
    <Component
      {...compProps}
    >
      {children}
      <LayoutContainer {...layoutConfigs} style={computedStyle}/>
    </Component>
  );
};

export default withLayoutContainer;