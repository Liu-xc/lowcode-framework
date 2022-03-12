import { createSlice } from '@reduxjs/toolkit';
import { ComponentMeta } from '../types';

export interface LayoutState {
  [k: string]: any;
  compInfo: {
    [id: string]: {
      [k: string]: any;
      meta: ComponentMeta;
      configProps?: any;
      childrenList?: string[];
      parentId?: string;
      layoutInfo?: any[];
      layoutChildCompTypes?: string[]
    };
  }
}

const initialState: LayoutState = {
  compInfo: {
    rootContainer: {
      ComponentType: 'Container',
      id: 'rootContainer',
      meta: {} as any,
      configProps: {
        containerStyle: {
          minHeight: '100%',
          backgroundColor: 'pink',
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden'
        }
      }
    }
  }
};

// TODO 记录一张id和meta对应的表
// TODO 需要能够回填FORM
export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    replaceLayoutStore: (state, { payload }) => {
      const { layoutStore } = payload;
      state.compInfo = layoutStore.compInfo;
    },
    setLayoutInfo: (state, { payload }) => {
      const { id = 'rootContainer', layoutInfo } = payload;
      if (!state.compInfo[id]) {
        state.compInfo[id] = {} as any;
      }
      state.compInfo[id].layoutInfo = layoutInfo;
    },
    setLayoutChildCompTypes: (state, { payload }) => {
      const { id = 'rootContainer', layoutChildCompTypes } = payload;
      if (!id) {
        return;
      }
      state.compInfo[id].layoutChildCompTypes = layoutChildCompTypes;
    },
    addComp: (state, { payload }) => {
      const { id } = payload;
      state.compInfo[id] = payload;
    },
    updateConfigProps: (state, { payload }) => {
      const {
        id,
        value
      } = payload;
      state.compInfo[id].configProps = value;
    },
    addChild: (state, { payload }) => {
      const { parentId = 'rootContainer', childId } = payload;
      if (!parentId || !childId) {
        return;
      }
      const {
        childrenList = []
      } = state.compInfo[parentId];
      if (!childrenList.includes(childId)) {
        childrenList.push(childId);
        state.compInfo[parentId].childrenList = childrenList;
        state.compInfo[childId].parentId = parentId;
      }
    },
    removeChild: (state, { payload }) => {
      const { parentId, childId } = payload;
      if (!parentId) {
        return;
      }
      const {
        childrenList = []
      } = state.compInfo[parentId];
      if (childrenList.includes(childId)) {
        const index = childrenList.indexOf(childId);
        childrenList.splice(index, 1);
        state.compInfo[parentId].childrenList = childrenList;
      }
    },
    removeComp: (state, { payload }) => {
      const { id } = payload;
      const { ...newInfo } = state.compInfo;
      const deleteFunc = (cid: string) => {
        const child = newInfo[cid];
        const childrenList = child?.childrenList || [];
        childrenList.forEach(c => deleteFunc(c));
        Reflect.deleteProperty(newInfo, cid);
      }
      deleteFunc(id);
      state.compInfo = newInfo || {};
    }
  }
});


export const {
  replaceLayoutStore,
  setLayoutInfo,
  setLayoutChildCompTypes,
  addComp,
  updateConfigProps,
  addChild,
  removeChild,
  removeComp
} = layoutSlice.actions;
export default layoutSlice.reducer;