import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  // 对象结构。a:b是更改名称， a=b是赋值
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  //  method大写，是否异步执行操作，默认为true
  request.open(method.toUpperCase(), url, true)

  // todo:setRequestHeader只能在open和send之间调用
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}
