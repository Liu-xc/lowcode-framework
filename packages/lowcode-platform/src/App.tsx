import React from 'react';
import * as componentsMap from 'components';
import { App as AFApp } from 'app-framework';
import getPageSchema from './utils/getPageSchema';
import routeConfigMap from './router';
import LayoutContainer from './components/LayoutContainer';
import Test from './components/TestComp';
import './App.css';
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


function App() {
  return (
    <div className="App">
      <AFApp
        componentsMap={componentsMap}
        getPageSchema={getPageSchema}
        routeConfigMap={routeConfigMap}
        networkConfig={{
          baseURL: 'http://127.0.0.1:8080',
        }}
      />
      <div draggable>draggable</div>
      {/* <MyFirstGrid /> */}
      <div
        style={{
          width: '800px'
        }}
      >
        <LayoutContainer
        isDraggable={true}
        rowHeight={50}
        style={{
          backgroundColor: 'yellow'
        }}
        cols={12}
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
    </div>
  );
}

export default App;
