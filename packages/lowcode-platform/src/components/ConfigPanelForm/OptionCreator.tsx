import React, { useCallback, useEffect, useState } from 'react';
import { Input } from 'antd';
import { v4 as uuidV4 } from 'uuid';
import { debounce } from 'lodash';

// ? 怎么跟field结合啊
// 让form传一个setFieldValue方法进来吧

export type Option = {
  label: string;
  value: string;
};

const OptionCreator: React.FC<any> = props => {
  const { setFieldValue } = props;
  const [options, setOptions] = useState<Option[]>(props.options || []);
  const onChange = useCallback((v: string, i: number, value = true) => {
    if (value) {
      options[i].value = v;
    } else {
      options[i].label = v;
    }
    setOptions(options.slice());
  }, [options]);

  const addOption = useCallback(() => {
    setOptions(prev => [...prev, { label: '', value: '' }]);
  }, []);

  const subOptions = useCallback(() => {
    setFieldValue(options.filter(o => o.label && o.value));
  }, [options, setFieldValue]);

  const deleteOption = useCallback((i) => {
    options.splice(i, 1);
    setOptions(options.slice());
  }, [options]);

  return (
    <div>
      {
        options.map((c, i) => {
          const {label, value} = c;
          return (
            <div key={i}>
              label
              <Input value={label} onChange={(v) => onChange(v.target.value, i, false)} />
              value
              <Input value={value} onChange={(v) => onChange(v.target.value, i)} />
              <button onClick={() => deleteOption(i)}>删除</button>
            </div>
          );
        })
      }
      <button onClick={addOption}>add option</button>
      <button onClick={subOptions}>确定</button>
    </div>
  );
}

export default OptionCreator;