// TODO 管理插件，提供HOCList的计算

import { ResolveContext } from "@/resolver";
import { Schema } from "@/types";
import intersection from "lodash/intersection";

export type PluginHOC = (component: React.ComponentType<any>, resolvecontext: ResolveContext) => React.ComponentType<any>;
export interface ResolvePlugin {
  HOC: PluginHOC;
  SchemaKeys?: string[];
}

export default class PluginManager {
  private plugins: Set<ResolvePlugin>;

  constructor() {
    this.plugins = new Set();
  }

  register = (plugin: ResolvePlugin) => {
    if (this.plugins.has(plugin)) {
      return;
    }
    this.plugins.add(plugin);
  }

  unregister = (plugin: ResolvePlugin) => {
    this.plugins.delete(plugin);
  }

  getHocList = (schema: Schema) => {
    const keys = Object.keys(schema);
    const hocList = [];

    for (const plugin of this.plugins) {
      const { HOC, SchemaKeys } = plugin;
      if (!SchemaKeys) {
        hocList.push(HOC);
      } else if (intersection(SchemaKeys, keys).length) {
        hocList.push(HOC);
      }
    }
    
    return hocList;
  }

}