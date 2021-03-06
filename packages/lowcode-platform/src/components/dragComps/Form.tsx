import React, { useCallback, useMemo, useState } from 'react';
import { Form, FormProps, Button, Modal, message, Spin } from 'antd';
import { ComponentMeta } from '../../types';
import {withContainerChild, withLayoutContainer} from '../../hoc';
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
    w: 20,
    h: 16
  }
}

interface TheFormProps extends FormProps {
  [k: string]: any;
  formKey?: string;
  fieldRules?: any;
}

const TheForm: React.FC<TheFormProps> = (props) => {
  const { style = {}, className, title, action, fieldRules, schemaConfigs, ...otherProps } = props;
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<undefined | Error>();
  const [form] = Form.useForm();
  const { mode, schemaName: formKey } = params;
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
    console.log(formKey);
    if (!formKey) {
      message.warn('无formKey', 1);
      setLoading(false);
    }
    formKey && request({
      data: {
        formKey,
        formValue
    }}).then(() => {
      message.success('提交成功', 2);
    }).catch((e) => {
      console.error(e);
      message.error('提交失败', 3);
    }).finally(() => {
      setLoading(false);
    });
  }, [request, form, formKey]);

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
      console.error('校验不通过');
      message.error('表单校验不通过，请检查填写', 2);
    })
  }, [form, isProd, submitFormData]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);


  return (
    <>
      <Form {...otherProps} style={computedStyle} className={cls(className, 'draggableForm')} form={form} layout="vertical">
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
    </>
  );
}

export default withContainerChild(withLayoutContainer(TheForm), true);
