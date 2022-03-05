import { Input } from 'antd';
import withDragItem from '../../hoc/withDragItem';
import { ComponentMeta } from '../../types';
import { createOptions } from './commonConfigs';


export const InputMeta: ComponentMeta = {
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
    }
  },
  droppingItem: {
    w: 5,
    h: 3
  }
};

const DraggableInput = withDragItem(Input, InputMeta);

export default DraggableInput;
