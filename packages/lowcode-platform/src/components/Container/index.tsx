import React from 'react';
import withLayoutContainer from '../../hoc/withLayoutContainer';
import { ComponentMeta } from '../../types';

const Container: React.FC<any> = props => {
  const { children, ...otherProps } = props;
  return (
    <div {...otherProps}>
      {children}
    </div>
  );
}

export const ContainerMeta: ComponentMeta = {
  ComponentType: 'Container',
  configForm: {
    fields: [],
  },
  droppingItem: {
    w: 12,
    h: 16
  }
};

export default withLayoutContainer(Container);
