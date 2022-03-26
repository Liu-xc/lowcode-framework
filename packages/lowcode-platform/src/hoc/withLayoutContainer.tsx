import React, { useMemo } from 'react';
import LayoutContainer from '../components/LayoutContainer';

// eslint-disable-next-line react/display-name
const withLayoutContainer = (Component: React.ComponentType<any>) => React.forwardRef((props: any, ref) => {
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
      ref={ref}
    >
      <LayoutContainer
        containerCompId={id}
        isBounded={true}
        {...layoutConfigs}
        style={computedStyle}
      >
        {children}
      </LayoutContainer>
    </Component>
  );
});

export default withLayoutContainer;