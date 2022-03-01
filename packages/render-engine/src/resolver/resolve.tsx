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
  const resolvedSchema = schema;
  const {
    state,
    createNode
  } = schemaContext;

  const originKeys = Object.keys(schema);

  const { $_IF_$, _IF_ } = schema;
  const show = $_IF_$ ? execute(schemaContext, $_IF_$, () => triggerUpdate()) : true;
  schema._IF_ = show || _IF_;
  if (!schema._IF_) {
    // ? 为什么要将Schema设置为空
    setResolvedSchema(cloneDeep(emptySchema));
    return;
  }

  // ? 为什么要删除
  Reflect.deleteProperty(schema, '$_IF_$');

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
          resolve(v, schemaContext, (updated: Schema) => val[i] = updated, triggerUpdate);
        } else {
          // * 是普通值
          val[i] = v;
        }
      })
    } else if (typeof val === 'object') {
      resolve(
        val,
        schemaContext,
        (resolved: Schema) => {
          resolvedSchema[resolvedKey] = resolved;
        },
        triggerUpdate
      );
    } else {
      resolvedSchema[resolvedKey] = schema[k];
    }
  });

  setResolvedSchema(resolvedSchema);
}
