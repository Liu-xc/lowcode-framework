export interface Schema {
  [k: string]: any;
  ComponentType: string;
  Props?: any;
  Children?: Schema[] | Schema | string | number;
}

export interface ComponentsMap {
  [k: string]: React.ComponentType<any>;
}
