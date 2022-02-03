import React from 'react';
import Utils from 'utils';
import * as componentsMap from 'components';
import logo from './logo.svg';
import { App as AFApp } from 'app-framework';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <AFApp componentsMap={componentsMap} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {Utils('Good')} <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
