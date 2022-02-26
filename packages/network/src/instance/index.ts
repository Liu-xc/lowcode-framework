// import axios from './init';
import { AxiosRequestConfig } from 'axios';
import { getAxiosInstance } from './init';
import { RequestResponse } from '@/types';

// * 先Mock一个promise的

// const MockData = {
//   name: 'alice',
//   age: 12
// };

/**
 * 封装的axios需要做些什么
 * 1.接收参数，根据axios需要的参数数据结构进行处理
 * 2.发出请求，根据请求的状态码进行处理（axios是否会根据状态码默认处理一些东西）
 * 3.约定一个数据结构，对请求结果进行解包
*/

const OkStatus = [200, 304];

export async function request(configs: AxiosRequestConfig) {
  const instance = getAxiosInstance();
  return instance(configs)
    .then(
      (res: RequestResponse) => {
        const { data, status, config } = res;
        if (!OkStatus.some(s => s === status)) {
          return new Error(`请求出错：${config.url}`);
        }
        return data;
      },
      (e: Error) => {
        console.error(e);
        return new Error('请求出错');
      }
    );
}

export * from './init';