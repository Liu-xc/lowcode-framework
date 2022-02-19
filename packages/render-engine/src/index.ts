import RenderEngine from './render-engine';

export default RenderEngine;
export * from '@/compiler';
export type { ResolvePlugin, PluginHOC } from '@/pluginManager';
export type { ResolveContext } from '@/resolver';
export type {
  ComponentsMap,
  Schema
} from '@/types';