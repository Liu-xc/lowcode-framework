import React, { FC } from 'react';
import createRoutes, { RouteConfigMap } from './createRoutes';
import { BrowserRouter, Route } from 'react-router-dom';
import { CacheSwitch } from 'react-router-cache-route';

const Router: FC = () => {
  const routeConfigMap: RouteConfigMap = {
    home: {
      path: '/home',
    }
  };
  return (
    <BrowserRouter>
      <CacheSwitch>
        {createRoutes(routeConfigMap)}
      </CacheSwitch>
    </BrowserRouter>
  );
}

export default Router;

