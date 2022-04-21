import { deepMerge, isObject } from '../helpers/util'
import type { AxiosRequestConfig } from './../types/index'

// 合并策略的 map
const strats = Object.create(null)

// 优先取默认配置
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只取 val2自定义配置
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 以下字段取 config2
const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach((key) => {
  strats[key] = fromVal2Strat
})

function deepMergeStrat(val1: any, val2: any): any {
  if (isObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach((key) => {
  strats[key] = deepMergeStrat
})

/*
  config1: 默认配置
  config2: 自定义配置
*/
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig,
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (const key in config2) {
    mergeField(key)
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2[key])
  }

  return config
}
