export interface Schema {
  [k: string]: any;
  ComponentType: string;
  Props?: any;
  Children?: Schema[] | Schema;
}

export interface ComponentsMap {
  [k: string]: React.ComponentType<any>;
}
