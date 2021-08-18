const createGrid = (gridSize) =>
  Array(gridSize)
    .fill(Array(gridSize).fill(" "))
    .map((row) => row.slice())

const printGrid = (grid) => grid.forEach((row) => console.log(row))

module.exports = {
  createGrid,
  printGrid
}
