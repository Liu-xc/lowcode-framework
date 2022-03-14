import React, { useCallback, useState } from 'react';
import Test from './components/TestComp';
import ComponentMenu from './components/ComponentMenu';
import ConfigPanelForm from './components/ConfigPanelForm';
import {
  Layout,
  Button
} from 'antd';

import {
  RenderComponent,
} from './components';
// import getPageSchema from './utils/getPageSchema';
import IndexSchema, { layoutStore } from './schemas/index';
import { useParams } from 'react-router-dom';

import './App.css';


const {
  Sider,
  Content
} = Layout;

function App() {
  const { mode, schemaName } = useParams();

  return (
    <Layout>
      {!(mode === 'view') && (<Sider theme='light'>
        <ComponentMenu
          mode="inline"
          title='组件菜单'
        />
      </Sider>)}
      <Content style={{ overflowY: 'auto', overflowX: 'hidden', display: 'flex', minHeight: '100%' }}>
        {mode === 'create' && <Test containerStyle={{ minHeight: '100%', backgroundColor: 'pink', width: '100%',  overflowY: 'auto', overflowX: 'hidden' }}/>}
        {mode !== 'create' && <RenderComponent state={{layoutStore}} schema={IndexSchema} />}
      </Content>
      {
        !(mode === 'view') && (
          <Sider theme='light' width={400}>
            <ConfigPanelForm />
          </Sider>
        )
      }
    </Layout>
  );
}

export default App;
