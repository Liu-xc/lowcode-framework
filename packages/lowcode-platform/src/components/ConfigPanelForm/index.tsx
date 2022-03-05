import React, { useCallback } from 'react';
import { Form, Input, FormProps, FormItemProps, Radio, Select, Slider, Switch } from 'antd';
import { v4 as uuidV4 } from 'uuid';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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
  fieldProps: FormItemProps;
};

export interface ConfigFormProps {
  fields: Field[],
  formProps?: FormProps;
}

const ConfigPanelForm: React.FC = () => {
  const focusItemId = useSelector((state: RootState) => state.drag.focusItemId);
  const configs = useSelector((state: RootState) => state.layout.compInfo[focusItemId]);

  const getFieldItem = useCallback((type: FieldType, props: any = {}) => {
    switch (type) {
      case 'Input':
        return <Input key={uuidV4()} {...props} />
      case 'Radio':
        return <Radio key={uuidV4()} {...props} />
      case 'Select':
        return (
          <Select key={uuidV4()} {...props} />
        );
      case 'Slider':
        return <Slider key={uuidV4()} {...props} />;
      case 'Switch':
        return <Switch key={uuidV4()} {...props} />
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

  if (!focusItemId || !configs) {
    return null;
  }

  const {
    id,
    ComponentType,
    configForm
  } = configs;
  const {
    fields,
    formProps
  } = configForm;

  return (
    <Form
      {...formProps}
      layout="vertical"
    >
      <h2>{ComponentType}: {id}</h2>
      {
        fields.map((field: any) => renderField(field))
      }
    </Form>
  );
}


export default ConfigPanelForm;