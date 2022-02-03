import { Schema, ComponentsMap } from '@/types';
import createComponent from '@/componentCreator';

class RenderEngine {
  private componentsMap: ComponentsMap;
  constructor(componentsMap: ComponentsMap) {
    this.componentsMap = componentsMap;
  }

  render = (schema: Schema) => {
    // * 假设已经解析完
    return createComponent(schema, this.componentsMap);
  }
}

export default RenderEngine;