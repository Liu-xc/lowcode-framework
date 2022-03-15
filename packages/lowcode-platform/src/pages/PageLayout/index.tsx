import React, { useCallback, useState, ReactDOM } from 'react';
import {
  Layout,
  Button,
  Modal,
  Input,
  Alert
} from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { exportLayoutStore, exportSchema } from '../../store';
import { createApiMethod } from 'app-framework';
import './index.scss';

const NOT_EXIST_CODE = 2128;
const ALREADY_EXIST_CODE = 2131;

const {
  Header,
} = Layout;

const request = createApiMethod({
  method: 'POST'
});

const PageLayout = () => {
  const nav = useNavigate();
  const { mode, schemaName } = useParams();
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState('');

  const onNameChange = useCallback((e) => {
    setName(e.target.value);
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
            content: schema
          },
          state: {
            name,
            content: state
          }
        }
      }).then((r: any) => {
        const { code } = r;
        if (code !== ALREADY_EXIST_CODE) {
          nav(`/platform/edit/${name}`);
        } else {
          setAlert(`${name} 已存在`);
          setName('');
        }
      });
    }
    
  }, [name, showModal, nav]);

  const manage = useCallback(() => {
    nav('/manage');
  }, [nav]);

  const update = useCallback(async () => {
    console.log('update');
    const state = exportLayoutStore();
    const schema = exportSchema();
    await request({
      url: `/schemas/update`,
      data: {
        schema: {
          name: schemaName,
          content: schema
        },
        state: {
          name: schemaName,
          content: state
        }
      }
    });
  }, [schemaName]);

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
                title="命名"
                visible={visible}
                onOk={() => {
                  upload();
                  setVisible(false);
                }}
                onCancel={() => {
                  setName('');
                  setVisible(false);
                }}
              >
                <Input value={name} onChange={onNameChange} />
              </Modal>
              {mode === 'create' && <Button className='btn' type='primary' onClick={upload}>上传</Button>}
              {mode === 'edit' && <Button className='btn' type='primary' onClick={update}>更新</Button>}
              <Button className='btn' type='primary' onClick={manage}>管理</Button>
            </div>
          </h1>
        </Header>
        <Outlet />
      </Layout>
    </div>
  );
}

export default PageLayout;