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
    };
  }
}

const initialState: LayoutState = {
  compInfo: {}
};

// TODO 记录一张id和meta对应的表
// TODO 需要能够回填FORM
export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: (state) => {
      console.log(state);
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
      const { parentId, childId } = payload;
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
  setLayout,
  addComp,
  updateConfigProps,
  addChild,
  removeChild,
  removeComp
} = layoutSlice.actions;
export default layoutSlice.reducer;