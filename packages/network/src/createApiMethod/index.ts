import { request } from '@/instance';
import { AxiosRequestConfig } from 'axios';

// TODO 处理response的数据结构

export type QueryConfig = AxiosRequestConfig;

export function createApiMethod(apiConfig: AxiosRequestConfig) {
  // TODO
  /**
   * 接收query对象
   * 对GET和POST区别data的使用
   * 应该返回一个方法，可以传入参数来发起请求
  */

  return async (requestConfig: any) => {
    return request(Object.assign({}, apiConfig, requestConfig));
  }
}