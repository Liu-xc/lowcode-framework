import React, { FC } from 'react';
import Router from '@/router';
import { APPContext } from '@/context';
import initApp from './init';

const App: FC = () => {
  return (
    <APPContext.Provider
      value={initApp()}
    >
      <>
        <h1>Header</h1>
        <Router />
      </>
    </APPContext.Provider>
  );
};

export default App;
