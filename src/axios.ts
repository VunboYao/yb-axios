import type { AxiosRequestConfig, AxiosStatic } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)
axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}
axios.Cancel = Cancel
axios.isCancel = isCancel
axios.CancelToken = CancelToken

axios.all = function all(promises) {
  return Promise.all(promises)
}
axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback(...arr)
  }
}

export default axios
