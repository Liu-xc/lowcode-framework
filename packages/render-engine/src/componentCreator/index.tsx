// TODO 从ComponentsMap中获取对应的组件，并且通过PluginManager获取HOCList包裹目标组件

import React from 'react';
import { ComponentsMap, Schema } from "@/types";
import { PluginHOC } from '@/pluginManager';
import { ResolveContext } from '@/resolver';

export default function createComponent(resolvedSchema: Schema, componentsMap: ComponentsMap, hocList: PluginHOC[], resolvecontext: ResolveContext) {
  const {
    ComponentType,
  } = resolvedSchema;
  let Component: React.ComponentType<any>;

  resolvecontext = { ...resolvecontext, resolvedSchema };

  if (ComponentType === 'Group' || !ComponentType) {
    Component = React.Fragment;
  } else {
    Component = (props = {}) => {
      const CompType = componentsMap[ComponentType];
      if (!CompType) {
        throw new Error(`组件${ComponentType}不存在`);
      }
      
      return <CompType {...(resolvedSchema.props || {})} {...props} />;
    };
  }

  let WrappedComponent: React.ComponentType<any> = Component;
  hocList.slice().reverse().forEach(hoc => WrappedComponent = hoc(WrappedComponent, resolvecontext));

  return WrappedComponent;
}