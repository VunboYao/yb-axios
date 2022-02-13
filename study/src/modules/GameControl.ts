import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'


export default class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel

  direction: string = ''
  isLive: boolean = false

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
    this.init()
  }
  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this))
  }

  keydownHandler(event: KeyboardEvent) {
    // 按键控制
    if (this.direction === 'ArrowUp') {
      if (event.key === 'ArrowDown') return
    } else if (this.direction === 'ArrowDown') {
      if (event.key === 'ArrowUp') return
    } else if (this.direction === 'ArrowLeft') {
      if (event.key === 'ArrowRight') return
    } else if (this.direction === 'ArrowRight') {
      if (event.key === 'ArrowLeft') return
    }
    this.direction = event.key
    if (!this.isLive) {
      this.isLive = true
      this.run()
    }
  }

  run() {
    let X = this.snake.X
    let Y = this.snake.Y

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break;
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break;
      case 'ArrowLeft':
      case 'Left':
        X -= 10
        break;
      case 'ArrowRight':
      case 'Right':
        X += 10
        break;
    }
    console.log(X, Y);

    this.checkEat(X, Y)

    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e) {
      alert('Game Over')
      this.isLive = false
    }
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change()
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }
}
