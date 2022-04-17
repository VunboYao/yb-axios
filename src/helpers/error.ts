import type { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse,
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 编译目标为es5时， 解决继承内置对象的问题。 es5没有 new.target跟踪原型链
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

// todo:暴露一个工厂方法
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string |null,
  request?: any,
  response?: AxiosResponse,
): AxiosError {
  return new AxiosError(message, config, code, request, response)
}
