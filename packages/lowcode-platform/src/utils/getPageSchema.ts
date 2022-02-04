import { Schema } from 'app-framework';

const schemas = require.context('../schemas', true, (/(?<!\.d)\.(ts|js)$/));

export default function getPageSchema(schemaName: string, useLocal: boolean = true): Schema {
  // if (useLocal) {

  // }
  // * 先直接用本地schema来mock
  try {
    return schemas(`./${schemaName}.ts`).default as Schema;
    // return require('../schemas/index').default;
  } catch (error) {
    console.log(error);
    throw new Error(`获取Schema ${schemaName} 失败`);
  }
}