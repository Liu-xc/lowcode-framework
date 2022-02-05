import React, { FC } from 'react';
import Router from '@/router';
import { APPContext } from '@/context';
import initApp from './init';
import { AppConfigMap } from '@/appConfig';

const App: FC<Partial<AppConfigMap>> = props => {
  return (
    <APPContext.Provider
      value={initApp(props)}
    >
      <>
        <Router />
      </>
    </APPContext.Provider>
  );
};

export default App;
