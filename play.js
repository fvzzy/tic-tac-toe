const readline = require("readline-sync")
const { createGrid, printGrid } = require("./lib/grid.js")
const {
  alternatePlayer,
  isMoveFormatValid,
  isSquareTaken,
  moveWinsGame
} = require("./lib/moves")

const GRID_SIZE = 3
const grid = createGrid(GRID_SIZE)
printGrid(grid)

let winner = null
let currentPlayer = "x"

while (!winner) {
  const move = readline.question(`Next move, ${currentPlayer}: `)
  const x = move[0] - 1
  const y = move[2] - 1

  if (!isMoveFormatValid(GRID_SIZE, move)) {
    console.log(
      `Your move should be in the format "x,y", with numbers between 1 and ${GRID_SIZE}`
    )
    continue
  }

  if (isSquareTaken(grid, x, y)) {
    console.log(`The square at [${x + 1},${y + 1}] is taken`)
    continue
  }

  grid[x][y] = currentPlayer
  printGrid(grid)

  if (moveWinsGame(grid, currentPlayer, x, y)) {
    winner = currentPlayer
  } else {
    currentPlayer = alternatePlayer(currentPlayer)
  }
}

console.log(`${currentPlayer} wins!`)
process.exit(0)
