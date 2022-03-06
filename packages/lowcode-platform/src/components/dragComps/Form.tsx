import React from 'react';
import { Form } from 'antd';
import { ComponentMeta } from '../../types';
import withLayoutContainer from '../../hoc/withLayoutContainer';

export const FormMeta: ComponentMeta = {
  ComponentType: 'Form',
  configForm: {
    fields: [
      {
        type: 'Input',
        props: {
          type: 'number'
        },
        fieldProps: {
          name: 'width',
          label: 'form宽度'
        }
      },
      {
        type: 'Input',
        props: {
          type: 'number'
        },
        fieldProps: {
          name: 'height',
          label: 'form高度'
        }
      }
    ]
  },
  droppingItem: {
    w: 10,
    h: 10
  }
}

export default withLayoutContainer(Form);
