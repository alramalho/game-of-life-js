import Board from "./board";
import {canvasWidth, canvasHeight, canvasFactor} from "./main";
import handleEvents from "./utils/EventHandler";

export default class Canvas {

  private canvas = document.querySelector('canvas')
  private context = this.canvas.getContext('2d')
  private board: Board
  private readonly cellWidth: number

  constructor(board: Board, cellWidth: number) {
    this.board = board
    this.cellWidth = cellWidth
    handleEvents(this.board, this.cellWidth)

    document.getElementsByTagName("canvas")[0].setAttribute("width", canvasWidth.toString().concat("px"));
    document.getElementsByTagName("canvas")[0].setAttribute("height", canvasHeight.toString().concat("px"));
  }

  prepare() {

    for (let i = 0; i <= this.board.cols; i++) {
      this.context.moveTo(0.5 + i * this.cellWidth, 0);
      this.context.lineTo(0.5 + i * this.cellWidth, this.board.rows * this.cellWidth)
    }
    for (let j = 0; j <= this.board.rows; j++) {
      this.context.moveTo(0.5, this.cellWidth * j);
      this.context.lineTo(0.5 + this.board.cols * this.cellWidth, this.cellWidth * j);
    }

    this.board.start()
    this.paint()

    this.context.strokeStyle = "black";
    this.context.stroke();
  }

  update() {
    this.board.update()
    this.paint()
  }

  paint() {
    for (let i = 0; i < this.board.cols; i++) {
      for (let j = 0; j < this.board.rows; j++) {
        if (this.board.isAlive(j,i)) {
          this.context.fillRect(i * this.cellWidth, j * this.cellWidth, this.cellWidth, this.cellWidth)
        } else {
          this.context.clearRect(i * this.cellWidth+1, j * this.cellWidth+1, this.cellWidth-1, this.cellWidth-1)
        }
      }
    }
  }
}
