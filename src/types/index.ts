export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any // post、patch 等类型请求的数据
  params?: any // get，head等类型请求的数据
  headers?: any // 请求头信息：Content-Type：application/json;charset=utf-8 声明等
  responseType?: XMLHttpRequestResponseType // 接收的返回数据类型 "" | "arraybuffer" | "blob" | "document" | "json" | "text"
  timeout?: number // 超时时间 ms
}

export interface AxiosResponse<T = any> {
  data: T // 返回数据
  status: number // Http状态码
  statusText: string // 状态消息
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置对象
  request: any // XMLHttpRequest 对象实例
}

// todo: Axios的返回Promise类型，resolve函数的参数为AxiosResponse类型
/*
! T 是 ResponseData<User>
! AxiosResponse<T> 是Axios实例的 resolve 返回 res 对应的类型
*/
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 混合类型接口
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
