export interface Schema {
  [k: string]: any;
  ComponentType?: string;
  props?: any;
  children?: Schema[] | Schema | string | number;
  _IF_?: string | boolean;
}

export interface ComponentsMap {
  [k: string]: React.ComponentType<any>;
}

export type {
  StatePage,
  StateContext,
  StateValue,
  Listener,
  ListenerMap,
  PageListenerMap
} from '@/state';
