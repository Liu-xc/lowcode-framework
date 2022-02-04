// TODO 状态管理，实现发布订阅模式，（在exec执行表达式时对状态进行订阅，该订阅注册一个回调，能够出发schema解析变化，从而使得页面更新）

/**
 * - 发布订阅
 * - 如何注册依赖以及callback
 * - 如何使页面更新
 * - 哪些东西需要存到State中
*/
export default class State {
  private listenerMap: Record<string, any>;
  constructor() {
    this.listenerMap = {};
  }

  onGet = () => {

  }

  onSet = () => {

  }

  getStateProxy = () => {

  }

}

