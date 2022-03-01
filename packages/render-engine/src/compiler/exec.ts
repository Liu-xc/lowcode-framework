import { ResolveContext } from "@/resolver";
import { StateContext } from "@/state";
import boxCode from "./boxCode";
// TODO 接收表达式并且控制其编译执行，返回表达式的值

const executingSet = new WeakSet();

export function execute(context: ResolveContext, expression: string, updateResult: (newResult: any) => void) {
  const { state, globalState } = context;
  let result: any;

  const proxyConfig: StateContext = {
    listener: () => {
      if (executingSet.has(func)) {
        throw new Error(`重复执行: ${expression}`);
      } else {
        executingSet.add(func);
        const newResult = func(executeContext);
        if (newResult !== result) {
          result = newResult;
          updateResult(result);
        }
        executingSet.delete(func);
      }
    },
    currentPage: state.getCurrentPage(),
  };

  const executeContext = {
    ...context,
    sv: state.getProxy(proxyConfig),
    gsv: globalState.getProxy(proxyConfig),
  };

  const func = boxCode(executeContext, expression);

  try {
    return func(executeContext);
  } catch (error) {
    console.error(error);
    throw new Error(`表达式${expression}执行失败；\nsource code: ${func.toString()}`);
  }
}