import React, { useMemo } from 'react';
import { Form, FormProps } from 'antd';
import { ComponentMeta } from '../../types';
import withLayoutContainer from '../../hoc/withLayoutContainer';
import cls from 'classnames'
import './Form.scss';

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

const TheForm: React.FC<FormProps> = (props) => {
  const { style = {}, className } = props;
  const formStyle: React.CSSProperties = useMemo(() => ({
    height: '100%'
  }), []);
  const computedStyle = useMemo(() => ({ ...formStyle, ...style }), [style, formStyle]);
  return (
    <Form {...props} style={computedStyle} className={cls(className, 'draggableForm')} />
  );
}

export default withLayoutContainer(TheForm);
