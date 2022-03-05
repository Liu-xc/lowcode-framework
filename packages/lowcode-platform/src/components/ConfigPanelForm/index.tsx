import React, { useCallback } from 'react';
import { Form, Input, FormProps, FormItemProps, Radio, Select, Slider, Switch } from 'antd';
import { v4 as uuidV4 } from 'uuid';

/**
 * field types
 * - Radio
 * - Input
 * - Button
 * - Select
 * - InputNumber
 * - Switch
 * - Slider
*/

type FieldType = 'Radio' | 'Input' | 'Select' | 'Switch' | 'Slider';

type Field = {
  type: FieldType;
  props: any;
  fieldProps?: FormItemProps;
};

export interface ConfigFormProps {
  fields: Field[],
  formProps: FormProps;
}

const ConfigPanelForm: React.FC<ConfigFormProps> = props => {
  // TODO 这里应该不需要从外部传参
  const {
    fields,
    formProps
  } = props;

  const getFieldItem = useCallback((type: FieldType, props: any = {}) => {
    switch (type) {
      case 'Input':
        return <Input {...props} />
      case 'Radio':
        return <Radio {...props} />
      case 'Select':
        {
          const {
            selectProps = {},
            options = []
          } = props as any;
          const { Option } = Select;
          return (
            <Select {...selectProps}>
              {
                options.map((opt: any) => <Option key={opt.label} {...opt} />)
              }
            </Select>
          );
        }
      case 'Slider':
        return <Slider {...props} />;
      case 'Switch':
        return <Switch {...props} />
      default:
        return <></>;
    }
  }, []);

  const renderField = useCallback((field: Field) => {
    const {
      type,
      props,
      fieldProps = {}
    } = field;

    return (
      <Form.Item key={uuidV4()} {...fieldProps}>
        {getFieldItem(type, props)}
      </Form.Item>
    );
  }, [getFieldItem]);

  return (
    <Form {...formProps}>
      <h2>表单</h2>
      {
        fields.map(field => renderField(field))
      }
    </Form>
  );
}


export default ConfigPanelForm;