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
    w: 14,
    h: 20
  }
};

export default withLayoutContainer(Container);
