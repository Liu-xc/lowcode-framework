import React from 'react';
import { Schema } from "@/types"
import { execute, isComponentKey, isComputedKey, resolveKey } from '@/compiler';
import cloneDeep from 'lodash/cloneDeep';
import { ResolveContext } from ".";
import { v4 as uuidV4 } from 'uuid';

const emptySchema: Schema = {
  ComponentType: 'Group'
}

export default function resolve(
  schema: Schema,
  schemaContext: ResolveContext,
  setResolvedSchema: (schema: Schema) => void,
  triggerUpdate: () => void
): void {
  const resolvedSchema: Record<string, any> = {};
  const {
    state,
    createNode
  } = schemaContext;

  const originKeys = Object.keys(schema);

  originKeys.forEach(k => {
    const isExpression = isComputedKey(k);
    const isComponent = isComponentKey(k);
    const resolvedKey = resolveKey(k);
    const val = schema[k];
    // ? 是不是应该在每中情况的解析结束时都调用一次triggerUpdate
    // * 应该不用,setResolvedSchema会触发更新，trigger是用来响应状态变化的
    if (isExpression) {
      resolvedSchema[resolvedKey] = execute(schemaContext, val, (newResult: any) => {
        resolvedSchema[resolvedKey] = newResult;
        setResolvedSchema(resolvedSchema);
        triggerUpdate();
      });
    } else if (isComponent) {
      const Nodes = (Array.isArray(val) ? val : [val]).map(s => createNode(s, state));
      resolvedSchema[resolvedKey] = function Component() {
        return (
          <>
            {Nodes.map(Node => <Node key={uuidV4()}/>)}
          </>
        );
      };
    } else if (Array.isArray(val)) {
      resolvedSchema[resolvedKey] = val.map((v, i) => {
        // * 是schema
        if (!Array.isArray(v) && typeof v === 'object') {
          resolve(v, schemaContext, (updated: Schema) => v = updated, triggerUpdate);
        }
        return v;
      })
    } else if (typeof val === 'object') {
      resolve(
        val,
        schemaContext,
        (resolved: Schema) => {
          resolvedSchema[resolvedKey] = resolved;
          setResolvedSchema(resolvedSchema);
        },
        triggerUpdate
      );
    } else {
      resolvedSchema[resolvedKey] = schema[k];
    }
  });
  // console.log('resolvedSchema', resolvedSchema);
  setResolvedSchema(cloneDeep(resolvedSchema));
}
