import React, { useCallback, useState, ReactDOM, useEffect, useMemo } from 'react';
import {
  Layout,
  Button,
  Modal,
  Input,
  Alert,
  Form,
  Select
} from 'antd';
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import { exportLayoutStore, exportSchema } from '../../store';
import { createApiMethod } from 'app-framework';
import './index.scss';

const NOT_EXIST_CODE = 2128;
const ALREADY_EXIST_CODE = 2131;

const {
  Header,
} = Layout;

const { Item } = Form;

const request = createApiMethod({
  method: 'POST'
});

const PageLayout = () => {
  const nav = useNavigate();
  const { mode, schemaName } = useParams();
  const location = useLocation();
  const [name, setName] = useState('');
  const [schemaType, setSchemaType] = useState('');
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState('');
  const isManage = useMemo(() => location.pathname === '/manage', [location]);

  const onNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const changeSchemaName = useCallback((value: string) => {
    setSchemaType(value);
  }, []);

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const upload = useCallback(async () => {
    if (!name) {
      showModal();
    } else {
      const state = exportLayoutStore();
      const schema = exportSchema();
      await request({
        url: `/schemas/create`,
        data: {
          schema: {
            name,
            content: schema,
            type: schemaType
          },
          state: {
            name,
            content: state
          },
        }
      }).then((r: any) => {
        const { code } = r;
        if (code !== ALREADY_EXIST_CODE) {
          nav(`/platform/edit/${name}`);
        } else {
          setAlert(`${name} 已存在`);
        }
      });
    }
    
  }, [name, showModal, nav, schemaType]);

  const manage = useCallback(() => {
    nav('/manage');
  }, [nav]);

  const create = useCallback(() => {
    nav('/platform/create');
  }, [nav]);

  const goEdit = useCallback(() => {
    nav(`/platform/edit/${schemaName}`);
  }, [nav, schemaName]);

  const goView = useCallback(() => {
    nav(`/platform/view/${schemaName}`);
  }, [nav, schemaName]);

  const update = useCallback(async () => {
    console.log('update');
    const state = exportLayoutStore();
    const schema = exportSchema();
    await request({
      url: `/schemas/update`,
      data: {
        schema: {
          name: schemaName,
          content: schema,
          type: schemaType
        },
        state: {
          name: schemaName,
          content: state
        },
      }
    });
  }, [schemaName, schemaType]);

  return (
    <div className="App">
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header style={{ backgroundColor: 'yellow', zIndex: 999 }}>
          <h1 className='headerTitle'>
            LowCode Platform
            <div className='headerBtns'>
              {alert && (
                <Alert
                  message={alert}
                  closable
                  onClose={() => setAlert('')}
                  type="error"
                />
              )}
              <Modal
                title="schema配置"
                visible={visible}
                onOk={() => {
                  upload();
                  setVisible(false);
                }}
                onCancel={() => {
                  setVisible(false);
                }}
                wrapClassName={name ? '' : 'configModal' }
              >
                <Item label="名称">
                  <Input value={name} onChange={onNameChange} />
                </Item>
                <Item label="类型">
                  <Select
                    value={schemaType}
                    onChange={changeSchemaName}
                    options={[{ label: '表单', value: 'form' }, { label: '博客', value: 'post' }]}
                  />
                </Item>
              </Modal>
              {mode === 'create' && <Button className='btn' type='primary' onClick={upload}>上传</Button>}
              {mode === 'edit' && <Button className='btn' type='primary' onClick={update}>更新</Button>}
              {mode === 'edit' && <Button className='btn' type='primary' onClick={goView}>预览</Button>}
              {mode === 'view' && <Button className='btn' type='primary' onClick={goEdit}>编辑</Button>}
              {!isManage && <Button className='btn' type='primary' onClick={manage}>管理</Button>}
              {isManage && <Button className='btn' type='primary' onClick={create}>新建</Button>}
            </div>
          </h1>
        </Header>
        <Outlet />
      </Layout>
    </div>
  );
}

export default PageLayout;