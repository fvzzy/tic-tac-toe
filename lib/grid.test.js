const { createGrid, printGrid } = require("./grid")

describe("createGrid", () => {
  test("it returns a grid as an array of arrays, filled with empty characters", () => {
    expect(createGrid(3)).toEqual([
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ])

    expect(createGrid(5)).toEqual([
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "]
    ])
  })
})

describe("printGrid", () => {
  console.log = jest.fn()
  const grid = [
    ["x", " ", "x"],
    [" ", "o", "o"],
    [" ", "x", " "]
  ]

  test("it prints out each row of the grid on a separate line", () => {
    printGrid(grid)
    expect(console.log).toHaveBeenNthCalledWith(1, ["x", " ", "x"])
    expect(console.log).toHaveBeenNthCalledWith(2, [" ", "o", "o"])
    expect(console.log).toHaveBeenNthCalledWith(3, [" ", "x", " "])
  })
})
