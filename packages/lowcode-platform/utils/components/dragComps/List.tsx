import React from 'react';
import { List, Result, Button, Typography } from 'antd';
import { withContainerChild } from '../../hoc';
import { ComponentMeta } from '../../types';
import { createOptions } from './commonConfigs';
import { withField, withFieldMeta } from '../../hoc/withField';


interface ListItem {
  [k: string]: string | number;
}

interface FieldsMap {
  [k: string]: string;
}

const meta: ComponentMeta = {
  ComponentType: 'List',
  configForm: {
    fields: [
      {
        type: 'Input',
        props: {

        },
        fieldProps: {
          label: '列表标题',
          name: 'title'
        }
      }
    ]
  },
  droppingItem: {
    w: 8,
    h: 12
  }
}

export const ListMeta: ComponentMeta = meta;

const TheList: React.FC<any> = props => {
  const {
    loading,
    error,
    value = [],
    fieldsMap = {},
    title,
    retry
  } = props;

  if (error) {
    return (
      <Result
        status="error"
        title="获取数据失败"
        subTitle="请点击重试重新加载"
        extra={[
          <Button key="重试" onClick={retry}>
            重试
          </Button>
        ]}
      />
    );
  }

  return (
    <div className='listContainer'>
      {title && <h2 className='title'>{title}</h2>}
      <List
        className='list'
        loading={loading}
        dataSource={value}
        renderItem={(v) => (
            <List.Item className='my_list'>
              {
                Object.keys(v as any).map(k => (
                  <div key={k} style={{ marginLeft: '20px' }}>
                    {fieldsMap[k]}：{(v as any)[k]}
                  </div>
                ))
              }
              </List.Item>
            )}
      />
    </div>
  );
}

export default withContainerChild(TheList);
