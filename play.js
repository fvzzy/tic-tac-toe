const readline = require("readline-sync")

const GRID_SIZE = 3
const grid = Array(GRID_SIZE)
  .fill(Array(GRID_SIZE).fill(" "))
  .map((row) => row.slice())

const validMoveFormat = /^[1-3],[1-3]$/
const isMoveFormatValid = (move) => validMoveFormat.test(move)
const isSquareTaken = (x, y) => grid[x - 1][y - 1] !== " "

let playerToken = "x"
const alternatePlayer = (token) => (token === "x" ? "o" : "x")

let winner = null

while (!winner) {
  const move = readline.question(`Next move, ${playerToken}: `)
  const x = move[0]
  const y = move[2]

  if (!isMoveFormatValid(move)) {
    console.log(
      `Your move should be in the format "x,y", with numbers between 1 and ${GRID_SIZE}`
    )
    continue
  }

  if (isSquareTaken(x, y)) {
    console.log(`The square at [${x},${y}] is taken`)
    continue
  }

  grid[x - 1][y - 1] = playerToken
  grid.forEach((row) => console.log(row))
  playerToken = alternatePlayer(playerToken)
}
