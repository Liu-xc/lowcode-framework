import React from 'react';
import { Input, InputProps } from 'antd';
import withDragItem from '../../hoc/withDragItem';
import { ComponentMeta, ConfigFormProps } from '../../types';
import { createOptions } from './commonConfigs';


export const InputMeta: ComponentMeta = {
  ComponentType: 'Input',
  configForm: {
    fields: [
      {
        type: 'Select',
        props: {
          options: createOptions(['Number', 'Password', 'TextArea', 'Text']),
        },
        fieldProps: {
          label: '输入框类型',
          name: 'inputType'
        }
      },
      {
        type: 'Input',
        props: {
          type: '',
          placeholder: '请输入占位符'
        },
        fieldProps: {
          label: '占位内容',
          name: 'placeholder'
        }
      }
    ],
    formProps: {
      initialValues: {
        inputType: '',
        placeholder: 'this is input'
      }
    }
  },
};

const DraggableInput = withDragItem(Input, InputMeta);

export default DraggableInput;
