export default class Snake {
  head: HTMLElement
  bodies: HTMLCollection
  element: HTMLElement

  constructor() {
    this.head = document.querySelector('.snake > div')!
    this.element = document.querySelector('.snake')!
    this.bodies = this.element.getElementsByTagName('div')
  }

  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(value: number) {
    if (this.X === value) return
    if (value < 0 || value > 290) {
      throw new Error('Game Over')
    }

    this.moveBody()

    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }

  set Y(value: number) {
    if (this.Y === value) return
    if (value < 0 || value > 290) {
      throw new Error('Game Over')
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()
  }

  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px'
    }
  }

  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error('Error, catch self')
      }
    }
  }
}








