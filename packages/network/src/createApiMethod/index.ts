import { request } from '@/instance';
import { RequestConfig } from '@/types';

// 柯里函数，createAPIMethod创建一个可复用的请求函数，用于复用部分参数
export function createApiMethod(apiConfig: RequestConfig) {
  return (requestConfig: any) => {
    return request(Object.assign({}, apiConfig, requestConfig)).then(r => {
      const { status } = r;
      if (status !== 200) {
        return Promise.reject({
          message: r.statusText,
          code: r.status
        })
      }
      return r.data;
    });
  }
}