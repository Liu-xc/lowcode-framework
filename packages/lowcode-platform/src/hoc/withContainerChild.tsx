/* eslint-disable react/display-name */
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseCircleOutlined } from '@ant-design/icons';
import { RootState, setFocusItem, removeChild, removeComp } from '../store';
import { get } from 'lodash';
import cls from 'classnames';
import { Layout } from 'react-grid-layout';
import { withDragItem } from '.';
import { useParams } from 'react-router-dom';

import './index.scss';


const withContainerChild = (Comp: React.ComponentType<any>, isContainer = false): React.ComponentType<any> => withDragItem(props => {
  const { parentId, id, containerStyle = {}, style = {}, schemaConfigs, ...otherProps } = props;
  const { mode } = useParams();
  const dispatch = useDispatch();
  const curFocusId = useSelector((state: RootState) => state.drag.focusItemId);
  const compLayout = useSelector((state: RootState) => {
    const layout = get(state, `layout.componentInfo[${parentId}].layoutInfo`, []);
    return layout.find((l: Layout) => l.i === id) || {};
  });
  const isReadOnly = useMemo(() => mode === 'view' || compLayout.static && !compLayout.isDraggable, [compLayout, mode]);

  const computedStyle: React.CSSProperties = useMemo(() => {
    return isContainer ? { ...style, ...containerStyle, height: '100%' } : style;
  }, [style, containerStyle]);

  const onClickItem = useCallback((id: string, e: any) => {
    dispatch(setFocusItem({ id }));
    e.stopPropagation();
  }, [dispatch]);

  const deleteItem = useCallback((id: string, e: any) => {
    e.stopPropagation();
    dispatch(removeComp({ id }));
    dispatch(removeChild({
      parentId,
      childId: id
    }));
    dispatch(setFocusItem({ id: undefined }))
  }, [dispatch, parentId]);

  return (
    <div
      style={computedStyle}
      key={id}
      onClick={(e) => onClickItem(id, e)}
      className={cls("react-grid-item dragDiv react-draggable cssTransforms react-resizable", curFocusId === id && "focusItem", (isReadOnly || !parentId) && 'readonly')}
    >
      {!(isReadOnly || !parentId) && <CloseCircleOutlined onClick={(e) => deleteItem(id, e)} className='removeIcon' title='??????' />}
      {
        <Comp id={id} {...otherProps} />
      }
    </div>
  );
});

export const withContainerChildPlugin = {
  hoc: withContainerChild,
  schemaKeys: ['containerChild']
}

export default withContainerChild;