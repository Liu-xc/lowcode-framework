import React, { useCallback, useState } from 'react';
import { Button, Input } from 'antd';
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { v4 as uuidV4 } from 'uuid';
import './index.scss';
import { debounce } from 'lodash';

// ? 怎么跟field结合啊
// 让form传一个setFieldValue方法进来吧

export type Option = {
  label: string;
  value: string;
};

// eslint-disable-next-line react/display-name
const OptionCreator: React.FC<any> = (props: any) => {
  const { options, setOptions } = props;
  const [innerOptions, setInnerOptions] = useState(options || []);
  const onChange = useCallback((v: string, i: number, value = true) => {
    if (value) {
      innerOptions[i].value = v;
    } else {
      innerOptions[i].label = v;
    }
    setInnerOptions([...innerOptions]);
  }, [innerOptions]);

  const addOption = useCallback(() => {
    if (innerOptions.every((o: any) => o.label && o.value)) {
      setInnerOptions([...innerOptions, { label: '', value: '' }]);
    }
  }, [innerOptions]);

  const handleBlur = useCallback(() => {
    setOptions([...innerOptions].filter((o: any) => o.label && o.value));
  }, [setOptions, innerOptions]);

  const deleteOption = useCallback((i) => {
    const newOptions = options.slice();
    newOptions.splice(i, 1);
    setOptions(newOptions.filter((o: any) => o.label && o.value));
  }, [options, setOptions]);

  return (
    <div>
      {
        innerOptions.map((c: any, i: any) => {
          const { label, value } = c;
          return (
            <div key={i} className="option">
              <div className='optionInput'>
                label
                <Input defaultValue={label} onChange={(v) => onChange(v.target.value, i, false)} />
              </div>
              <div className='optionInput'>
                value
                <Input defaultValue={value} disabled={!innerOptions[i].label} onBlur={handleBlur} onChange={(v) => onChange(v.target.value, i)} />
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

export default OptionCreator;