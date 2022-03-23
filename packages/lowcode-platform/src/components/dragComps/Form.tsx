import React, { useCallback, useMemo, useState } from 'react';
import { Form, FormProps, Button, Modal, message, Spin } from 'antd';
import { ComponentMeta } from '../../types';
import withLayoutContainer from '../../hoc/withLayoutContainer';
import withDragItem from '../../hoc/withDragItem';
import { createApiMethod } from 'app-framework';
import { useParams } from 'react-router-dom';
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
      {
        type: 'Input',
        props: {
          type: 'text',
          placeholder: '请输入表单提交地址'
        },
        fieldProps: {
          name: 'action',
          label: '提交地址'
        }
      }
    ]
  },
  droppingItem: {
    w: 12,
    h: 16
  }
}

const TheForm: React.FC<FormProps> = (props) => {
  const { style = {}, className, title, action } = props;
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<undefined | Error>();
  const [form] = Form.useForm();
  const { mode } = params;
  const isProd = useMemo(() => mode === 'view', [mode]);

  const formStyle: React.CSSProperties = useMemo(() => ({
    height: '100%'
  }), []);
  const computedStyle = useMemo(() => ({ ...formStyle, ...style }), [style, formStyle]);
  
  const request = useMemo(() => createApiMethod({
    url: action,
    method: 'POST'
  }), [action]);

  const submitFormData = useCallback(async () => {
    setError(undefined);
    setLoading(true);
    const formValue = form.getFieldsValue(true);
    request({ data: formValue }).then(() => {
      message.success('提交成功', 2);
    }).catch(() => {
      message.error('提交失败', 3);
    }).finally(() => {
      setLoading(false);
    });
  }, [request, form]);

  const onSubmit = useCallback(() => {
    form.validateFields().then(() => {
      const formValue = form.getFieldsValue(true);
      console.log(formValue);
      if (isProd) {
        submitFormData()
      } else {
        setShowModal(true);
      }
    }).catch(() => {
      console.error('校验不通过')
    })
  }, [form, isProd, submitFormData]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);


  return (
    <div>
      <Form {...props} style={computedStyle} className={cls(className, 'draggableForm')} form={form} layout="vertical">
        <h3>{title}</h3>
        {props.children}
        <Button type='primary' className='submitButton' onClick={onSubmit}>submit</Button>
        {loading && <Spin className='loading' />}
      </Form>
      {!isProd && (
        <Modal
          title="form value"
          closable
          onOk={closeModal}
          afterClose={closeModal}
          visible={showModal}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {JSON.stringify(form.getFieldsValue(true))}
        </Modal>
      ) }
    </div>
  );
}

export default withDragItem(withLayoutContainer(TheForm));
