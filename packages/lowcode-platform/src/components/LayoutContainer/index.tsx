import React, { useCallback, useRef, useMemo, useEffect } from 'react';
import { Responsive, ResponsiveProps, ItemCallback, WidthProvider, Layout } from 'react-grid-layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setFocusItem, addComp, addChild, setLayoutInfo, updateSchema } from '../../store';
import { v4 as uuidV4 } from 'uuid';
import { useParams } from 'react-router-dom';
import './index.scss';
import { cloneDeep, get, isEqual } from 'lodash';

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
    const res = layoutInfo.filter(Boolean).map(l => {
      if (mode === 'view') {
        return {...l, static: true, isDraggable: false};
      }
      return l;
    });
    if (mode !== 'view') {
      return res || [];
    } else {
      return res.map(l => ({ ...l, static: true, isDraggable: false })) || [];
    }
  }) as unknown as Layout[];
  const dispatch = useDispatch();
  const newItem = useSelector((state: RootState) => state.drag.newItem);
  const droppingItemLayout = useRef(getDefaultDropItem());

  const setLayout = useCallback((l) => {
    dispatch(setLayoutInfo({ id: parentId, layoutInfo: l }));
  }, [dispatch, parentId]);
  
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
    return newItem.droppingItem || { w: 6, h: 3 };
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
      cols={{ lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 }}
      margin={[0, 5]}
      {...props}
      layouts={{
        lg: layout,
        md: layout,
        sm: layout,
      }}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragStop={onDragStop}
      onDropDragOver={onDragOver}
      onDrop={onDrop}
      onResizeStop={onResizeStop}
      droppingItem={droppingItemLayout.current}
    >
      {
        (Array.isArray(props.children) ? props.children : [props.children || undefined]).filter(Boolean).map((child, i) => {
          return <div key={layout && layout[i]?.i || 'rootContainer'}>{child}</div>
        })
      }
    </ResponsiveGridLayout>
  );
}

export default LayoutContainer;