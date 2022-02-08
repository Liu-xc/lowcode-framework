// TODO 提供一个useResolver，包含resolve并且每当原始Schema发生变化都强制重新解析
import { useEffect, useState } from 'react';
import RenderEngine from "@/render-engine";
import State, { StateValue } from "@/state";
import { Schema } from "@/types";
import resolve from './resolve';

export interface ResolveContext {
  state: State;
  globalState: State;
  createNode: typeof RenderEngine.prototype.createNode;
  sv?: StateValue;
  gsv?: StateValue;
}

export default function useResolver(schema: Schema, resolveContext: ResolveContext) {
  const [, setUpdateTimes] = useState(0);
  const triggerUpdate = () => setUpdateTimes((t) => t + 1);
  const [resolvedSchema, setResolvedSchema] = useState<Schema>();

  useEffect(() => {
    resolve(schema, resolveContext, (val: any) => { console.log('schema:', val); setResolvedSchema(val);}, triggerUpdate);
  }, [schema, resolveContext]);

  return resolvedSchema;
}