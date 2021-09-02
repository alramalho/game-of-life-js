import Board from "../board";

// When true, moving the mouse draws on the canvas
export default function handleEvents(board, cellWidth) {
  let isDrawing = false;
  let x = window.screenX;
  let y = window.screenY;

  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');

  canvas.addEventListener('mousedown', handleDown);
  canvas.addEventListener('touchstart', handleDown);
  canvas.addEventListener('mousemove', handleMove);
  canvas.addEventListener('touchmove', handleMove);
  canvas.addEventListener('touchend', handleUp);
  canvas.addEventListener('mouseup', handleUp);

  function handleDown(e) {
    console.log("Handle down event triggered")
    x = e.clientX;
    y = e.clientY;
    isDrawing = true;
    const [i, j] = getBoardPos()
    board.makeAlive(i,j)
    console.log("You are touching position ", i, ",", j, " from the board.")
    context.fillRect(j * cellWidth, i * cellWidth, cellWidth, cellWidth)
    console.log("Position ", x, ",", y,".")
  }
  function handleMove(e) {
    console.log("Handle move event triggered")
    if (isDrawing === true) {
      x = e.clientX;
      y = e.clientY;
      const [i, j] = getBoardPos()
      board.makeAlive(i,j)
      context.fillRect(j * cellWidth, i * cellWidth, cellWidth, cellWidth)
    }
  }
  function handleUp(e) {
    console.log("Handle up event triggered")
    if (isDrawing === true) {
      isDrawing = false;
    }
  }
  function getBoardPos() {
    // DONT FORGET HERE X IS -> AND Y IS ⬇, which means x represents cols
    const row = Math.floor(y / cellWidth)
    const col = Math.floor(x / cellWidth)
    console.log("Board pos: ", x, ",", y)

    return [row, col]
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

