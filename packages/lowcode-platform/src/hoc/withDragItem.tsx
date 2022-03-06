import React, { useCallback, useEffect } from 'react';
import { ComponentMeta } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// eslint-disable-next-line react/display-name
const withDragItem = (Component: React.ComponentType<any>, meta: ComponentMeta) => (props: any) => {
  const { id } = props;
  const configProps = useSelector((state: RootState) => state.layout.compInfo[id]?.configProps || {});
  const onDragStart = useCallback((e: any) => {
    // TODO 这里去向redux设置当前的ComponentMeta
    console.log('onDragStart');
    console.log(e, meta);
  }, []);

  const onDragEnd = useCallback((e: any) => {
    // TODO 这里去向redux取消当前的ComponentMeta信息
    // ? 好像不应该是这里去设置吧，应该是在LayoutContainer那一层
    console.log('onDragEnd');
    console.log(e);
    e.stopPropagation();
  }, []);

  return (
    <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Component {...props} {...configProps}/>
    </div>
  );
}

export default withDragItem;