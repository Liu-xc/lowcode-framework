import { createContext } from 'react';
import RenderEngine from 'render-engine';
import appConfig, { AppConfig } from '@/appConfig';
import { RouteConfigMap } from '@/router/createRoutes';

/**
 * APPConfig的context
*/
export interface APPConfigContextType {
  renderEngine: RenderEngine;
  appConfig: AppConfig;
  routeConfigMap: RouteConfigMap;
}

export const APPConfigContext = createContext<APPConfigContextType>({
  renderEngine: new RenderEngine(),
  appConfig: appConfig,
  routeConfigMap: {}
});
