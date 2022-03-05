import { createSlice } from '@reduxjs/toolkit';

export interface DragState {
  [k: string]: any;
  focusItem: {
    [k: string]: any;
    id: string;
  }
}

const initialState: DragState = {
  focusItem: {
    id: ''
  }
};

// TODO 这里记录和拖拽相关的行为的数据，关于组件信息等全都记到layout中
export const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setDraggingItem: (state, { payload }) => {
      console.log(state, payload.id);
    },
    setFocusItem: (state, { payload }) => {
      console.log('setFocusItem', payload);
      state.focusItem.id = payload.id;
    }
  }
});


export const { setDraggingItem, setFocusItem } = dragSlice.actions;
export default dragSlice.reducer;