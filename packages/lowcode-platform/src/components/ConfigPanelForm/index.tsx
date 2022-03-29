/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form, Input, FormProps, FormItemProps, Radio, Select, Slider, Switch, Button, Divider } from 'antd';
import { v4 as uuidV4 } from 'uuid';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { RootState, updateConfigProps } from '../../store';
import { debounce, throttle, cloneDeep } from 'lodash';
import OptionCreator, { Option } from './OptionCreator';
import ValidationFields, { RuleType } from './ValidationFields';
import SchemaConfig from './SchemaConfig';
import './index.scss';

type FieldType = 'Radio' | 'Input' | 'Select' | 'Switch' | 'Slider' | 'Options';

export type Field = {
  type: FieldType;
  props: any;
  fieldProps: FormItemProps;
};

export interface ConfigFormProps {
  fields: Field[],
  formProps?: FormProps;
  rules?: RuleType[];
}

const ConfigPanelForm: React.FC<any> = (props) => {
  const { focusItemId } = props;
  const configs = useSelector((state: RootState) => state.layout.compInfo[focusItemId]) || {};
  const {
    ComponentType,
    configForm = {},
    configProps = {}
  } = configs;
  const {
    fields = [],
    formProps = {},
    initialValues = {},
    rules = []
  } = configForm;

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [options, setOptions] = useState<Option[]>(configProps.options || []);
  const [validateMap, setValidateMap] = useState((configProps.fieldRules || [])[0] || {});
  const [schemaConfigs, setSchemaConfigs] = useState(configProps.schemaConfigs || []);

  const formValues = useMemo(() => ({ ...initialValues, ...configProps }), [configProps, initialValues]);

  useEffect(() => {
    setValidateMap((configProps.fieldRules || [])[0] || {});
  }, [configProps.fieldRules]);

  useEffect(() => {
    // TODO 这里要重新设置formValues
    form.resetFields();
    form.setFieldsValue(cloneDeep(formValues));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusItemId, form]);

  const confirmForm = throttle(useCallback(() => {
    dispatch(updateConfigProps({
      id: focusItemId,
      value: form.getFieldsValue(true)
    }));
    // console.log(form.getFieldsValue(true));
  }, [dispatch, focusItemId, form]), 200);

  const changeFieldValue = useCallback((field, value) => {
    const formValue = cloneDeep(form.getFieldsValue(true));
    formValue[field] = value;
    form.setFieldsValue(formValue);
  }, [form]);

  useEffect(() => {
    changeFieldValue('options', options);
  }, [options, changeFieldValue]);

  useEffect(() => {
    changeFieldValue('fieldRules', [validateMap]);
  }, [changeFieldValue, validateMap]);

  useEffect(() => {
    changeFieldValue('schemaConfigs', schemaConfigs);
  }, [changeFieldValue, schemaConfigs]);

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
        return (
          <OptionCreator
            key={uuidV4()}
            {...props}
            setOptions={setOptions}
            options={options}
          />
        );
      default:
        return <></>;
    }
  }, [options]);

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
        focusItemId && fields.length ?
          (
            <Form
              {...formProps}
              className="configForm"
              layout="vertical"
              form={form}
              initialValues={initialValues}
            >
              <h2 className="title">{ComponentType}</h2>
              {
                fields.map((field: any) => renderField(field))
              }
              {
                rules.length ?
                  <ValidationFields
                    map={validateMap}
                    setMap={setValidateMap}
                    rules={rules}
                  /> :
                  <></>
              }
              <Divider>Schema配置</Divider>
              <SchemaConfig setConfigs={setSchemaConfigs} configs={schemaConfigs}  />
              <div className='footer'>
                <Button className='' block type='primary' onClick={confirmForm} > 确认 </Button>
              </div>
            </Form>
          ) :
          (
            <Form form={form}>
              <h3 style={{ textAlign: 'center', paddingTop: '10px' }}>请选择元素进行编辑</h3>
            </Form>
          )
      }
    </>
  );
}

const withFocusId = (Comp: React.ComponentType<any>): React.FC<any> => props => {
  const focusItemId = useSelector((state: RootState) => state.drag.focusItemId);

  return (
    <ConfigPanelForm key={focusItemId} focusItemId={focusItemId} />
  );
}

export default withFocusId(ConfigPanelForm);