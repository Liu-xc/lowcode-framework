import React, { useCallback } from 'react';
import {
  Layout,
  Button
} from 'antd';
import { Outlet } from 'react-router-dom';
import { exportLayoutStore, exportSchema } from '../../store';

const {
  Header,
  Sider,
  Content
} = Layout;

const PageLayout = () => {
  const handleClick = useCallback(() => {
    exportLayoutStore();
    exportSchema(true);
  }, []);
  return (
    <div className="App">
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header style={{ backgroundColor: 'yellow', zIndex: 999 }}>
          {/* <div style={{ backgroundColor: 'grey', zIndex: 999999 }}>
            {
              show && (renderEngine.render(schema))
            }
          </div> */}
          <h1>
            LowCode Platform
            <Button type='primary' onClick={handleClick}>导出Schema</Button>
          </h1>
        </Header>
        <Outlet />
      </Layout>
    </div>
  );
}

export default PageLayout;