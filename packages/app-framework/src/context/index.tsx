import { createContext } from 'react';
import getAppConfig, { AppConfig } from '@/appConfig';

/**
 * APPConfig的context
*/
export interface APPContextType {
  appConfig: AppConfig;
}

export const APPContext = createContext<APPContextType>({
  appConfig: getAppConfig(),
});
