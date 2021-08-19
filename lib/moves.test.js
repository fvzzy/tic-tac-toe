const {
  alternatePlayer,
  validMoveFormat,
  isMoveFormatValid,
  isSquareTaken,
  row,
  column,
  ltrDiagonal,
  rtlDiagonal,
  diagonal,
  isSquareInCenter,
  isSquareOnDiagonal,
  isComplete
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

describe("grid patterns", () => {
  const grid = [
    ["x", "o", "o"],
    [" ", " ", "x"],
    ["o", " ", "x"]
  ]

  describe("row", () => {
    test("it returns all values for a row by row index", () => {
      expect(row(grid, 0)).toEqual(["x", "o", "o"])
      expect(row(grid, 1)).toEqual([" ", " ", "x"])
      expect(row(grid, 2)).toEqual(["o", " ", "x"])
    })
  })

  describe("column", () => {
    test("it returns all values for a column by column index", () => {
      expect(column(grid, 0)).toEqual(["x", " ", "o"])
      expect(column(grid, 1)).toEqual(["o", " ", " "])
      expect(column(grid, 2)).toEqual(["o", "x", "x"])
    })
  })

  describe("ltrDiagonal", () => {
    test("it returns values for the left-to-right (top-to-bottom) diagonal", () => {
      expect(ltrDiagonal(grid)).toEqual(["x", " ", "x"])
    })
  })

  describe("rtlDiagonal", () => {
    test("it returns values for the right-to-left (top-to-bottom) diagonal", () => {
      expect(rtlDiagonal(grid)).toEqual(["o", " ", "o"])
    })
  })

  describe("diagonal", () => {
    test("it returns values from the diagonal this square is on", () => {
      expect(diagonal(grid, 1, 1)).toEqual(["x", " ", "x"])
      expect(diagonal(grid, 3, 3)).toEqual(["x", " ", "x"])
      expect(diagonal(grid, 1, 3)).toEqual(["o", " ", "o"])
      expect(diagonal(grid, 3, 1)).toEqual(["o", " ", "o"])
    })
  })
})

describe("special case squares", () => {
  describe("isSquareInCenter", () => {
    test("it returns true if the square is the center square of the grid", () => {
      expect(isSquareInCenter(3, 1, 1)).toBe(true)
      expect(isSquareInCenter(5, 2, 2)).toBe(true)
    })

    test("it returns false if the square is not in the center of the grid", () => {
      expect(isSquareInCenter(4, 2, 2)).toBe(false)
      expect(isSquareInCenter(5, 3, 2)).toBe(false)
    })
  })

  describe("isSquareOnDiagonal", () => {
    test("it returns true if the square lies on a diagonal", () => {
      expect(isSquareOnDiagonal(3, 2, 2)).toBe(true)
      expect(isSquareOnDiagonal(4, 1, 2)).toBe(true)
      expect(isSquareOnDiagonal(5, 4, 0)).toBe(true)
    })
  })

  describe("winning move checks", () => {
    describe("isComplete", () => {
      test("it returns true when every element in an array is the same token", () => {
        expect(isComplete(["x", "x", "x"], "x")).toBe(true)
        expect(isComplete(["o", "o", "o", "o"], "o")).toBe(true)
      })

      test("it returns false if any elements are different or are blank", () => {
        expect(isComplete(["x", "x", "o"], "x")).toBe(false)
        expect(isComplete(["o", " ", "o", "o"], "o")).toBe(false)
      })
    })

    // TODO: rewrite these methods
    // these methods are a little awkward to test, and might
    // be easier to read and test if they instead accepted
    // the previous grid state, a new move, and the returned the
    // resultant game state
    describe("wasRowCompleted", () => {})

    describe("wasColumnCompleted", () => {})

    describe("wasDiagonalCompleted", () => {})

    describe("moveWinsGame", () => {})
  })
})
