import { createSlice } from '@reduxjs/toolkit';

export interface DragState {
  [k: string]: any;
}

const initialState: DragState = {};

export const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setDraggingItem: (state) => {
      console.log(state);
    },
  }
});


export const { setDraggingItem } = dragSlice.actions;
export default dragSlice.reducer;