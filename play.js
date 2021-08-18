const readline = require("readline-sync")

const GRID_SIZE = 3
const grid = Array(GRID_SIZE)
  .fill(Array(GRID_SIZE).fill(" "))
  .map((row) => row.slice())

const printGrid = () => grid.forEach((row) => console.log(row))
printGrid()

const validMoveFormat = new RegExp(`^[1-${GRID_SIZE}],[1-${GRID_SIZE}]$`)
const isMoveFormatValid = (move) => validMoveFormat.test(move)
const isSquareTaken = (x, y) => grid[x][y] !== " "

let winner = null
let currentPlayer = "x"
const alternatePlayer = (token) => (token === "x" ? "o" : "x")

const row = (x) => grid[x]
const column = (y) => grid.map((row) => row[y])
const isMoveOnDiagonal = (x, y) => x === y || x + y === GRID_SIZE - 1
const ltrDiagonal = grid.map((row, rowIdx) => row[rowIdx])
const rtlDiagonal = grid.map((row, rowIdx) => row[GRID_SIZE - 1 - rowIdx])
const diagonal = (x, y) => (x === y ? ltrDiagonal : rtlDiagonal)

const complete = (coords) => coords.every((c) => c === currentPlayer)
const moveFillsDiagonal = (x, y) => isMoveOnDiagonal && complete(diagonal(x, y))
const moveFillsRow = (x) => complete(row(x))
const moveFillsColumn = (y) => complete(column(y))

while (!winner) {
  const move = readline.question(`Next move, ${currentPlayer}: `)
  const x = move[0] - 1
  const y = move[2] - 1

  if (!isMoveFormatValid(move)) {
    console.log(
      `Your move should be in the format "x,y", with numbers between 1 and ${GRID_SIZE}`
    )
    continue
  }

  if (isSquareTaken(x, y)) {
    console.log(`The square at [${x + 1},${y + 1}] is taken`)
    continue
  }

  grid[x][y] = currentPlayer
  printGrid()

  if (moveFillsDiagonal(x, y) || moveFillsRow(x) || moveFillsColumn(y)) {
    winner = currentPlayer
  } else {
    currentPlayer = alternatePlayer(currentPlayer)
  }
}

console.log(`${currentPlayer} wins!`)
process.exit(0)
