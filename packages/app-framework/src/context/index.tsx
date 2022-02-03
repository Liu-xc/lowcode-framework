import { createContext } from 'react';
import getAppConfig, { AppConfig } from '@/appConfig';
import RenderEngine from 'render-engine';

/**
 * APPConfig的context
*/
export interface APPContextType {
  appConfig: AppConfig;
}

export const APPContext = createContext<APPContextType>({
  appConfig: getAppConfig(),
});
