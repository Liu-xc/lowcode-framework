import React, { useCallback, useState } from 'react';
import GridLayout, { ReactGridLayoutProps, ItemCallback, Layout, WidthProvider } from 'react-grid-layout';
import { useDispatch } from 'react-redux';
import { setFocusItem } from '../../store';

const LayoutContainer: React.FC<ReactGridLayoutProps> = props => {
  const [layout, setLayout] = useState<Layout[]>([{ i: "a", x: 0, y: 0, w: 1, h: 2, static: true },]);
  const dispatch = useDispatch();
  
  // DragEvents ---------
  const onDragStart = useCallback<ItemCallback>(
    (
      l,
      oldItem,
      newItem,
    ) => {
    // * 拖拽开始时应该获取到元素的信息
      console.log('handleDragStart');
      // console.log(oldItem, newItem);
    }, []);
  
  const onDrag = useCallback((
    l,
    oldItem,
    newItem
  ) => {
    console.log('onDrag');
    // console.log(oldItem, newItem);
  }, []);

  const onDragStop = useCallback((
    l,
    oldItem,
    newItem
  ) => {
    console.log('onDragStop');
    // console.log(l, layout, newItem);
  }, [layout]);
  
  // DropEvents --------
  const onDrop = useCallback((
    l,
    item
  ) => {
    console.log('onDrop');
    // console.log(l, layout, item);
    // * 由于这里测试用的dragItem的i是固定的，为了演示效果，这里在向layout添加项的时候将i更换为时间戳
    // * 实际上应该直接将l赋值给layout
    setLayout(prev => {
      const res = [...prev, { ...item, i: Date.now().toString() }];
      console.log(res);
      return res;
    });
  }, [layout]);

  const onClickItem = useCallback((id: string) => {
    // TODO 在状态中心应该记录所有的组件id以及组件的meta信息

    // TODO 点击拖拽子元素时应该聚焦到这个元素
    // * 将状态中心的对象设置为该子元素
    console.log(`click item: ${id}`);

    // 在遍历渲染子元素时，如果id和状态中心的当前id相同，就渲染一个高亮边框
    dispatch(setFocusItem({ id }));
  }, [dispatch]);
  
  return (
    <GridLayout
      isDroppable={true}
      rowHeight={50}
      cols={24}
      {...props}
      layout={layout}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragStop={onDragStop}
      onDrop={onDrop}
    >
      {
        layout.map(l => (
          <div
            key={l.i}
            onClick={() => onClickItem(l.i)}
          >
            {l.i}
          </div>
        ))
      }
    </GridLayout>
  );
}

export default WidthProvider(LayoutContainer);