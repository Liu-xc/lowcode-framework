import { configureStore } from '@reduxjs/toolkit';
import layoutReducers from './layoutStore';
import dragReducers from './dragStore';
import schemaReducers from './schemaStore';
import { cloneDeep, set } from 'lodash';

const store = configureStore({
  reducer: {
    layout: layoutReducers,
    drag: dragReducers,
    schema: schemaReducers
  }
});

const ContainerComps = ['Container', 'Form'];
const commonKeys: Record<string, string> = {
  ComponentType: 'ComponentType',
  id: 'id',
  configProps: 'props',
};

const generateComp = (id: string, compInfoMap: any, res: Record<string, any>, readonly: boolean) => {
  const compInfo = compInfoMap[id];
  if (!compInfo) {
    return;
  }
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
    const layoutChildren = childrenList.map((layoutChildId: string) => generateComp(layoutChildId, compInfoMap, {}, readonly)).filter(Boolean);
    res.children = layoutChildren;
  }
  res.props = res.props || {};
  res.props.id = id;
  res.props.parentId = id === 'rootContainer' ? '' : compInfo.parentId || 'rootContainer'

  if (res.props.schemaConfigs) {
    const schemaConfigs = cloneDeep(res.props.schemaConfigs) as { path: string, expression: string }[];
    Reflect.deleteProperty(res.props, 'schemaConfigs');

    for (const config of schemaConfigs) {
      const { path, expression } = config;
      set(res, path, expression);
    }
  }

  return res;
}

export const exportSchema = (readonly = false) => {
  const storeState = cloneDeep(store.getState())
  const { layout } = storeState;
  const compInfo = layout.compInfo;
  const ids = Object.keys(compInfo);
  const rootId = ids.find(id => !compInfo[id].parentId);
  const res = generateComp(rootId!, compInfo, {}, readonly);
  return cloneDeep(res);
}

export const exportLayoutStore = (readonly = false) => {
  const storeState = cloneDeep(store.getState().layout);
  storeState.readonly = readonly;
  return storeState;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export * from './dragStore';
export * from './layoutStore';
export * from './schemaStore';