const readline = require("readline-sync")

const GRID_SIZE = 3
const grid = Array(GRID_SIZE)
  .fill(Array(GRID_SIZE).fill(" "))
  .map((row) => row.slice())

const validMoveFormat = /^[1-3],[1-3]$/
const isMoveFormatValid = (move) => validMoveFormat.test(move)
const isSquareTaken = (x, y) => grid[x][y] !== " "

let winner = null
let currentPlayer = "x"
const alternatePlayer = (token) => (token === "x" ? "o" : "x")


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

  grid.forEach((row) => console.log(row))
  playerToken = alternatePlayer(playerToken)
  grid[x][y] = currentPlayer
}
