// TODO 为表达式注入执行上下文，创建一个可执行函数用于执行
import { ResolveContext } from '@/resolver';
import get from 'lodash/get';

const utils = {
  get
}

export default function boxCode(context: ResolveContext, expression: string) {
  const func = new Function('sandBox', `const {${Object.keys(context).join()}} = sandBox; return ${expression};`);
  return (sandBox: any) => func({ ...utils, ...sandBox });
}