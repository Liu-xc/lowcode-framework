import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const cache = {
  instance: null as AxiosInstance | null
}

const defaultConfig = {};

export function initNetwork(configs: AxiosRequestConfig) {
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
  return cache.instance as AxiosInstance;
}

export type {
  AxiosRequestConfig as RequestConfig,
  AxiosInstance as RequestInstance,
};