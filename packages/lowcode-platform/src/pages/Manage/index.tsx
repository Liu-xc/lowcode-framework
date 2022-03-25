import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { List, Card, Button, Skeleton, Modal, message, Divider } from 'antd';
import { createApiMethod } from 'app-framework';
import { useNavigate } from 'react-router-dom';

import './index.scss';

const request = createApiMethod({
  url: '/schemas'
});

const Manage = () => {
  const nav = useNavigate();
  const [data, setData] = useState<{title: string, type: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const formList = useMemo(() => data.filter(item => item.type === 'form'), [data]);
  const formDataList = useMemo(() => data.filter(item => item.type === 'form-data'), [data]);
  const nonFormList = useMemo(() => data.filter(item => item.type !== 'form' && item.type !== 'form-data'), [data]);

  const getSchemaList = useCallback(async () => {
    setLoading(true);
    request({}).then((r: any) => {
      const { schema } = r;
      setData(schema.map((s: any) => ({title: s.name, type: s.type})));
    }).catch(() => {
      message.error('获取列表异常', 2);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const deleteSchemaRequest = useCallback(async (schemaName: string) => {
    setLoading(true);
    request({ url: `/schemas/delete/${schemaName}` }).then((r: any) => {
      console.log(r);
    }).catch((e: any) => {
      console.log(e);
      message.error('删除schema异常', 2);
    }).finally(() => {
      setLoading(false);
      getSchemaList();
    })
  }, [getSchemaList]);

  useEffect(() => {
    getSchemaList();
  }, [getSchemaList]);

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
        deleteSchemaRequest(schemaName);
      },
      onCancel() {
        // 
      },
      cancelText: '取消',
      okText: '确认'
    });
  }, [deleteSchemaRequest]);

  const viewData = useCallback((schemaName: string) => {
    nav(`/platform/viewData/${schemaName}`);
  }, [nav]);

  if (loading) {
    return <Skeleton />
  }

  return (
    <div className='schemas'>
      <List
        className='list'
        grid={{ gutter: 16, column: 4 }}
        dataSource={formList}
        renderItem={
          item => (
            <List.Item key={item.title}>
              <Card
                title={(
                  <div className='formItemTitle'>
                    {item.title}
                    <Button type='ghost' onClick={() => viewData(item.title)}>查看数据</Button>
                  </div>
                )}
              >
                <div className='btnGroup'>
                  <Button type='primary' onClick={() => viewSchema(item.title)}>查看</Button>
                  <Button type='primary' onClick={() => editSchema(item.title)}>编辑</Button>
                  <Button danger onClick={() => deleteSchema(item.title)}>删除</Button>
                </div>
              </Card>
            </List.Item>
          )
        }
      />
      <Divider type='horizontal' />
      <List
        className='list'
        grid={{ gutter: 16, column: 4 }}
        dataSource={formDataList}
        renderItem={
          item => (
            <List.Item key={item.title}>
              <Card title={item.title}>
                <div className='btnGroup'>
                  <Button type='primary' onClick={() => viewSchema(item.title)}>查看</Button>
                  <Button type='primary' onClick={() => editSchema(item.title)}>编辑</Button>
                  <Button danger onClick={() => deleteSchema(item.title)}>删除</Button>
                </div>
              </Card>
            </List.Item>
          )
        }
      />
      <Divider type='horizontal' />
      <List
        className='list'
        grid={{ gutter: 16, column: 4 }}
        dataSource={nonFormList}
        renderItem={
          item => (
            <List.Item key={item.title}>
              <Card title={item.title}>
                <div className='btnGroup'>
                  <Button type='primary' onClick={() => viewSchema(item.title)}>查看</Button>
                  <Button type='primary' onClick={() => editSchema(item.title)}>编辑</Button>
                  <Button danger onClick={() => deleteSchema(item.title)}>删除</Button>
                </div>
              </Card>
            </List.Item>
          )
        }
      />
    </div>
  );
}

export default Manage;