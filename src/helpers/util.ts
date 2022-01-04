export function getType(val: any): string {
  const type = typeof val
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(val).replace(/^\[object (\S+)]$/, (match, $1) => {
    return $1.toLocaleLowerCase()
  })
}

// 类型谓词：类型保护
export function isDate(val: any): val is Date {
  return getType(val) === 'date'
}

export function isObject(val: any): val is Object {
  return getType(val) === 'object'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
