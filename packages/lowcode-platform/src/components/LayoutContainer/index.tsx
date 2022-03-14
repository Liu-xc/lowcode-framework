import React, { useCallback, useState, useRef, useContext, useEffect, useMemo } from 'react';
import { Responsive, ResponsiveProps, ItemCallback, Layout, WidthProvider } from 'react-grid-layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setFocusItem, addComp, addChild, removeChild, removeComp, setLayoutInfo, setLayoutChildCompTypes } from '../../store';
import { v4 as uuidV4 } from 'uuid';
import { ComponentsMapContext } from '../';
import { CloseCircleOutlined } from '@ant-design/icons';
import cls from 'classnames';
import { useParams } from 'react-router-dom';
import './index.scss';

export interface LayoutContainerProps extends ResponsiveProps {
  containerCompId: string;
  layoutInfo: any[],
  layoutChildren: any[],
  layoutChildCompTypes: string[];
}

const getDefaultDropItem = () => ({ i: uuidV4(), w: 2, h: 2 });

const ResponsiveGridLayout = WidthProvider(Responsive);
const LayoutContainer: React.FC<LayoutContainerProps> = props => {
  const { mode } = useParams();
  const {
    containerCompId: parentId,
    layoutInfo = [],
    layoutChildren = [],
    layoutChildCompTypes = []
  } = props;
  const ComponentsMap = useContext(ComponentsMapContext);
  const [layout, setLayout] = useState<Layout[]>(layoutInfo.filter(Boolean).length ? layoutInfo : []);
  const [childCompTypes, setChildCompTypes] = useState<string[]>(layoutChildCompTypes);
  const dispatch = useDispatch();
  const newItem = useSelector((state: RootState) => state.drag.newItem);
  const curFocusId = useSelector((state: RootState) => state.drag.focusItemId);
  const droppingItemLayout = useRef(getDefaultDropItem());

  const computedLayout = useMemo(() => {
    if (mode !== 'view') {
      return layout;
    } else {
      return layout.map(l => ({ ...l, static: true, isDraggable: false }));
    }
  }, [layout, mode]);
  
  // DragEvents ---------
  const onDragStart = useCallback<ItemCallback>(
    (
      l,
      oldItem,
      newItem,
      p,
      e
    ) => {
    // * 拖拽开始时应该获取到元素的信息
      e.stopPropagation();
      // console.log(oldItem, newItem);
    }, []);
  
  const onDrag = useCallback((
    l,
    oldItem,
    newItem,
    p,
    e
  ) => {
    e.stopPropagation();
    // console.log(oldItem, newItem);
  }, []);

  const onDragStop = useCallback((
    l,
    oldItem,
    newItem,
    p,
    e
  ) => {
    e.stopPropagation();
    setLayout(l);
    // console.log(l, layout, newItem);
  }, []);

  const onDragOver = useCallback(() => {
    return newItem.droppingItem || { w: 2, h: 2 };
  }, [newItem]);
  
  // DropEvents --------
  const onDrop = useCallback((
    l,
    item
  ) => {
    // console.log(l, layout, item);
    // * 由于这里测试用的dragItem的i是固定的，为了演示效果，这里在向layout添加项的时候将i更换为时间戳
    // * 实际上应该直接将l赋值给layout
    const {
      id,
      ComponentType,
      droppingItem = {},
      props = {}
    } = newItem;
    const newLayout = [...l.slice(0, -1), { ...l[l.length - 1], i: newItem.id, resizeHandles: ["s", "w", "e", "n", "se"] }];
    setLayout(newLayout);
    droppingItemLayout.current = getDefaultDropItem();
    setChildCompTypes(prev => [...prev, ComponentType])
    dispatch(addComp(newItem));
    dispatch(setFocusItem({ id }));
    dispatch(addChild({ parentId, childId: id }));
  }, [newItem, dispatch, parentId]);

  const renderItem = useCallback((i) => {
    const l = layout[i] as any;
    const { props: childProps } = layoutChildren.find((c) => c.id === l.i) || {};
    const Comp = ComponentsMap[childCompTypes[i]];
    return <Comp id={layout[i].i} {...(childProps || {})} />;
  }, [layout, ComponentsMap, layoutChildren, childCompTypes]);

  const onClickItem = useCallback((id: string, e: any) => {
    // TODO 在状态中心应该记录所有的组件id以及组件的meta信息

    // TODO 点击拖拽子元素时应该聚焦到这个元素
    // * 将状态中心的对象设置为该子元素

    // 在遍历渲染子元素时，如果id和状态中心的当前id相同，就渲染一个高亮边框
    dispatch(setFocusItem({ id }));
    e.stopPropagation();
  }, [dispatch]);

  const deleteItem = useCallback((id: string, e: any) => {
    e.stopPropagation();
    const index = layout.findIndex(l => l.i === id);
    if (index < 0) {
      return;
    }
    const newLayout = [...layout];
    const newCompTypes = [...childCompTypes];
    newLayout.splice(index, 1);
    newCompTypes.splice(index, 1);
    setLayout([...newLayout]);
    dispatch(removeComp({ id }));
    dispatch(removeChild({
      parentId,
      childId: id
    }));
    dispatch(setFocusItem({ id: undefined }))
  }, [dispatch, parentId, layout, childCompTypes]);

  const onResizeStop = useCallback((l) => {
    window.dispatchEvent(new Event('resize'));
    setLayout(l);
  }, []);

  useEffect(() => {
    dispatch(setLayoutInfo({
      id: parentId,
      layoutInfo: layout,
    }));
    dispatch(setLayoutChildCompTypes({
      id: parentId,
      layoutChildCompTypes: childCompTypes
    }));
  }, [parentId, layout, dispatch, childCompTypes]);
  
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
      {
        computedLayout.map((l, i) => (
          <div
            key={l.i}
            onClick={(e) => onClickItem(l.i, e)}
            className={cls("dragDiv", curFocusId === l.i && "focusItem", l.static && !l.isDraggable && 'readonly')}
          >
            {!(l.static && !l.isDraggable) && <CloseCircleOutlined onClick={(e) => deleteItem(l.i, e)} className='removeIcon' title='删除' />}
            {renderItem(i)}
          </div>
        ))
      }
    </ResponsiveGridLayout>
  );
}

export default LayoutContainer;