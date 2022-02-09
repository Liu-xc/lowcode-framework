import React, { useEffect, useMemo, useState } from 'react';
import { Schema, ComponentsMap } from '@/types';
import componentCreator from '@/componentCreator';
import useResolver from '@/resolver';
import State from '@/state';
import PluginManager, { ResolvePlugin } from '@/pluginManager';
import { v4 as uuidV4 } from 'uuid';
import testPlugin from '@/pluginManager/test';

// ? globalState在什么时候创建，实例化renderEngine时吗

type SchemaOrSchemaList = Schema | Schema[];

class RenderEngine {
  private componentsMap: ComponentsMap;
  private globalState: State;
  private pluginManager: PluginManager;
  constructor(componentsMap: ComponentsMap) {
    this.componentsMap = componentsMap;
    this.globalState = new State({
      pageList: [],
    });
    this.pluginManager = new PluginManager();

    // TODO 注册默认插件
    // * 后面这里应该做成类似schema获取的配置加指定的逻辑
    this.pluginManager.register(testPlugin);
  }

  registerPlugin = (plugin: ResolvePlugin) => {
    this.pluginManager.register(plugin);
  }

  render = (schema: SchemaOrSchemaList): React.ReactElement => {
    const Component = this.createComponent(schema);
    return <Component />;
  }

  createComponent = (schema: SchemaOrSchemaList): React.FunctionComponent => {
    const { globalState, createNode } = this;
    const Component = () => {
      const schemas = useMemo(() => Array.isArray(schema) ? schema : [schema], []);
      const state = useMemo(() => new State({
        currentPage: globalState.createPage()
      }), []);

      useEffect(() => {
        globalState.destroyPage(state.getCurrentPage())
      }, []);

      const nodes = useMemo(() => schemas.map(s => createNode(s, state)), [schemas, state]);

      return (
        <>
          {nodes.map(Node => <Node key={uuidV4()} />)}
        </>
      );
    };

    return Component;
  }

  createNode = (schema: Schema, state: State): React.FunctionComponent => {
    const {
      componentsMap,
      globalState,
      createNode
    } = this;
    const Node = () => {
      const context = useMemo(() => ({ globalState, state, createNode }), []);
      const [Component, setComponent] = useState<React.ComponentType<any>>();
      const pureSchema = useMemo(() => {
        const schemaCopy = { ...schema };
        Reflect.deleteProperty(schemaCopy, 'children');
        return schemaCopy;
      }, []);
      const resolvedSchema = useResolver(pureSchema, context);
      const { children } = schema;
      const childrenNodes = (Array.isArray(children) ? children : [children]).map(child => {
        if (typeof child !== 'object') {
          return () => <>{child}</>;
        }
        return createNode(child as Schema, state);
      }).map(ChildNode => <ChildNode key={uuidV4()} />);

      useEffect(() => {
        if (!resolvedSchema) {
          return;
        }
        const hocList = this.pluginManager.getHocList(resolvedSchema);
        setComponent(() => componentCreator(resolvedSchema, componentsMap, hocList, context))
      }, [resolvedSchema]);

      const resolveContext = useMemo(() => ({ ...context, resolvedSchema }), [context, resolvedSchema]);

      if (!Component) {
        return <></>;
      }
      if (!childrenNodes.length) {
        return <Component resolveContext={resolveContext} />;
      }
      return <Component children={childrenNodes} resolveContext={resolveContext} />;
    };
    return Node;
  }
}

export default RenderEngine;