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

const generateComp = (id: string, compInfoMap: any, res: Record<string, any>) => {
  const compInfo = cloneDeep(compInfoMap[id]);
  const {
    ComponentType,
  } = compInfo;
  const isContainer = ContainerComps.some(c => c === ComponentType);
  Object.keys(commonKeys).forEach(k => {
    const schemaKey = commonKeys[k];
    res[schemaKey] = compInfo[k];
  });
  if (isContainer) {
    res.children = (compInfo.childrenList || []).map((childId: string) => {
      return generateComp(childId, compInfoMap, {});
    });
    res.props = res.props || {};
    const layoutInfo = cloneDeep(compInfo.layoutInfo);
    res.props.layoutInfo = layoutInfo.filter(Boolean);
  }
  return res;
}

export const exportSchema = () => {
  const res: Record<string, any> = {};
  const storeState = cloneDeep(store.getState())
  const { layout } = storeState;
  const compInfo = layout.compInfo;
  const ids = Object.keys(compInfo);
  const rootId = ids.find(id => !compInfo[id].parentId);
  // console.log(rootId);
  generateComp(rootId!, compInfo, res);
  console.log(res);
  return res;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export * from './dragStore';
export * from './layoutStore';