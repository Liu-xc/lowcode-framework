import React, { useCallback, useMemo } from 'react';
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
  const [form] = Form.useForm();
  const formStyle: React.CSSProperties = useMemo(() => ({
    height: '100%'
  }), []);
  const computedStyle = useMemo(() => ({ ...formStyle, ...style }), [style, formStyle]);
  const onSubmit = useCallback(() => {
    console.log(form.getFieldsValue(true));
  }, [form]);

  return (
    <Form {...props} style={computedStyle} className={cls(className, 'draggableForm')} form={form} layout="vertical">
      {props.children}
      <button onClick={onSubmit}>submit</button>
    </Form>
  );
}

export default withLayoutContainer(TheForm);
