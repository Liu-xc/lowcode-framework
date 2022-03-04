import { Layout } from 'react-grid-layout';

export interface ComponentMeta {
  ComponentType: string;
  defaultDroppingItem?: Layout;
  settings: Record<string, any>;
}