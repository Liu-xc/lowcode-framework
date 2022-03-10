import React, { useState, useCallback, useEffect, useImperativeHandle } from 'react';
import { Input, Switch, Form, Button, } from 'antd';
import { debounce } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

// 校验需要是一个多样的表单


/**
 * required：Switch
 * maxLength：numberInput
*/
// len\max\message\min\pattern\required
// 可以在meta中配置,说明能够使用哪几种校验,然后Validation根据列表是否有进行渲染
// 默认有message和required

export type RuleType = 'max' | 'required' | 'len' | 'message' | 'pattern' | 'min';

// eslint-disable-next-line react/display-name
const ValidationFields: React.FC<any> = (props: any) => {
  const { rules, map, setMap } = props;

  const setMapValue = useCallback((key, value) => {
    setMap((prev: any) => ({ ...prev, [key]: value }));
  }, [setMap]);


  const render = (rule: RuleType) => {
    switch (rule) {
      case 'required':
        return (
          <Form.Item label="是否必填" key={rule}>
            <Switch checked={map.required} onChange={(e) => setMapValue('required', e)} />
          </Form.Item>
        );
      
      case 'message':
        return (
          <Form.Item label="错误提示语" key={rule}>
            <Input value={map.message} onChange={e => setMapValue('message', e.target.value)} />
          </Form.Item>
        );
      default:
        break;
    }
  }

  return (
    <div>
      {rules.map(render)}
      {/* <Button type='primary' onClick={updateFormData}>确定</Button> */}
    </div>
  )
}

export default ValidationFields;