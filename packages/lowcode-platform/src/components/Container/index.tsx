import React from 'react';
import { withContainerChild } from '../../hoc';
import withLayoutContainer from '../../hoc/withLayoutContainer';
import { ComponentMeta } from '../../types';
import './index.scss';

const Container: React.FC<any> = props => {
  const { children, style, id, ...otherProps } = props;
  return (
    <div style={style} id={id} className='container'>
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
    w: 20,
    h: 20
  }
};

export default withContainerChild(withLayoutContainer(Container), true);
