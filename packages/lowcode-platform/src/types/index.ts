import { Layout } from 'react-grid-layout';
import { ConfigFormProps } from '../components/ConfigPanelForm';

export interface ComponentMeta {
  ComponentType: string;
  configForm: ConfigFormProps;
  defaultDroppingItem?: Layout;
}

export type {
  ConfigFormProps
}
