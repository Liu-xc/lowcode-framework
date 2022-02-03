// TODO 从ComponentsMap中获取对应的组件，并且通过PluginManager获取HOCList包裹目标组件

import React from 'react';
import { ComponentsMap, Schema } from "@/types";
import { v4 as uuidV4 } from 'uuid';

export default function createComponent(resolvedSchema: Schema, componentsMap: ComponentsMap) {
  const {
    ComponentType,
    Children = []
  } = resolvedSchema;
  let Component: React.ComponentType<any>;

  if (ComponentType === 'Group') {
    Component = React.Fragment;
  } else {
    Component = componentsMap[ComponentType];
  }

  if (!Component) {
    throw new Error(`组件${ComponentType}不存在`);
  }

  const { Props = {} } = resolvedSchema;

  return (
    <Component {...Props} key={uuidV4()}>
      {Children.map((child: Schema | string | number) => {
        const childType = typeof child;
        if (childType === 'number' || childType === 'string') {
          return child;
        } else if (childType === 'object') {
          return createComponent(child as Schema, componentsMap);
        }
      })}
    </Component>
  );
}