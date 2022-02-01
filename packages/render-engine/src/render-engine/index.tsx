import { Schema } from '@/types';
import createComponent from '@/componentCreator';

class RenderEngine {
  constructor() {

  }

  render(schema: Schema) {
    // * 假设已经解析完
    return createComponent(schema);
  }
}

export default RenderEngine;