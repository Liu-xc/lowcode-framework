import RenderEngine from 'render-engine';
import getPageSchema from './getPageSchema';

export default {
  renderEngine: new RenderEngine({}),
  // getPageSchema: (schemaName: string) => ({
  //   ComponentType: 'Group',
  //   Children: 'test' + schemaName
  // }),
  getPageSchema,
  routeConfigMap: {
    index: {
      path: '/',
      schemaName: 'index',
    },
    home: {
      path: '/home',
      schemaName: 'home',
    }
  },
  componentsMap: {}
}