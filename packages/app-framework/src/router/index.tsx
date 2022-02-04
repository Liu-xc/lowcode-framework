import React, { FC } from 'react';
import createRoutes from './createRoutes';
import { BrowserRouter } from 'react-router-dom';
import { CacheSwitch } from 'react-router-cache-route';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <CacheSwitch>
        {createRoutes()}
      </CacheSwitch>
    </BrowserRouter>
  );
}

export default Router;

export * from './createRoutes';
