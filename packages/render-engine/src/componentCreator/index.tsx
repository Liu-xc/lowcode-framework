// TODO 从ComponentsMap中获取对应的组件，并且通过PluginManager获取HOCList包裹目标组件

import React from 'react';
import { Schema } from "@/types"; 

export default function createComponent(resolvedSchema: Schema) {
  const {
    ComponentType,
    Children = []
  } = resolvedSchema;
  if (ComponentType === 'Group') {
    return (
      <>
        {Children.map((child: Schema | string | number) => {
          const childType = typeof child;
          if (childType === 'number' || childType === 'string') {
            return child;
          } else if (childType === 'object') {
            return createComponent(child as Schema);
          }
        })}
      </>
    );
  } else {
    return <>renderEngine: default component</>;
  }
}