import { Layout } from 'react-grid-layout';
import { ConfigFormProps, Field } from '../components/ConfigPanelForm';

export interface ComponentMeta {
  ComponentType: string;
  configForm: ConfigFormProps;
  droppingItem?: {
    w: number;
    h: number;
  };
  id?: string;
}

export type {
  ConfigFormProps,
  Field
}
