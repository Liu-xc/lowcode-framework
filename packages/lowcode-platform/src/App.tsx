import React, { useCallback, useState } from 'react';
import Test from './components/TestComp';
import ComponentMenu from './components/ComponentMenu';
import ConfigPanelForm from './components/ConfigPanelForm';
import {
  Layout,
  Button
} from 'antd';
import store, { exportSchema, exportLayoutStore, RootState } from './store';

import {
  ComponentsMap,
  RenderComponent,
} from './components';
import { App as AFApp, RenderEngine } from 'app-framework';
// import getPageSchema from './utils/getPageSchema';
import IndexSchema, { layoutStore } from './schemas/index';
import { useDispatch, useSelector } from 'react-redux';
import { replaceLayoutStore } from './store';

import './App.css';


const renderEngine = new RenderEngine(ComponentsMap);

const {
  Header,
  Sider,
  Content
} = Layout;

function App() {
  const readonly = useSelector((state: RootState) => state.layout.readonly);
  const handleClick = useCallback(() => {
    exportLayoutStore();
    exportSchema(true);
  }, []);

  const dispatch = useDispatch();

  return (
    <Layout>
      {!readonly && (<Sider theme='light'>
        <ComponentMenu
          mode="inline"
          title='组件菜单'
        />
      </Sider>)}
      <Content style={{ overflowY: 'auto', overflowX: 'hidden', display: 'flex', minHeight: '100%' }}>
        {/* <Test containerStyle={{ minHeight: '100%', backgroundColor: 'pink', width: '100%',  overflowY: 'auto', overflowX: 'hidden' }}/> */}
        {/* <AFApp
          componentsMap={componentsMap}
          getPageSchema={exportSchema}
          routeConfigMap={routeConfigMap}
          networkConfig={{
            baseURL: 'http://127.0.0.1:8080',
          }}
        /> */}
        {/* {[1].map(() => {
          const Nodes = renderEngine.render(IndexSchema);
          dispatch(replaceLayoutStore({
            layoutStore
          }));
          return Nodes;
        })} */}
        <RenderComponent state={{layoutStore}} schema={IndexSchema} />
      </Content>
      {
        !readonly && (
          <Sider theme='light' width={400}>
            <ConfigPanelForm />
          </Sider>
        )
      }
    </Layout>
  );
}

export default App;
