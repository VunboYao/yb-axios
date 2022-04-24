import { Cancel as CancelInterface } from '../types'

export default class Cancel implements CancelInterface {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value:any): boolean {
  return value instanceof Cancel
}
