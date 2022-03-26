import { createSlice } from '@reduxjs/toolkit';
import { ComponentMeta } from '../types';

export interface LayoutState {
  [k: string]: any;
  readonly: boolean;
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
  },
}

const initialState: LayoutState = {
  readonly: false,
  compInfo: {
    rootContainer: {
      ComponentType: 'Container',
      id: 'rootContainer',
      meta: {} as any,
      configProps: {
        containerStyle: {
          minHeight: '100%',
          // backgroundColor: 'pink',
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden'
        }
      },
      layoutInfo: []
    }
  },
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    replaceLayoutStore: (state, { payload }) => {
      const { layoutStore } = payload;
      state.compInfo = layoutStore.compInfo;
      state.readonly = layoutStore.readonly;
    },
    setLayoutInfo: (state, { payload }) => {
      const { id = 'rootContainer', layoutInfo } = payload;
      if (!state.compInfo[id]) {
        state.compInfo[id] = {} as any;
      }
      state.compInfo[id].layoutInfo = layoutInfo;
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
        childrenList = [],
        layoutInfo = []
      } = state.compInfo[parentId];
      if (childrenList.includes(childId)) {
        const index = childrenList.indexOf(childId);
        childrenList.splice(index, 1);
        state.compInfo[parentId].childrenList = childrenList;
      }
      const childLayoutIndex = layoutInfo.findIndex(l => l.i === childId);
      if (childLayoutIndex > -1) {
        layoutInfo.splice(childLayoutIndex, 1);
        state.compInfo[parentId].layoutInfo = layoutInfo;
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
    },
    setReadonly: (state, { payload }) => {
      const { readonly } = payload;
      state.readonly = readonly;
    },
  }
});


export const {
  replaceLayoutStore,
  setLayoutInfo,
  addComp,
  updateConfigProps,
  addChild,
  removeChild,
  removeComp,
  setReadonly,
} = layoutSlice.actions;
export default layoutSlice.reducer;