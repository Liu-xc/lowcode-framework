import React from 'react';
import { ComponentMeta, Field } from '../types';
import { Form } from 'antd';

const { Item } = Form

const FieldConfigs: Field[] = [
  {
    type: 'Input',
    props: {
      placeholder: '请输入字段标题'
    },
    fieldProps: {
      name: 'fieldLabel',
      label: '字段标题'
    }
  },
  {
    type: 'Input',
    props: {
      placeholder: '请输入字段Key'
    },
    fieldProps: {
      name: 'fieldKey',
      label: '字段Key'
    }
  }
];

// eslint-disable-next-line react/display-name
const withField = (Component: React.ComponentType<any>) => (props: any) => {
  const { fieldLabel, fieldKey, ...compProps } = props;

  return (
    <Item label={fieldLabel} name={fieldKey}>
      <Component {...compProps}/>
    </Item>
  );
}

const withFieldMeta = (meta: ComponentMeta) => {
  const originFields = meta.configForm.fields;
  meta.configForm.fields = [...FieldConfigs, ...originFields];
  return meta;
}


export {
  withField,
  withFieldMeta
}