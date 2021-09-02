export default class Board {

  private instance: Board;
  matrix: boolean[][] = [];
  public rows: number
  public cols: number

  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols
  }

  start() {
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = []
      for (let j = 0; j < this.cols; j++) {
        if (Math.random() < 0.15) {
          this.makeAlive(i, j)
        } else {
          this.kill(i, j)
        }
      }
    }
  }

  public update() {
    let newMatrix = this.getMatrixState()
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.isAlive(i, j)) {
          switch (this.countLivingNeighbours(i, j)) {
            case 2:
            case 3:
              break;
            default:
              newMatrix[i][j] = false
          }
        } else {
          switch (this.countLivingNeighbours(i, j)) {
            case 3:
              newMatrix[i][j] = true
              break
            default:
              break
          }
        }
      }
    }
    this.matrix = newMatrix
  }

  isAlive(x: number, y: number): boolean {
    return this.matrix[x][y]
  }

  countLivingNeighbours(x: number, y: number): number {
    let counter = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        try {
          if (x == i && y == j) {
          } else if (this.isAlive(i, j)) {
            counter++
          }
        } catch {
        }
      }
    }
    return counter
  }

  kill(x: number, y: number) {
    this.matrix[x][y] = false
  }

  makeAlive(x: number, y: number) {
    this.matrix[x][y] = true
  }

  getMatrixState() {
    let newMatrix: boolean[][] = []
    for (let i = 0; i < this.rows; i++) {
      newMatrix[i] = []
      for (let j = 1; j < this.cols; j++) {
        newMatrix[i][j] = this.matrix[i][j]
      }
    }
    return newMatrix
  }
}