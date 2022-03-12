import React, { useMemo } from 'react';
import LayoutContainer from '../components/LayoutContainer';

// eslint-disable-next-line react/display-name
const withLayoutContainer = (Component: React.ComponentType<any>) => (props: any) => {
  const {
    children,
    layoutConfigs,
    style = {},
    id,
    containerStyle = {},
    ...compProps
  } = props;

  const layoutStyle: React.CSSProperties = useMemo(() => (
    {
      minHeight: '300px',
    }
  ), []);

  const computedStyle = useMemo(() => ({ ...layoutStyle, ...style }), [style, layoutStyle]);

  return (
    <Component
      {...compProps}
      id={id}
      style={containerStyle}
    >
      {children}
      <LayoutContainer containerCompId={id} isBounded={true} {...layoutConfigs} style={computedStyle}/>
    </Component>
  );
};

export default withLayoutContainer;