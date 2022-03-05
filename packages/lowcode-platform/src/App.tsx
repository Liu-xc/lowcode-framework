import React from 'react';
import * as componentsMap from 'components';
import { App as AFApp } from 'app-framework';
import getPageSchema from './utils/getPageSchema';
import routeConfigMap from './router';
import LayoutContainer from './components/LayoutContainer';
import Test from './components/TestComp';
import TestDragItem from './components/TestDragItem';
import ComponentMenu from './components/ComponentMenu';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import ConfigPanelForm from './components/ConfigPanelForm';
import {
  Layout
} from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const {
  Header,
  Footer,
  Sider,
  Content
} = Layout;

function App() {
  const curFocusId = useSelector((state: RootState) => state.drag.focusItemId);

  return (
    <div className="App">
      
      <Layout>
        <Header style={{ backgroundColor: 'pink' }}>
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
          <Content>
            <div>
              <div draggable>{curFocusId}</div>
                {/* <MyFirstGrid /> */}
                <div
                  style={{
                    width: '800px'
                  }}
                >
                  <LayoutContainer
                  isDraggable={true}
                  style={{
                    backgroundColor: 'yellow'
                  }}
                />
                </div>
                <Test
                  layoutConfigs={{
                    style: {
                      backgroundColor: 'pink'
                    }
                  }}
                >
                  hello world
                </Test>
                <TestDragItem>Drag Me</TestDragItem>
            </div>
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
