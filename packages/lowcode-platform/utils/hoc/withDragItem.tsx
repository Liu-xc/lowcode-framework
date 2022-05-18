import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// eslint-disable-next-line react/display-name
const withDragItem = (Component: React.ComponentType<any>) => (props: any = {}) => {
  const { id } = props;
  const configProps = useSelector((state: RootState) => state.layout.compInfo[id]?.configProps || {});

  return (
    <Component {...props} {...configProps} />
  );
};

export default withDragItem;