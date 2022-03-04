import React from 'react';
import LayoutContainer from '../components/LayoutContainer';

// eslint-disable-next-line react/display-name
const withLayoutContainer = (Component: React.ComponentType<any>) => (props: any) => {
  const {
    children,
    layoutConfigs,
    ...compProps
  } = props;
  return (
    <Component
      {...compProps}
    >
      {children}
      <LayoutContainer {...layoutConfigs} />
    </Component>
  );
};

export default withLayoutContainer;