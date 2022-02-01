import { RouteConfigMap } from "@/router/createRoutes";
import { Schema } from "@/types";
import RenderEngine from 'render-engine';

export interface AppConfigMap {
  [k: string]: any;
  getPageSchema: (schemaName: string, useLocal?: boolean) => Schema;
  renderEngine: RenderEngine;
  routeConfigMap: RouteConfigMap;
}

const MockDefault = {
  renderEngine: new RenderEngine(),
  getPageSchema: (schemaName: string) => ({
    ComponentType: 'Group',
    Children: [schemaName]
  }),
  routeConfigMap: {
    index: {
      path: '/',
      schemaName: 'index',
    },
    home: {
      path: '/home',
      schemaName: 'home',
    }
  }
}
export class AppConfig {
  config: AppConfigMap;
  constructor(configs?: AppConfigMap) {
    this.config = Object.assign(MockDefault, configs || {});
  }

  setConfig = (key: string, value: any) => {
    try {
      this.config[key] = value;
      return true;
    } catch (e) {
      throw new Error(`设置${key}失败`);
    }
  }

  batchSetConfig = (value: Partial<AppConfigMap>) => {
    try {
      this.config = Object.assign({}, this.config, value);
      return true;
    } catch (e) {
      throw new Error('batchSetConfig失败');
    }
  }

  getConfig = (key: string) => {
    const keys = Object.keys(this.config);
    if (!keys.some(k => k === key)) {
      throw new Error(`不存在key：${key}`);
    }
    return this.config[key];
  }

  batchGetConfig = (keys: string[]) => {
    return keys.map(key => this.getConfig(key));
  }
}

const cacheValue = {
  appConfig: null as null | AppConfig
}

export default function getAppConfig(): AppConfig {
  !cacheValue.appConfig && initAppConfig();
  return cacheValue.appConfig as AppConfig;
}

export function initAppConfig(configs?: AppConfigMap) {
  if (!cacheValue.appConfig) {
    cacheValue.appConfig = new AppConfig(configs);
  }
  return cacheValue.appConfig;
}