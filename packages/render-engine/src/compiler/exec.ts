import useCodeBox from "./useCodeBox";
// TODO 接收表达式并且控制其编译执行，返回表达式的值

export function evaluate(context: any, expression: string) {
  const func = useCodeBox(context, expression);
  console.log(func.toString(), context);
  try {
    return func();
  } catch (error) {
    console.error(error);
    throw new Error(`表达式${expression}执行失败；\nsource code: ${func.toString()}`);
  }
}