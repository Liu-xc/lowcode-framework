// TODO 状态管理，实现发布订阅模式，（在exec执行表达式时对状态进行订阅，该订阅注册一个回调，能够出发schema解析变化，从而使得页面更新）
import isPlainObject from "lodash/isPlainObject";
/**
 * - 发布订阅
 * - 如何注册依赖以及callback
 * - 如何使页面更新
 * - 哪些东西需要存到State中
*/

/**
 * 需要有page这个概念，用来管理全局和单页的状态更新
 * page需要是一个对象，用来作为weakmap的弱引用key
*/

// 空对象
export type StatePage = Record<string, never>;

export type Listener = () => void;

export type PageListenerMap = Record<string, Listener[]>;

export type ListenerMap = WeakMap<StatePage, PageListenerMap>;
export interface StateContext {
  listener?: () => void;
  listenerMap?: ListenerMap;
  pageList?: StatePage[];
  currentPage?: StatePage;
}

export type StateValue = Record<string, any>;

const stateSymbol = Symbol('state');

const staticPage = {};

export default class State {
  private listenerMap: ListenerMap;
  private context: StateContext;
  private value: StateValue;
  private valueProxy: StateValue;
  private [stateSymbol]: boolean;

  constructor(context: StateContext, value?: StateValue) {
    this.context = context;
    this.value = value || {};
    this.listenerMap = context.listenerMap || new WeakMap();
    this[stateSymbol] = true;
    this.valueProxy = new Proxy(this.value, {
      get: this.onGet,
      set: this.onSet
    });
  }

  getValueProxy = (): StateValue => this.valueProxy;

  createPage = (): StatePage => {
    if (!this.context.pageList) {
      throw new Error('only global state can create page');
    }
    const page = staticPage as StatePage;
    this.context.pageList.push(page);
    return page;
  }

  getCurrentPage = (): StatePage => {
    return this.context.currentPage as StatePage;
  }

  destroyPage = (page: StatePage) => {
    // 删了page后就不会再触发依赖更新的回调了
    if (!this.context.pageList) {
      throw new Error('only global state can destroy page');
    }
    const pageIndex = this.context.pageList.indexOf(page);
    if (pageIndex < 0) {
      console.log('要删除的page不存在');
      return false;
    }
    this.context.pageList.splice(pageIndex, 1);
    return true;
  }

  isState = (value: any): boolean => {
    if (typeof value === 'object' && value && value[stateSymbol]) {
      return true;
    }
    return false;
  }

  onGet = (target: StateValue, key: string) => {
    // 收集依赖
    const currentPage = this.getCurrentPage();
    if (!this.listenerMap.has(currentPage)) {
      this.listenerMap.set(currentPage, {});
    }
    const pageListenerMap = this.listenerMap.get(currentPage) as PageListenerMap;
    if (this.context.listener) {
      if (!pageListenerMap[key]) {
        pageListenerMap[key] = [this.context.listener];
      } else {
        pageListenerMap[key].push(this.context.listener);
      }
    }

    // 返回值
    if (this.isState(target[key])) {
      return new State({
        ...this.context,
        // ? 为什么取stateValue[key]上的listenerMap，有设置过吗
        // * 注意这里是value为state的情况，所以是有listenerMap的
        listenerMap: target[key].listenerMap
      }, target[key].value).valueProxy;
    }

    return target[key];
  }

  onSet = (target: StateValue, key: string, newValue: any): boolean => {
    /**
     * 判断是否存在旧值
     * 判断新值和旧值是否相同
     * 更新值
     * 触发回调
    */

    // console.log(target, key, newValue);

    const oldValue = target[key];
    if (oldValue === newValue) {
      return true;
    }
    if (this.isState(oldValue)) {
      oldValue.value === newValue;
      return true;
    }

    target[key] = newValue;

    const pages = this.context.pageList || [this.getCurrentPage()];
    for (const page of pages) {
      const pageListenerMap = this.listenerMap.get(page);
      const listeners = pageListenerMap ? pageListenerMap[key] : [];
      (listeners || []).forEach(listener => listener());
    }

    return true;
  }

  private getDerivativeState = (context: StateContext) => new State(context, this.value);

  getProxy = (context: Omit<StateContext, 'listenerMap'>) => this.getDerivativeState({
    ...this.context,
    ...context,
    listenerMap: this.listenerMap,
  }).valueProxy;

}

