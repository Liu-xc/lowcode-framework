import React, { useState } from 'react';
import { Schema, ComponentsMap } from '@/types';
import createComponent from '@/componentCreator';
import useResolver from '@/resolver/useResolver';

class RenderEngine {
  private componentsMap: ComponentsMap;
  constructor(componentsMap: ComponentsMap) {
    this.componentsMap = componentsMap;
  }

  render = (schema: Schema) => {
    // * 假设已经解析完
    const resolvedSchema = useResolver(schema);
    console.log(resolvedSchema);
    // ? 是不是应该在这里初始化一个state实例
    return createComponent(resolvedSchema, this.componentsMap);
  }
}

export default RenderEngine;