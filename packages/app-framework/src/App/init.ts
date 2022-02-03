import RenderEngine from "@/../../render-engine/dist";
import { initAppConfig } from "@/appConfig";
import { APPContextType } from "@/context";

let value: null | APPContextType = null;

/**
 * initApp承担App初始化过程中的一些实例化以及配置
*/
export default function initApp(configs: any = {}): APPContextType {
  if (value && value.appConfig) {
    return value;
  }

  const { componentsMap } = configs;
  const appConfig = initAppConfig(configs);
  const renderEngine = new RenderEngine(componentsMap);
  appConfig.setConfig('renderEngine', renderEngine);

  return (
    value = {
      appConfig,
    }
  );
}
