import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 对象结构。a:b是更改名称， a=b是赋值
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    // 1.todo:创建一个XHR的实例
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    // 5.todo:readyState变化检查。保证跨浏览器兼容性，应该在open之前调用
    request.onreadystatechange = function handleLoad() {
      /*
       * 当前处在请求/响应过程的哪个阶段
       * 0：未初始化(Uninitialized).尚未调用open方法
       * 1：已打开(Open).以调用open方法，尚未调用send()方法
       * 2：已发送(Send).已调用send方法，尚未收到响应
       * 3：接收中(Receiving).已收到部分响应
       * 4: 完成(Complete).已经收到所有响应，可以使用
       * */
      if (request.readyState !== 4) {
        return
      }

      // network error / error
      if (request.status === 0) {
        return
      }

      // 从XHR对象获取响应头部
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status, // HTTP状态
        statusText: request.statusText, // 响应的HTTP状态描述
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 6.error
    request.onerror = function() {
      reject(createError(`Network Error`, config, null, request))
    }

    // 7.timeout
    request.ontimeout = function() {
      reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
    }

    // 2.todo:method大写，是否异步执行操作，默认为true
    request.open(method.toUpperCase(), url!, true)

    // 3.todo:setRequestHeader只能在open和send之间调用
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 4.todo:发送请求体。如果不需要发送请求体，则必须传null
    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
