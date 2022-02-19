// TODO
/**
 * 接受参数，实例化axios
 * ? axios的参数签名
*/

import axios, { Axios } from 'axios';

const cache = {
  instance: null as Axios | null
}

const defaultConfig = {};

export function initNetwork(configs: any) {
  if (cache.instance) {
    return cache.instance;
  }
  cache.instance = axios.create(Object.assign({}, defaultConfig, configs));
  return cache.instance;
}

export function getAxiosInstance() {
  if (!cache.instance) {
    initNetwork(defaultConfig);
  }
  return cache.instance;
}