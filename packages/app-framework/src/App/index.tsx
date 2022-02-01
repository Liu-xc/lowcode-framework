import React, { FC } from 'react';
import Router from '@/router';
import { APPConfigContext } from '@/context';
import initApp from './init';

const App: FC = () => {
  return (
    <APPConfigContext.Provider
      value={initApp()}
    >
      <>
        <h1>Header</h1>
        <Router />
      </>
    </APPConfigContext.Provider>
  );
};

export default App;
