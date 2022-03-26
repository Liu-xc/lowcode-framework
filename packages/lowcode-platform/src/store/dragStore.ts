import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidV4 } from 'uuid';
import { ConfigFormProps } from '../types';
export interface DragState {
  [k: string]: any;
  focusItemId: string;
  newItem: {
    [k: string]: any;
    id: string;
    ComponentType: string;
    configForm: ConfigFormProps;
    props?: any;
    droppingItem?: {
      i: string;
      w: number;
      h: number;
    }
  }
}

const initialState: DragState = {
  focusItemId: '',
  newItem: {
    id: '',
    ComponentType: '',
    configForm: {
      fields: []
    }
  }
};

// TODO 这里记录和拖拽相关的行为的数据，关于组件信息等全都记到layout中
export const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    resetDrag: () => {
      return initialState;
    },
    setNewItem: (state, { payload = {} }) => {
      const id = uuidV4();
      state.newItem = {
        id,
        ...payload
      }
    },
    setFocusItem: (state, { payload }) => {
      state.focusItemId = payload.id;
    }
  }
});


export const { setNewItem, setFocusItem, resetDrag } = dragSlice.actions;
export default dragSlice.reducer;