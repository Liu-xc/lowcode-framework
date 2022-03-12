import React, { useCallback, useState } from 'react';
import Test from './components/TestComp';
import ComponentMenu from './components/ComponentMenu';
import ConfigPanelForm from './components/ConfigPanelForm';
import {
  Layout,
  Button
} from 'antd';
import { exportSchema } from './store';

import {ComponentsMap} from './components';
import { App as AFApp, RenderEngine } from 'app-framework';
// import getPageSchema from './utils/getPageSchema';
import routeConfigMap from './router';

import './App.css';
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const renderEngine = new RenderEngine(ComponentsMap);

const {
  Header,
  Sider,
  Content
} = Layout;

function App() {
  const [show, setShow] = useState(false);
  const [schema, setSchema] = useState({});
  const handleClick = useCallback(() => {
    setSchema(exportSchema());
    setShow(true);
  }, []);

  return (
    <div className="App">
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header style={{ backgroundColor: 'yellow', zIndex: 999 }}>
          {/* <AFApp
            componentsMap={componentsMap}
            getPageSchema={exportSchema}
            routeConfigMap={routeConfigMap}
            networkConfig={{
              baseURL: 'http://127.0.0.1:8080',
            }}
          /> */}
          <div style={{ backgroundColor: 'grey', zIndex: 999999 }}>
            {
              show && (renderEngine.render(schema))
            }
          </div>
          <h1>
            LowCode Platform
            <Button type='primary' onClick={handleClick}>导出Schema</Button>
          </h1>
        </Header>
        <Layout>
          <Sider theme='light'>
            <ComponentMenu
              mode="inline"
              title='组件菜单'
            />
          </Sider>
          <Content style={{ overflowY: 'auto', overflowX: 'hidden', display: 'flex', minHeight: '100%' }}>
            <Test containerStyle={{ minHeight: '100%', backgroundColor: 'pink', width: '100%',  overflowY: 'auto', overflowX: 'hidden' }}/>
          </Content>
          <Sider theme='light' width={400}>
            <ConfigPanelForm />
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
