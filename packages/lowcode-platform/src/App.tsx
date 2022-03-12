import React from 'react';
import * as componentsMap from 'components';
import { App as AFApp } from 'app-framework';
import getPageSchema from './utils/getPageSchema';
import routeConfigMap from './router';
import Test from './components/TestComp';
import ComponentMenu from './components/ComponentMenu';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import ConfigPanelForm from './components/ConfigPanelForm';
import {
  Layout,
} from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const {
  Header,
  Sider,
  Content
} = Layout;

function App() {
  return (
    <div className="App">
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header style={{ backgroundColor: 'yellow' }}>
          <AFApp
            componentsMap={componentsMap}
            getPageSchema={getPageSchema}
            routeConfigMap={routeConfigMap}
            networkConfig={{
              baseURL: 'http://127.0.0.1:8080',
            }}
          />
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
