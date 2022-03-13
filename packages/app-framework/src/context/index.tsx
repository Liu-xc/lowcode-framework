import { createContext } from 'react';
import getAppConfig, { AppConfig } from '@/appConfig';
import { RenderEngine } from '..';

/**
 * APPConfig的context
*/
export interface APPContextType {
  appConfig: AppConfig;
  renderEngine: RenderEngine;
}

export const APPContext = createContext<APPContextType>({
  appConfig: getAppConfig(),
  renderEngine: new RenderEngine({})
});
