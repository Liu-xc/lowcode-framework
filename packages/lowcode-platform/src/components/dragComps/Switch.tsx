import React from 'react';
import { Switch, SwitchProps } from 'antd';
import { ComponentMeta } from '../../types';
import { withField, withFieldMeta, withDragItem } from '../../hoc';

const meta: ComponentMeta = {
  ComponentType: 'Switch',
  configForm: {
    fields: [
      {
        type: 'Input',
        props: {
          type: 'text',
          placeholder: '请输入选中时文案'
        },
        fieldProps: {
          label: '选中时文案',
          name: 'checkedChildren'
        }
      },
      {
        type: 'Input',
        props: {
          type: 'text',
          placeholder: '请输入未选中时文案'
        },
        fieldProps: {
          label: '未选中时文案',
          name: 'unCheckedChildren'
        }
      }
    ],
    formProps: {
      initialValues: {
        checkedChildren: '',
        unCheckedChildren: ''
      }
    },
  },
  droppingItem: {
    w: 4,
    h: 4
  }
}

export const SwitchMeta: ComponentMeta = withFieldMeta(meta);


export default withDragItem(withField(Switch));