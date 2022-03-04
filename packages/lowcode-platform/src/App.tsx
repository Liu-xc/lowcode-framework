import React from 'react';
import * as componentsMap from 'components';
import { App as AFApp } from 'app-framework';
import getPageSchema from './utils/getPageSchema';
import routeConfigMap from './router';
import MyFirstGrid from './pages/DragPage';
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
      <MyFirstGrid />
    </div>
  );
}

export default App;
