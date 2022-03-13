import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import {
  ComponentsMapContext,
  ComponentsMap
} from './components';
import { initApp, APPContext } from 'app-framework';
import './index.css';
import App from './App';

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
        <App />
      </ComponentsMapContext.Provider>
    </Provider>
  </APPContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
