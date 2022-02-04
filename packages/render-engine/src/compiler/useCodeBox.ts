// TODO 为表达式注入执行上下文，创建一个可执行函数用于执行
import get from 'lodash/get';

const utils = {
  get
}

export default function useCodeBox(context: any = {}, expression: string) {
  const sandBox = { ...context, ...utils };
  const func = new Function('sandBox', `const {${Object.keys(sandBox).join()}} = sandBox; return ${expression};`);
  return () => func(sandBox);
}