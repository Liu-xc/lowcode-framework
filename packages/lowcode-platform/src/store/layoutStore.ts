import { createSlice } from '@reduxjs/toolkit';
import { ComponentMeta } from '../types';

export interface LayoutState {
  [k: string]: any;
  compInfo: {
    [id: string]: {
      [k: string]: any;
      meta: ComponentMeta;
      configProps?: any;
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
    }
  }
});


export const { setLayout, addComp, updateConfigProps } = layoutSlice.actions;
export default layoutSlice.reducer;