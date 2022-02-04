import { Schema } from "@/types"
import { evaluate, isComponentKey, isComputedKey, resolveKey } from '@/compiler';
import cloneDeep from 'lodash/cloneDeep';
// TODO 解析特殊key，编译并执行表达式求值，递归解析签套Schema语法（Children|#component#等）

const emptySchema: Schema = {
  ComponentType: 'Group'
}

// TODO 什么时候创建State

export default function useResolver(schema: Schema): Schema {
  const resolvedSchema = cloneDeep(schema);
  // TODO context需要包含哪些东西，如何构造一个context
  const context = {
    name: 'yanglulu',
    age: 12
  };

  const originKeys = Object.keys(schema);

  const { $_IF_$, _IF_ } = schema;
  const show = $_IF_$ ? evaluate(context, $_IF_$) : true;
  schema._IF_ = show || _IF_;
  if (!schema._IF_) {
    return { ...emptySchema };
  }

  Reflect.deleteProperty(schema, '$_IF_$');

  // TODO 这里去遍历keys
  originKeys.forEach(k => {
    const isExpression = isComputedKey(k);
    const isComponent = isComponentKey(k);
    const resolvedKey = resolveKey(k);
    const val = schema[k];
    if (isExpression) {
      resolvedSchema[resolvedKey] = evaluate(context, val);
    } else if (isComponent) {
      resolvedSchema[resolvedKey] = useResolver(val);
    } else if (Array.isArray(val)) {
      resolvedSchema[resolvedKey] = val.map(v => {
        console.log(v);
        if (!Array.isArray(v) && typeof v === 'object') {
          return useResolver(v);
        } else {
          return v;
        }
      })
    } else if (typeof val === 'object') {
      resolvedSchema[resolvedKey] = useResolver(val);
    } else {
      resolvedSchema[resolvedKey] = schema[k];
    }
  });

  return resolvedSchema;
}
