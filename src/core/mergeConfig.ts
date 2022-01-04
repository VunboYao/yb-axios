import { AxiosRequestConfig } from '../types'
import { isObject, deepMerge } from '../helpers/util'

const stracts = Object.create(null)

function defaultStract(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Stract(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

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

const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  stracts[key] = fromVal2Stract
})
const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  stracts[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeFiled(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      mergeFiled(key)
    }
  }

  function mergeFiled(key: string): void {
    const strat = stracts[key] || defaultStract
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
