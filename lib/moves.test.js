const {
  alternatePlayer,
  validMoveFormat,
  isMoveFormatValid,
  isSquareTaken
} = require("./moves")

describe("alternatePlayer", () => {
  test("it returns the opposite player token", () => {
    expect(alternatePlayer("x")).toBe("o")
    expect(alternatePlayer("o")).toBe("x")
  })
})

describe("move validation", () => {
  describe("validMoveFormat", () => {
    test("it returns a regex pattern for a valid move input", () => {
      expect(validMoveFormat(3)).toEqual(RegExp(/^[1-3],[1-3]$/))
    })
  })

  describe("isMoveFormatValid", () => {
    test("it returns true for valid moves", () => {
      expect(isMoveFormatValid(3, "1,2")).toBe(true)
      expect(isMoveFormatValid(5, "5,5")).toBe(true)
    })

    test("it returns false for invalid moves", () => {
      expect(isMoveFormatValid(3, "0,2")).toBe(false)
      expect(isMoveFormatValid(5, "1,6")).toBe(false)
    })
  })

  describe("isSquareTaken", () => {
    const grid = [
      [" ", " ", " "],
      [" ", " ", "x"],
      ["o", " ", " "]
    ]
    test("it returns true if the square contains a player token", () => {
      expect(isSquareTaken(grid, 1, 2)).toBe(true)
      expect(isSquareTaken(grid, 2, 0)).toBe(true)
    })
    test("it returns false if the square is empty", () => {
      expect(isSquareTaken(grid, 0, 0)).toBe(false)
    })
  })
})

describe("row", () => {
  test("it returns all values for a row by row index", () => {})
})

describe("column", () => {
  test("it returns all values for a column by column index", () => {})
})
