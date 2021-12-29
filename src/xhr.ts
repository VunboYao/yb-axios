import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  // 对象结构。a:b是更改名称， a=b是赋值
  const { data = null, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  //  method大写，是否异步执行操作，默认为true
  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
