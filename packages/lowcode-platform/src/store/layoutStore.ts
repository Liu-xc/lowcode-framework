import { createSlice } from '@reduxjs/toolkit';


export interface LayoutState {
  [k: string]: any;
}

const initialState: LayoutState = {};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: (state) => {
      console.log(state);
    }
  }
});


export const { setLayout } = layoutSlice.actions;
export default layoutSlice.reducer;