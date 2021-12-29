import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) return url

  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    // todo: 空值忽略
    if (val === null || typeof val === 'undefined') {
      return // 进入下一次循环
    }
    let values: any[]
    // todo: 数组、对象的处理
    if (Array.isArray(val)) {
      values = val
      key += '[]' // foo[]=bar&foo[]=baz
    } else {
      values = [val]
    }
    values.forEach(val => {
      // todo: Date类型的处理
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      // todo: 特殊字符处理
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    // todo：忽略hash
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // todo: 有？则拼接&     没有则拼接 ?
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
