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
    setNewItem: (state, { payload = {} }) => {
      // TODO 这里应该去给组件设置一个id
      // * 需要看是新建还是啥
      const id = uuidV4();
      state.newItem = {
        id,
        ...payload
      }
    },
    setFocusItem: (state, { payload }) => {
      console.log('setFocusItem', payload);
      state.focusItemId = payload.id;
    }
  }
});


export const { setNewItem, setFocusItem } = dragSlice.actions;
export default dragSlice.reducer;