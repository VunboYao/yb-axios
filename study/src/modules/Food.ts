
export default class Food {
  element: HTMLElement
  constructor() {
    // 非空断言
    this.element = document.querySelector('.food')!
  }

  get X() {
    /* offsetLeft: 元素左边框距离包含元素左边框内侧的像素值。offsetWidth: 指元素宽度 */
    // getBoundingClientRect 获取元素视口的位置
    return this.element.offsetLeft
  }

  get Y() {
    return this.element.offsetTop
  }

  change() {
    let X = Math.round(Math.random() * 29) * 10
    let Y = Math.round(Math.random() * 29) * 10
    this.element.style.left = X + 'px'
    this.element.style.top = Y + 'px'
  }
}
