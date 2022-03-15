import { configureStore } from '@reduxjs/toolkit';
import layoutReducers from './layoutStore';
import dragReducers from './dragStore';
import { cloneDeep } from 'lodash';

const store = configureStore({
  reducer: {
    layout: layoutReducers,
    drag: dragReducers
  }
});

const ContainerComps = ['Container', 'Form'];
const commonKeys: Record<string, string> = {
  ComponentType: 'ComponentType',
  id: 'id',
  configProps: 'props'
};

const generateComp = (id: string, compInfoMap: any, res: Record<string, any>, readonly: boolean) => {
  const compInfo = compInfoMap[id];
  const {
    ComponentType,
  } = compInfo;
  const isContainer = ContainerComps.some(c => c === ComponentType);
  Object.keys(commonKeys).forEach(k => {
    const schemaKey = commonKeys[k];
    res[schemaKey] = compInfo[k];
  });
  if (isContainer) {
    const { childrenList = [] } = compInfo;
    res.props = res.props || {};
    const { layoutInfo = [], layoutChildCompTypes = [] } = compInfo;
    const layoutChildren = childrenList.map((layoutChildId: string) => generateComp(layoutChildId, compInfoMap, {}, readonly));
    res.props.layoutInfo = layoutInfo.filter(Boolean);
    res.props.layoutChildren = layoutChildren;
    res.props.layoutChildCompTypes = layoutChildCompTypes;
    if (readonly) {
      res.props.layoutInfo = res.props.layoutInfo.map((l: any) => ({ ...l, static: true, isDraggable: false }));
    }
  }
  res.props = res.props || {};
  res.props.id = id;
  return res;
}

export const exportSchema = (readonly = false) => {
  const storeState = cloneDeep(store.getState())
  const { layout } = storeState;
  const compInfo = layout.compInfo;
  const ids = Object.keys(compInfo);
  const rootId = ids.find(id => !compInfo[id].parentId);
  const res = generateComp(rootId!, compInfo, {}, readonly);
  console.log('exportSchema', res);
  return cloneDeep(res);
}

export const exportLayoutStore = (readonly = false) => {
  const storeState = cloneDeep(store.getState().layout);
  storeState.readonly = readonly;
  console.log('layoutStore', storeState);
  return storeState;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export * from './dragStore';
export * from './layoutStore';