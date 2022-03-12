import React, { useCallback, useMemo } from 'react';
import { Form, FormProps, Button } from 'antd';
import { ComponentMeta } from '../../types';
import withLayoutContainer from '../../hoc/withLayoutContainer';
import withDragItem from '../../hoc/withDragItem';
import cls from 'classnames'
import './Form.scss';

export const FormMeta: ComponentMeta = {
  ComponentType: 'Form',
  configForm: {
    fields: [
      {
        type: 'Input',
        props: {
          type: '',
          placeholder: '请输入表单标题'
        },
        fieldProps: {
          name: 'title',
          label: '表单标题'
        }
      },
    ]
  },
  droppingItem: {
    w: 12,
    h: 16
  }
}

const TheForm: React.FC<FormProps> = (props) => {
  const { style = {}, className, title } = props;
  const [form] = Form.useForm();
  const formStyle: React.CSSProperties = useMemo(() => ({
    height: '100%'
  }), []);
  const computedStyle = useMemo(() => ({ ...formStyle, ...style }), [style, formStyle]);
  const onSubmit = useCallback(() => {
    form.validateFields().then(() => {
      console.log(form.getFieldsValue(true));
    }).catch(() => {
      console.error('校验不通过')
    })
  }, [form]);

  return (
    <Form {...props} style={computedStyle} className={cls(className, 'draggableForm')} form={form} layout="vertical">
      <h3>{title}</h3>
      {props.children}
      <Button type='primary' className='submitButton' onClick={onSubmit}>submit</Button>
    </Form>
  );
}

export default withDragItem(withLayoutContainer(TheForm));
