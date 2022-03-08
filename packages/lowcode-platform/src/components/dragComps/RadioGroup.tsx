import React from 'react';
import { withField, withDragItem, withFieldMeta } from '../../hoc';
import { ComponentMeta } from '../../types';
import { Radio } from 'antd';

const meta: ComponentMeta = {
  ComponentType: 'RadioGroup',
  configForm: {
    fields: [
      {
        type: 'Options',
        props: {},
        fieldProps: {
          label: '创建选项',
          name: 'options'
        }
      }
    ],
    formProps: {
      initialValues: {
        options: []
      }
    }
  },
  droppingItem: {
    w: 5,
    h: 4
  }
}

export const RadioGroupMeta: ComponentMeta = withFieldMeta(meta);

export default withDragItem(withField(Radio.Group));