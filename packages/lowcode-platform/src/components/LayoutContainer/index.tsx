import React, { useCallback, useRef, useMemo, useEffect } from 'react';
import { Responsive, ResponsiveProps, ItemCallback, WidthProvider, Layout } from 'react-grid-layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setFocusItem, addComp, addChild, setLayoutInfo, updateSchema } from '../../store';
import { v4 as uuidV4 } from 'uuid';
import { useParams } from 'react-router-dom';
import './index.scss';
import { cloneDeep, get } from 'lodash';

export interface LayoutContainerProps extends ResponsiveProps {
  containerCompId: string;
}

// TODO 梳理需要修改的变量、参数、方法
/**
 * layout -> 可以不变【？如何决策】【放到外面这个组件的逻辑会更纯粹一些】
 * computedLayout的map可以做一个hoc【并且这一块由RenderEngine来做】
 * childCompTypes是不是不用在这里维护了【是的，怎么mapping交给RenderEngine】
 * ComponentMap也不再需要
*/

/**
 * 需要withLayoutContainerChild做的：
 * onClickItem
 * deleteItem
 * 当前focus的元素高亮
*/


const getDefaultDropItem = () => ({ i: uuidV4(), w: 2, h: 2 });

const ResponsiveGridLayout = WidthProvider(Responsive);
const LayoutContainer: React.FC<LayoutContainerProps> = props => {
  const { mode } = useParams();
  const {
    containerCompId: parentId,
  } = props;
  const layout = useSelector((state: RootState) => {
    const compInfo = state.layout.compInfo[parentId] || {};
    const { layoutInfo = [] } = compInfo;
    return cloneDeep(layoutInfo) as unknown as Layout[];
  });
  const dispatch = useDispatch();
  const newItem = useSelector((state: RootState) => state.drag.newItem);
  const droppingItemLayout = useRef(getDefaultDropItem());

  useEffect(() => {
    console.log('layout change', layout)
  }, [layout]);

  const setLayout = useCallback((l) => {
    dispatch(setLayoutInfo({ id: parentId, layoutInfo: l }));
  }, [dispatch, parentId]);

  const computedLayout = useMemo(() => {
    if (mode !== 'view') {
      return layout;
    } else {
      return layout.map(l => ({ ...l, static: true, isDraggable: false }));
    }
  }, [layout, mode]);
  
  // DragEvents ---------
  const onDragStart = useCallback<ItemCallback>((l, oldItem, newItem, p, e) => {
    e.stopPropagation();
  }, []);
  
  const onDrag = useCallback((l, oldItem, newItem, p, e) => {
    e.stopPropagation();
  }, []);

  const onDragStop = useCallback((l, oldItem, newItem, p, e) => {
    e.stopPropagation();
    setLayout(l);
  }, [setLayout]);

  const onDragOver = useCallback(() => {
    return newItem.droppingItem || { w: 2, h: 2 };
  }, [newItem]);
  
  // DropEvents --------
  const onDrop = useCallback((l) => {
    const {
      id,
    } = newItem;
    const newLayout = [...l.slice(0, -1), { ...l[l.length - 1], i: newItem.id, resizeHandles: ["s", "w", "e", "n", "se"] }];
    droppingItemLayout.current = getDefaultDropItem();
    
    dispatch(addComp(newItem));
    dispatch(setFocusItem({ id }));
    dispatch(addChild({ parentId, childId: id }));
    setLayout(newLayout);
  }, [newItem, dispatch, parentId, setLayout]);

  const onResizeStop = useCallback((l) => {
    window.dispatchEvent(new Event('resize'));
    setLayout(l);
  }, [setLayout]);
  
  return (
    <ResponsiveGridLayout
      isDroppable={true}
      rowHeight={8}
      allowOverlap={false}
      cols={{ lg: 24, md: 20, sm: 16, xs: 12, xxs: 8 }}
      margin={[0, 5]}
      {...props}
      layouts={{
        lg: computedLayout,
        md: computedLayout,
        sm: computedLayout,
      }}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragStop={onDragStop}
      onDropDragOver={onDragOver}
      onDrop={onDrop}
      onResizeStop={onResizeStop}
      droppingItem={droppingItemLayout.current}
    >
      {props.children}
      <div>???</div>
    </ResponsiveGridLayout>
  );
}

export default LayoutContainer;