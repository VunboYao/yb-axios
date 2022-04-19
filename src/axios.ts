import Axios from './core/Axios'
import { extend } from './helpers/util'
import type { AxiosInstance } from './types'

function createInstance(): AxiosInstance {
  const context = new Axios()

  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}
export default createInstance()
