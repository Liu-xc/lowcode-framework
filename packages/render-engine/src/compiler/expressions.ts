/**
 * 关键词
 * - ComponentType
 * - children
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
  children = 'children',
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

export function resolveKey(key: string): string {
  if (isComputedKey(key) || isComponentKey(key)) {
    return key.slice(1, -1);
  }
  return key;
}
