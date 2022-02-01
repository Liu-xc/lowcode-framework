import { Schema } from "@/types";

export interface AppConfigMap {
  [k: string]: any;
  getPageSchema: (schemaName: string, useLocal?: boolean) => Schema;
}

export class AppConfig {
  config: AppConfigMap;
  constructor(defaultConfig?: AppConfigMap) {
    this.config = Object.assign({
      getPageSchema: (schemaName: string) => ({
        ComponentType: 'Group',
        Children: [schemaName]
      })
    }, defaultConfig || {});
  }

  setConfig(key: string, value: any) {
    try {
      this.config[key] = value;
      return true;
    } catch (e) {
      throw new Error(`设置${key}失败`);
    }
  }

  batchSetConfig(value: Partial<AppConfigMap>) {
    try {
      this.config = Object.assign({}, this.config, value);
      return true;
    } catch (e) {
      throw new Error('batchSetConfig失败');
    }
  }

  getConfig(key: string) {
    const keys = Object.keys(this.config);
    if (!keys.some(k => k === key)) {
      throw new Error(`不存在key：${key}`);
    }
    return this.config[key];
  }
}

const appConfig = new AppConfig();

export default appConfig;