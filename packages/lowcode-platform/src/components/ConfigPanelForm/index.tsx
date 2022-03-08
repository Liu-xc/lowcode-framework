import React, { useCallback, useEffect, useMemo } from 'react';
import { Form, Input, FormProps, FormItemProps, Radio, Select, Slider, Switch } from 'antd';
import { v4 as uuidV4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, updateConfigProps } from '../../store';
import { debounce, cloneDeep } from 'lodash';
import OptionCreator from './OptionCreator';

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

type FieldType = 'Radio' | 'Input' | 'Select' | 'Switch' | 'Slider' | 'Options';

export type Field = {
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
  const configs = useSelector((state: RootState) => state.layout.compInfo[focusItemId]) || {};
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    id,
    ComponentType,
    configForm = {},
    configProps = {}
  } = configs;
  const {
    fields = [],
    formProps = {},
    initialValues = {}
  } = configForm;

  const formValues = useMemo(() => ({ ...initialValues, ...configProps }), [configProps, initialValues]);

  useEffect(() => {
    // TODO 这里要重新设置formValues
    form.resetFields();
    form.setFieldsValue(cloneDeep(formValues));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusItemId, form]);

  const onValueChange = debounce(useCallback(() => {
    dispatch(updateConfigProps({
      id: focusItemId,
      value: form.getFieldsValue(true)
    }));
  }, [dispatch, focusItemId, form]), 1000);

  const changeFieldValue = useCallback((field, value) => {
    const formValue = cloneDeep(form.getFieldsValue(true));
    formValue[field] = value;
    form.setFieldsValue(formValue);
    onValueChange();
  }, [form, onValueChange]);

  const getFieldItem = useCallback((type: FieldType, props: any = {}, fieldProps) => {
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
      case 'Options':
        return <OptionCreator key={uuidV4()} {...props} options={(form.getFieldValue(fieldProps.name) || []).concat(configProps[fieldProps.name] || []).slice()} setFieldValue={debounce((value: any) => changeFieldValue(fieldProps.name, value), 100)} />
      default:
        return <></>;
    }
  }, [changeFieldValue, form]);

  const renderField = useCallback((field: Field) => {
    const {
      type,
      props,
      fieldProps = {}
    } = field;

    return (
      <Form.Item key={uuidV4()} {...fieldProps}>
        {getFieldItem(type, props, fieldProps)}
      </Form.Item>
    );
  }, [getFieldItem]);

  return (
    <>
      {
        focusItemId ?
          (
            <Form
              {...formProps}
              layout="vertical"
              onValuesChange={onValueChange}
              form={form}
              initialValues={initialValues}
            >
              <h2>{ComponentType}</h2>
              {
                fields.map((field: any) => renderField(field))
              }
            </Form>
          ) :
          (
            <Form form={form}>
              <div>请选择元素进行编辑</div>
            </Form>
          )
      }
    </>
  );
}


export default ConfigPanelForm;