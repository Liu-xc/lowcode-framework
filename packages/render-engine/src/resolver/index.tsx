import { useEffect, useState } from 'react';
import RenderEngine from "@/render-engine";
import State, { StateValue } from "@/state";
import { Schema } from "@/types";
import resolve from './resolve';

export interface ResolveContext {
  [k: string]: any;
  state: State;
  globalState: State;
  createNode: typeof RenderEngine.prototype.createNode;
  sv?: StateValue;
  gsv?: StateValue;
  schema?: Schema;
}

export default function useResolver(schema: Schema, resolvecontext: ResolveContext) {
  const [, setUpdateTimes] = useState(0);
  const triggerUpdate = () => setUpdateTimes((t) => t + 1);
  const [resolvedSchema, setResolvedSchema] = useState<Schema>();

  useEffect(() => {
    resolve(schema, resolvecontext, setResolvedSchema, triggerUpdate);
  }, [schema, resolvecontext]);

  return resolvedSchema;
}