import { transformResponse } from './helpers/data'
import { parseHeaders } from './helpers/headers'
import type { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    // todo:1-创建xhr实例
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // todo：5-readyState变化监听。保证跨浏览器兼容性，应该在open之前调用
    request.onreadystatechange = function handleLoad() {
      /*
       * 当前处在请求/响应过程的哪个阶段
       * 0：未初始化(Uninitialized).尚未调用open方法
       * 1：已打开(Open).以调用open方法，尚未调用send()方法
       * 2：已发送(Send).已调用send方法，尚未收到响应
       * 3：接收中(Receiving).已收到部分响应
       * 4: 完成(Complete).已经收到所有响应，可以使用
       * */
      if (request.readyState !== 4) { return }

      // network error / error, 错误时，HTTP状态码为0
      if (request.status === 0) { return }

      // 从XHR对象获取响应头部信息
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: transformResponse(responseData),
        status: request.status,
        statusText: request.statusText, // HTTP状态
        headers: responseHeaders, // 响应的HTTP状态描述
        config,
        request,
      }
      resolve(response)
    }

    // todo:2-method大写，是否执行异步操作，默认true
    request.open(method.toUpperCase(), url, true)

    // todo:3-setRequestHeader 只能在 open 和 send 之间调用
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // todo：4-发送请求体。如果不需要发送请求体，则必须传null
    request.send(data)
  })
}