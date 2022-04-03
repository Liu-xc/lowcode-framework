import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { v4 as uuidV4 } from 'uuid';
import './index.scss';
import { cloneDeep, debounce } from 'lodash';

// ? 怎么跟field结合啊
// 让form传一个setFieldValue方法进来吧

export type Option = {
  path: string;
  expression: string;
};

// eslint-disable-next-line react/display-name
const SchemaConfig: React.FC<any> = (props: any) => {
  const { configs, setConfigs } = props;
  const [innerOptions, setInnerOptions] = useState(configs || []);
  const onChange = useCallback((v: string, i: number, expression = true) => {
    const o = cloneDeep(innerOptions);
    if (expression) {
      o[i].expression = v;
    } else {
      o[i].path = v;
    }
    setInnerOptions([...o]);
  }, [innerOptions]);

  const addOption = useCallback(() => {
    if (innerOptions.every((o: any) => o.path && o.expression)) {
      setInnerOptions([...innerOptions, { path: '', expression: '' }]);
    }
  }, [innerOptions]);

  const handleBlur = useCallback(() => {
    setConfigs([...innerOptions].filter((o: any) => o.path && o.expression));
  }, [setConfigs, innerOptions]);

  const deleteOption = useCallback((i) => {
    const newOptions = innerOptions.slice();
    newOptions.splice(i, 1);
    setConfigs([...newOptions.filter((o: any) => o.path && o.expression)]);
  }, [innerOptions, setConfigs]);

  useEffect(() => {
    setInnerOptions([...configs]);
  }, [configs]);

  return (
    <div className="schemaConfig">
      {
        innerOptions.map((c: any, i: any) => {
          const { path, expression } = c;
          return (
            <div key={i} className="option">
              <div className='optionInput'>
                path
                <Input defaultValue={path} onChange={(v) => onChange(v.target.value, i, false)} />
              </div>
              <div className='optionInput'>
                expression
                <Input defaultValue={expression} disabled={!innerOptions[i].path} onBlur={handleBlur} onChange={(v) => onChange(v.target.value, i)} />
              </div>
              <Button icon={<DeleteOutlined />} type='primary' danger onClick={() => deleteOption(i)} />
            </div>
          );
        })
      }
      <div className='btnGroup'>
        <Button type='dashed' block icon={<PlusSquareOutlined />} onClick={addOption} />
        {/* <Button type='primary' onClick={subOptions}>确定</Button> */}
      </div>
    </div>
  );
};

export default SchemaConfig;