import { isDate, isObject, isURLSearchParams } from './util'

/*
* 参数值为数组：/base/get?foo[]=bar&foo[]=baz
* 参数值为对象：encode 对象
* 参数为 Date 类型：拼接 date.toISOString()的结果
* 特殊字符支持：对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode
* 空值忽略：对于值为 null 或 undefined 的属性，不添加到 url 参数中
* 丢弃 url 中的哈希标记：#hash移除
* 保留url中已存在的参数
*/
export function buildUrl(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string,
): string {
  // 无参数则退出
  if (!params) {
    return url
  }

  let serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
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
    serializedParams = parts.join('&')
  }

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

interface URLOrigin {
  protocol: string
  host: string
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host,
  }
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host)
}
