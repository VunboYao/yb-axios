export function getType(val: any): string {
  const type = typeof val
  if (type !== 'object') {
    return type
  }

  return Object.prototype.toString.call(val).replace(/^\[object (\S+)]$/, (_, $1: string) => {
    return $1.toLocaleLowerCase()
  })
}

// 类型谓词： 类型保护，提供智能提示
export function isDate(val: any): val is Date {
  return getType(val) === 'date'
}
export function isObject(val: any): val is Object {
  return getType(val) === 'object'
}
export function isFormData(val: any): boolean {
  // return typeof val !== 'undefined' && val instanceof DormData
  return getType(val) === 'formdata'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key]
        if (isObject(val)) {
          if (isObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
