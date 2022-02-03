import React, { FC } from 'react';
import Router from '@/router';
import { APPContext } from '@/context';
import initApp from './init';
import { ComponentsMap } from 'render-engine';

export interface AppProps {
  componentsMap: ComponentsMap;
}

const App: FC<AppProps> = props => {
  const { componentsMap } = props;
  return (
    <APPContext.Provider
      value={initApp({ componentsMap })}
    >
      <>
        <h1>Header</h1>
        <Router />
      </>
    </APPContext.Provider>
  );
};

export default App;
