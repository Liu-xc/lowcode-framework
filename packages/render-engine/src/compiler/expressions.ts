/**
 * 关键词
 * - ComponentType
 * - Children
 * - Props
 * - Query
 * - Adaptor
 * - StateKey
 * - Permission
 * - _If_
 *
 * 特殊Key
 * - #component#
 * - $computedValue$: value | callback
 * - $$asyncComputedValue$$
 * - $_If_$
*/

export enum SchemaKeywords {
  ComponentType = 'ComponentType',
  Children = 'Children',
  Props = 'Props',
  Query = 'Query',
  Adaptor = 'Adaptor',
  StateKey = 'StateKey',
  Permission = 'Permission',
  _If_ = '_If_',
}

export function isComponentKey(key: string) {
  const reg = new RegExp('^#\\w+?#$');
  return reg.test(key);
}

export function isComputedKey(key: string) {
  const reg = new RegExp('^\\$\\w+?\\$$');
  return reg.test(key);
}

export function resolveComputedKey(key: string) {
  if (isComputedKey(key)) {
    return key.slice(1, -1);
  }
  throw new Error(`${key}不是计算属性key`);
}

// let compKey = '#component#';
// console.log('isComponentKey', isComponentKey(compKey));

// let computedKey = '$computed$';
// console.log('isComputedKey', isComputedKey(computedKey), resolveComputedKey(computedKey));