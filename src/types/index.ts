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
  url: string
  method?: Method
  data?: any // post、patch 等类型请求的数据
  params?: any // get，head等类型请求的数据
  headers?: any // 请求头信息：Content-Type：application/json;charset=utf-8 声明等
  responseType?: XMLHttpRequestResponseType // 接收的返回数据类型 "" | "arraybuffer" | "blob" | "document" | "json" | "text"
}

export interface AxiosResponse {
  data: any // 返回数据
  status: number // Http状态码
  statusText: string // 状态消息
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置对象
  request: any // XMLHttpRequest 对象实例
}

// todo: Axios的返回Promise类型，resolve函数的参数为AxiosResponse类型
export interface AxiosPromise extends Promise<AxiosResponse> {}
