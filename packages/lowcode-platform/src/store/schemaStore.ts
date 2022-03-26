import { createSlice } from '@reduxjs/toolkit';
import { ComponentMeta } from '../types';
import { exportSchema } from '.';

export interface SchemaState {
  schema: any;
}

const initialState: SchemaState = {
  schema: {}
};

export const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    updateSchema: (state, { payload }) => {
      // const { schema } = payload;
      // state.schema = schema || exportSchema();
    }
  }
});

export const {
  updateSchema
} = schemaSlice.actions;

export default schemaSlice.reducer;