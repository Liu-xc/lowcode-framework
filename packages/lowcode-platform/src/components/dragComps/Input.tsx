import React from 'react';
import { Input, InputProps } from 'antd';
import withDragItem from '../../hoc/withDragItem';
import { ComponentMeta } from '../../types';
import { createOptions } from './commonConfigs';
import { withField, withFieldMeta } from '../../hoc/withField';

const meta: ComponentMeta = {
  ComponentType: 'Input',
  configForm: {
    fields: [
      {
        type: 'Select',
        props: {
          options: createOptions(['number', 'password', 'textarea', 'text']),
        },
        fieldProps: {
          label: '输入框类型',
          name: 'type'
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
        type: '',
        placeholder: ''
      }
    },
    rules: ['message', 'required', 'pattern', 'len', 'max', 'min']
  },
  droppingItem: {
    w: 5,
    h: 3
  }
};

export const InputMeta: ComponentMeta = withFieldMeta(meta);

const TheInput: React.FC<any> = props => {
  const { type, ...otherProps } = props;
  if (type === 'textarea') {
    return <Input.TextArea {...otherProps} />;
  }
  return <Input {...props} />;
}

export default withDragItem(withField(TheInput));
