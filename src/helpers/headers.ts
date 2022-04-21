import type { Method } from './../../src-origin/types/index'
import { deepMerge, isObject } from './util'
export function processHeaders(headers: any, data: any): any {
  if (isObject(data)) {
    normalizeHeaderName(headers, 'Content-Type')
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

function normalizeHeaderName(headers: any, normalizedName: string): any {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toLocaleLowerCase() === normalizedName.toLocaleLowerCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
  return headers
}

export function parseHeaders(headers: string): any {
  const parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    key = key.trim().toLocaleLowerCase()
    if (!key) { return }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach((method) => {
    delete headers[method]
  })

  return headers
}
