import React, { useCallback, useEffect, useState } from 'react';
import { List, Card, Button, Skeleton, Modal } from 'antd';
import { createApiMethod } from 'app-framework';
import { useNavigate } from 'react-router-dom';

import './index.scss';

const request = createApiMethod({
  url: '/schemas'
});

const Manage = () => {
  const nav = useNavigate();
  const [data, setData] = useState<{title: string}[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    request({}).then((r: any) => {
      console.log(r);
      const { schema } = r;
      setData(schema.map((s: any) => ({title: s.name})));
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const viewSchema = useCallback((schemaName: string) => {
    nav(`/platform/view/${schemaName}`);
  }, [nav]);

  const editSchema = useCallback((schemaName: string) => {
    nav(`/platform/edit/${schemaName}`);
  }, [nav]);


  const deleteSchema = useCallback(async (schemaName) => {
    Modal.confirm({
      title: '删除schema',
      content: `确认删除schema：${schemaName}？`,
      async onOk() {
        await request({ url: `/schemas/delete/${schemaName}` }).then((r: any) => {
          console.log(r);
        }).catch((e: any) => {
          console.log(e);
        });
      },
      onCancel() {
        // 
      },
      cancelText: '取消',
      okText: '确认'
    });
  }, []);

  if (loading) {
    return <Skeleton />
  }

  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item, i) => (
          <List.Item>
            <Card title={item.title}>
              <div className='btnGroup'>
                <Button type='primary' onClick={() => viewSchema(item.title)}>查看</Button>
                <Button type='primary' onClick={() => editSchema(item.title)}>编辑</Button>
                <Button danger onClick={() => deleteSchema(item.title)}>删除</Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}

export default Manage;