import { parseHeaders } from '../helpers/headers'
import type { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus,
    } = config

    // todo:1-创建xhr实例
    const request = new XMLHttpRequest()

    // todo:2-method大写，是否执行异步操作，默认true
    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    // todo：4-发送请求体。如果不需要发送请求体，则必须传null
    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      // todo:9-withCredentials
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
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

        // network error / timeout error, 错误时，HTTP状态码为0
        if (request.status === 0) { return }

        // 从XHR对象获取响应头部信息
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText, // HTTP状态
          headers: responseHeaders, // 响应的HTTP状态描述
          config,
          request,
        }
        handleResponse(response)
      }

      // todo:6-处理网络错误
      request.onerror = function handleError() {
        reject(createError('Network Error',
          config,
          null,
          request))
      }

      // todo:7-timeout
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request))
      }

      // todo:11-progress
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // todo:10-token的处理
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers.Authorization = `Basic ${btoa(`${auth.username}:${auth.password}`)}`
      }

      // todo:3-setRequestHeader 只能在 open 和 send 之间调用
      Object.keys(headers).forEach((name) => {
        if (data === null && name.toLocaleLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      // todo:8-cancel
      if (cancelToken) {
        cancelToken.promise.then((reason) => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response,
          ),
        )
      }
    }
  })
}
