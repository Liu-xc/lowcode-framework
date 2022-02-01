import { initAppConfig } from "@/appConfig";
import { APPContextType } from "@/context";

let value: null | APPContextType = null;

/**
 * initApp承担App初始化过程中的一些实例化以及配置
*/
export default function initApp(configs: any = {}): APPContextType {
  const { appConfigProps } = configs;
  if (value) {
    return value;
  }

  return (
    value = {
      appConfig: initAppConfig(appConfigProps),
    }
  );
}
