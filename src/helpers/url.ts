import { isDate, isObject } from './util'
export function buildUrl(url: string, params?: any): string {
  // 无参数则退出
  if (!params) {
    return url
  }

  // 参数放入一个数组中，方便后续处理
  const parts: string[] = []
  Object.keys(params).forEach((key) => {
    const val = params[key]
    // todo:val值为 null 或 undefined
    if (val === null || typeof val === 'undefined') {
      return
    }

    let values = []
    // todo: val值为数组时，key值处理
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach((val) => {
      // todo: val为date类型时
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        // todo: val 是 object，序列化处理
        val = JSON.stringify(val)
      }

      // todo:保留部分特殊字符处理
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  const serializedParams = parts.join('&')
  if (serializedParams) {
    // todo: hash（#）值去除
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    // todo: 路径中的问号（？）处理
    url += (!url.includes('?') ? '?' : '&') + serializedParams
  }

  return url
}

// 对特殊字符进行处理
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
