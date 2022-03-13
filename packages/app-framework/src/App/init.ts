import RenderEngine from "render-engine";
import { initAppConfig } from "@/appConfig";
import { APPContextType } from "@/context";
import { initNetwork } from 'network';
import { AppConfigMap } from '@/appConfig';
import queryPlugin from '@/data/queryPlugin';

let value: null | APPContextType = null;

/**
 * initApp承担App初始化过程中的一些实例化以及配置
*/
export default function initApp(configs: Omit<AppConfigMap, 'renderEngine'>): APPContextType {
  if (value && value.appConfig) {
    return value;
  }

  const { componentsMap, networkConfig } = configs;

  initNetwork(networkConfig);
  const renderEngine = new RenderEngine(componentsMap);
  renderEngine.registerPlugin(queryPlugin);

  const configMap = { ...configs } as AppConfigMap;
  configMap.renderEngine = renderEngine;
  const appConfig = initAppConfig(configMap);

  Object.keys(configMap).forEach(k => appConfig.setConfig(k, configMap[k]));

  return (
    value = {
      appConfig,
      renderEngine,
    }
  );
}
