import React, { FC, useContext } from 'react';
import createRoutes, { RouteConfigMap } from './createRoutes';
import { BrowserRouter, Route } from 'react-router-dom';
import { CacheSwitch } from 'react-router-cache-route';
import { APPConfigContext } from '@/context';

const Router: FC = () => {
  const appConfig = useContext(APPConfigContext);
  return (
    <BrowserRouter>
      <CacheSwitch>
        {createRoutes(appConfig)}
      </CacheSwitch>
    </BrowserRouter>
  );
}

export default Router;

