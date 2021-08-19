const alternatePlayer = (token) => (token === "x" ? "o" : "x")

const validMoveFormat = (gridSize) =>
  new RegExp(`^[1-${gridSize}],[1-${gridSize}]$`)
const isMoveFormatValid = (gridSize, move) =>
  validMoveFormat(gridSize).test(move)
const isSquareTaken = (grid, x, y) => grid[x][y] !== " "

const row = (grid, rowIdx) => grid[rowIdx]
const column = (grid, colIdx) => grid.map((row) => row[colIdx])
const ltrDiagonal = (grid) => grid.map((row, rowIdx) => row[rowIdx])
const rtlDiagonal = (grid) =>
  grid.map((row, rowIdx) => row[row.length - 1 - rowIdx])
const diagonal = (grid, x, y) =>
  x === y ? ltrDiagonal(grid) : rtlDiagonal(grid)

const isSquareInCenter = (gridSize, x, y) =>
  gridSize % 2 !== 0 && Math.floor(gridSize / 2) === x && x === y
const isSquareOnDiagonal = (gridSize, x, y) => x === y || x + y === gridSize - 1

const isComplete = (squares, token) => squares.every((c) => c === token)
const moveFillsDiagonal = (grid, token, x, y) => {
  if (!isSquareOnDiagonal(grid.length, x, y)) return false
  if (isSquareInCenter(grid.length, x, y)) {
    return isComplete(ltrDiagonal(grid)) || isComplete(rtlDiagonal(grid))
  }
  // a small optimisation to avoid checking one diagonal, if possible
  return isComplete(diagonal(grid, x, y), token)
}
const moveFillsRow = (grid, token, rowIdx) =>
  isComplete(row(grid, rowIdx), token)
const moveFillsColumn = (grid, token, colIdx) =>
  isComplete(column(grid, colIdx), token)
const moveWinsGame = (grid, token, x, y) => {
  return (
    moveFillsDiagonal(grid, token, x, y) ||
    moveFillsRow(grid, token, x) ||
    moveFillsColumn(grid, token, y)
  )
}

module.exports = {
  alternatePlayer,
  validMoveFormat,
  isMoveFormatValid,
  isSquareTaken,
  row,
  column,
  isSquareInCenter,
  isSquareOnDiagonal,
  ltrDiagonal,
  rtlDiagonal,
  diagonal,
  isComplete,
  moveFillsDiagonal,
  moveFillsRow,
  moveFillsColumn,
  moveWinsGame
}
