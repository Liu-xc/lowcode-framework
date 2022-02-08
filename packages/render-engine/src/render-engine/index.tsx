import React, { Component, useEffect, useMemo, useState } from 'react';
import { Schema, ComponentsMap } from '@/types';
import componentCreator from '@/componentCreator';
import useResolver from '@/resolver';
import State from '@/state';
import PluginManager from '@/pluginManager';
import { v4 as uuidV4 } from 'uuid';

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
    // TODO 返回一个组件
    const {
      componentsMap,
      globalState,
      createNode
    } = this;
    const Node = () => {
      // debugger;
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
      // TODO
      useEffect(() => {
        // console.log('resolvedSchema', resolvedSchema, childrenNodes);
        if (!resolvedSchema) {
          return;
        }
        setComponent(() => componentCreator(resolvedSchema, componentsMap))
      }, [resolvedSchema]);

      if (!Component) {
        console.log('空');
        return <></>;
      }
      if (!childrenNodes.length) {
        console.log('无子元素');
        return <Component />;
      }
      console.log('没展示出来');
      return <Component children={childrenNodes} />;
    };
    return Node;
  }
}

export default RenderEngine;