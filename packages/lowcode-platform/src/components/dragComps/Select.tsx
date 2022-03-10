import React from 'react';
import { Select } from 'antd';
import { ComponentMeta } from '../../types';
import { withField, withDragItem, withFieldMeta } from '../../hoc';

const meta: ComponentMeta = {
  ComponentType: 'Select',
  configForm: {
    fields: [{
      type: 'Options',
      props: {},
      fieldProps: {
        name: 'options',
        label: '创建选项'
      }
    }],
    formProps: {
      initialValues: {
        options: []
      }
    },
    rules: ['message', 'required']
  },
  droppingItem: {
    w: 5,
    h: 4
  }
}

export const SelectMeta = withFieldMeta(meta);

export default withDragItem(withField(Select));
