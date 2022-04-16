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
