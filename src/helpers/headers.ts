import { isObject } from './util'
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
