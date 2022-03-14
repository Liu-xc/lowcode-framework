import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import {
  ComponentsMapContext,
  ComponentsMap
} from './components';
import { initApp, APPContext } from 'app-framework';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  
} from 'react-router-dom';
import {
  PageLayout,
  Manage,
} from './pages';

import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './index.css';

const appConfig = {
  componentsMap: ComponentsMap,
  networkConfig: {
    baseURL: 'http://127.0.0.1:8080',
  }
};

ReactDOM.render(
  <APPContext.Provider value={initApp(appConfig)}>
    <Provider store={store}>
      <ComponentsMapContext.Provider value={ComponentsMap}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PageLayout />}>
              <Route path='/platform/:mode' element={<App />} />
              <Route path='/platform/:mode/:schemaName' element={<App />} />
              <Route path='/manage' element={<Manage />} />
              <Route index element={<Navigate to={'/platform/create'} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ComponentsMapContext.Provider>
    </Provider>
  </APPContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
