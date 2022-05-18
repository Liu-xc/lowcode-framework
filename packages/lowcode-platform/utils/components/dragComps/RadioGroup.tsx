import React from 'react';
import { withField, withContainerChild, withFieldMeta } from '../../hoc';
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
    w: 6,
    h: 3
  }
}

export const RadioGroupMeta: ComponentMeta = withFieldMeta(meta);

export default withContainerChild(withField(Radio.Group));