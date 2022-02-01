import appConfig from "@/appConfig";
import { RouteConfigMap } from "@/router/createRoutes";
import RenderEngine from 'render-engine';

// TODO init
/**
 * appConfig
 * renderEngine
*/

const initCache = {
  appConfig,
  renderEngine: null as RenderEngine | null,
  routeConfigMap: {} as RouteConfigMap,
};

export default function initApp(configs?: any) {
  // TODO 目前先直接返回
  let {
    renderEngine
  } = initCache;
  if (!renderEngine) {
    renderEngine = new RenderEngine();
    initCache.renderEngine = renderEngine;
  }
  return {
    appConfig,
    renderEngine,
    routeConfigMap: {
      index: {
        path: '/',
        schemaName: 'index',
      },
      home: {
        path: '/home',
        schemaName: 'home'
      }
    },
  };
}
