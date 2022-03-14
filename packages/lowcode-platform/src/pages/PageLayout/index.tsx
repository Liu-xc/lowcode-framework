import React, { useCallback } from 'react';
import {
  Layout,
  Button
} from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { exportLayoutStore, exportSchema } from '../../store';
import './index.scss';

const {
  Header,
} = Layout;

const PageLayout = () => {
  const nav = useNavigate();
  const { mode, schemaName } = useParams();

  const upload = useCallback(() => {
    exportLayoutStore();
    exportSchema(true);
  }, []);

  const manage = useCallback(() => {
    nav('/manage');
  }, [nav]);

  const update = useCallback(() => {
    console.log('update');
  }, []);

  return (
    <div className="App">
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header style={{ backgroundColor: 'yellow', zIndex: 999 }}>
          <h1 className='headerTitle'>
            LowCode Platform
            <div className='headerBtns'>
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