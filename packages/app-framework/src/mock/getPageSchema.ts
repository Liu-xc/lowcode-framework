import { Schema } from 'render-engine';

const schemas = require.context('./schemas/', true);

export default function getPageSchema(schemaName: string, useLocal: boolean = true): Schema {
  // if (useLocal) {

  // }
  // * 先直接用本地schema来mock
  try {
    return schemas(schemaName).default as Schema;
  } catch (error) {
    console.log(error);
    throw new Error(`获取Schema ${schemaName} 失败`);
  }
}