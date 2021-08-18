const alternatePlayer = (token) => (token === "x" ? "o" : "x")

const validMoveFormat = (gridSize) =>
  new RegExp(`^[1-${gridSize}],[1-${gridSize}]$`)
const isMoveFormatValid = (gridSize, move) =>
  validMoveFormat(gridSize).test(move)
const isSquareTaken = (grid, x, y) => grid[x][y] !== " "

const row = (grid, x) => grid[x]
const column = (grid, y) => grid.map((row) => row[y])
const isMoveOnDiagonal = (gridSize, x, y) => x === y || x + y === gridSize - 1
const ltrDiagonal = (grid) => grid.map((row, rowIdx) => row[rowIdx])
const rtlDiagonal = (grid) =>
  grid.map((row, rowIdx) => row[row.length - 1 - rowIdx])
const diagonal = (grid, x, y) =>
  x === y ? ltrDiagonal(grid) : rtlDiagonal(grid)

const complete = (coords, token) => coords.every((c) => c === token)
const moveFillsDiagonal = (grid, token, x, y) =>
  isMoveOnDiagonal && complete(diagonal(grid, x, y), token)
const moveFillsRow = (grid, token, x) => complete(row(grid, x), token)
const moveFillsColumn = (grid, token, y) => complete(column(grid, y), token)
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
  isMoveOnDiagonal,
  ltrDiagonal,
  rtlDiagonal,
  diagonal,
  complete,
  moveFillsDiagonal,
  moveFillsRow,
  moveFillsColumn,
  moveWinsGame
}
