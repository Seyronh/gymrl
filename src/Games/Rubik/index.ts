enum RubikColors {
  WHITE = 0,
  ORANGE = 1,
  GREEN = 2,
  RED = 3,
  BLUE = 4,
  YELLOW = 5,
}

type RubikState = [
  [
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
  ],
  [
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
  ],
  [
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
  ],
  [
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
  ],
  [
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
  ],
  [
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
    RubikColors,
  ],
];

type flattenedRubikState = RubikColors[];

function rotateMatrixClockwise(
  matrix: flattenedRubikState
): flattenedRubikState {
  const copy = [...matrix] as flattenedRubikState;
  copy[0] = matrix[6]!;
  copy[1] = matrix[3]!;
  copy[2] = matrix[0]!;

  copy[3] = matrix[7]!;
  copy[5] = matrix[1]!;

  copy[6] = matrix[8]!;
  copy[7] = matrix[5]!;
  copy[8] = matrix[2]!;
  return copy;
}
function rotateMatrixCounterClockwise(
  matrix: flattenedRubikState
): flattenedRubikState {
  const copy = [...matrix] as flattenedRubikState;
  copy[0] = matrix[2]!;
  copy[1] = matrix[5]!;
  copy[2] = matrix[8]!;

  copy[3] = matrix[1]!;
  copy[5] = matrix[7]!;

  copy[6] = matrix[0]!;
  copy[7] = matrix[3]!;
  copy[8] = matrix[6]!;
  return copy;
}

function createSolvedRubikState(): RubikState {
  return [
    [
      RubikColors.WHITE,
      RubikColors.WHITE,
      RubikColors.WHITE,
      RubikColors.WHITE,
      RubikColors.WHITE,
      RubikColors.WHITE,
      RubikColors.WHITE,
      RubikColors.WHITE,
      RubikColors.WHITE,
    ],
    [
      RubikColors.ORANGE,
      RubikColors.ORANGE,
      RubikColors.ORANGE,
      RubikColors.ORANGE,
      RubikColors.ORANGE,
      RubikColors.ORANGE,
      RubikColors.ORANGE,
      RubikColors.ORANGE,
      RubikColors.ORANGE,
    ],
    [
      RubikColors.GREEN,
      RubikColors.GREEN,
      RubikColors.GREEN,
      RubikColors.GREEN,
      RubikColors.GREEN,
      RubikColors.GREEN,
      RubikColors.GREEN,
      RubikColors.GREEN,
      RubikColors.GREEN,
    ],
    [
      RubikColors.RED,
      RubikColors.RED,
      RubikColors.RED,
      RubikColors.RED,
      RubikColors.RED,
      RubikColors.RED,
      RubikColors.RED,
      RubikColors.RED,
      RubikColors.RED,
    ],
    [
      RubikColors.BLUE,
      RubikColors.BLUE,
      RubikColors.BLUE,
      RubikColors.BLUE,
      RubikColors.BLUE,
      RubikColors.BLUE,
      RubikColors.BLUE,
      RubikColors.BLUE,
      RubikColors.BLUE,
    ],
    [
      RubikColors.YELLOW,
      RubikColors.YELLOW,
      RubikColors.YELLOW,
      RubikColors.YELLOW,
      RubikColors.YELLOW,
      RubikColors.YELLOW,
      RubikColors.YELLOW,
      RubikColors.YELLOW,
      RubikColors.YELLOW,
    ],
  ];
}

const RubikColorsEmojis = ["⬜", "🟧", "🟩", "🟥", "🟦", "🟨"];

function sampleAction(): number {
  return Math.floor(Math.random() * 12);
}

class RubikGame {
  public state: RubikState = createSolvedRubikState();
  private moves: number;
  private stepsTaken: number = 0;
  /**
   * Initializes the Rubik Cube with the specified random moves applied.
   */
  constructor(moves: number) {
    this.moves = moves;
    this.reset();
  }

  execute(action: number) {
    const copy = this.state.map((arr) => arr.slice());
    if (action == 0) {
      //U
      //UP
      copy[0] = rotateMatrixClockwise(copy[0]!);
      //Other faces
      for (let face = 1; face < 5; face++) {
        for (let pos = 0; pos < 3; pos++) {
          copy[face]![pos] = this.state[face + 1 == 5 ? 1 : face + 1]![pos]!;
        }
      }
    } else if (action == 1) {
      //U'
      //UP
      copy[0] = rotateMatrixCounterClockwise(copy[0]!);
      //Other faces
      for (let face = 1; face < 5; face++) {
        for (let pos = 0; pos < 3; pos++) {
          copy[face]![pos] = this.state[face == 1 ? 4 : face - 1]![pos]!;
        }
      }
    } else if (action == 2) {
      //D
      //DOWN
      copy[5] = rotateMatrixCounterClockwise(copy[5]!);
      //Other faces
      for (let face = 1; face < 5; face++) {
        for (let pos = 6; pos < 9; pos++) {
          copy[face]![pos] = this.state[face == 1 ? 4 : face - 1]![pos]!;
        }
      }
    } else if (action == 3) {
      //D'
      //DOWN
      copy[5] = rotateMatrixClockwise(copy[5]!);
      //Other faces
      for (let face = 1; face < 5; face++) {
        for (let pos = 6; pos < 9; pos++) {
          copy[face]![pos] = this.state[face + 1 == 5 ? 1 : face + 1]![pos]!;
        }
      }
    } else {
      let faces: number[] = [];
      let positions: number[][] = [];
      if (action === 4) {
        copy[3] = rotateMatrixClockwise(copy[3]!);
        faces = [0, 2, 5, 4];
        positions = [
          [2, 5, 8],
          [2, 5, 8],
          [2, 5, 8],
          [0, 3, 6],
        ];
      } else if (action === 5) {
        copy[3] = rotateMatrixCounterClockwise(copy[3]!);
        faces = [0, 4, 5, 2];
        positions = [
          [2, 5, 8],
          [0, 3, 6],
          [2, 5, 8],
          [2, 5, 8],
        ];
      } else if (action === 6) {
        copy[1] = rotateMatrixClockwise(copy[1]!);
        faces = [0, 4, 5, 2];
        positions = [
          [0, 3, 6],
          [2, 5, 8],
          [0, 3, 6],
          [0, 3, 6],
        ];
      } else if (action === 7) {
        copy[1] = rotateMatrixCounterClockwise(copy[1]!);
        faces = [0, 2, 5, 4];
        positions = [
          [0, 3, 6],
          [0, 3, 6],
          [0, 3, 6],
          [2, 5, 8],
        ];
      } else if (action === 8) {
        copy[2] = rotateMatrixClockwise(copy[2]!);
        faces = [0, 1, 5, 3];
        positions = [
          [6, 7, 8],
          [2, 5, 8],
          [0, 1, 2],
          [0, 3, 6],
        ];
      } else if (action === 9) {
        //F'
        //Front
        copy[2] = rotateMatrixCounterClockwise(copy[2]!);
        faces = [0, 3, 5, 1];
        positions = [
          [6, 7, 8],
          [0, 3, 6],
          [0, 1, 2],
          [2, 5, 8],
        ];
      } else if (action === 10) {
        //B
        //Back
        copy[4] = rotateMatrixClockwise(copy[4]!);
        faces = [0, 3, 5, 1];
        positions = [
          [0, 1, 2],
          [2, 5, 8],
          [6, 7, 8],
          [0, 3, 6],
        ];
      } else if (action === 11) {
        //B'
        //Back
        copy[4] = rotateMatrixCounterClockwise(copy[4]!);
        faces = [0, 1, 5, 3];
        positions = [
          [0, 1, 2],
          [0, 3, 6],
          [6, 7, 8],
          [2, 5, 8],
        ];
      }
      for (let face = 0; face < 4; face++) {
        for (let pos = 0; pos < positions[face]!.length; pos++) {
          copy[faces[face]!]![positions[face]![pos]!] =
            this.state[faces[(face + 1) % faces.length]!]![
              positions[(face + 1) % faces.length]![pos]!
            ]!;
        }
      }
    }
    this.state = copy.map((arr) => arr.slice()) as RubikState;
  }
  getRemainingSteps(): number {
    return this.moves - this.stepsTaken;
  }
  reset() {
    this.stepsTaken = 0;
    this.state = createSolvedRubikState();
    for (let i = 0; i < this.moves; i++) {
      this.execute(sampleAction());
    }
  }
  /**
   * Renders the current state of the Rubik cube to the console.
   *
   * @return {void} This function does not return a value.
   */
  render() {
    const repState = this.state.map((Y) => {
      return Y.map((x) => RubikColorsEmojis[x]);
    });

    console.log(
      `              +------------+\n`,
      `             | ${repState[0]![0]}  ${repState[0]![1]}  ${repState[0]![2]} |\n`,
      `             | ${repState[0]![3]}  ${repState[0]![4]}  ${repState[0]![5]} |\n`,
      `             | ${repState[0]![6]}  ${repState[0]![7]}  ${repState[0]![8]} |\n`,
      `+------------+------------+------------+------------+\n`,
      `| ${repState[1]![0]}  ${repState[1]![1]}  ${repState[1]![2]} | ${repState[2]![0]}  ${repState[2]![1]}  ${repState[2]![2]} | ${repState[3]![0]}  ${repState[3]![1]}  ${repState[3]![2]} | ${repState[4]![0]}  ${repState[4]![1]}  ${repState[4]![2]} |\n`,
      `| ${repState[1]![3]}  ${repState[1]![4]}  ${repState[1]![5]} | ${repState[2]![3]}  ${repState[2]![4]}  ${repState[2]![5]} | ${repState[3]![3]}  ${repState[3]![4]}  ${repState[3]![5]} | ${repState[4]![3]}  ${repState[4]![4]}  ${repState[4]![5]} |\n`,
      `| ${repState[1]![6]}  ${repState[1]![7]}  ${repState[1]![8]} | ${repState[2]![6]}  ${repState[2]![7]}  ${repState[2]![8]} | ${repState[3]![6]}  ${repState[3]![7]}  ${repState[3]![8]} | ${repState[4]![6]}  ${repState[4]![7]}  ${repState[4]![8]} |\n`,
      `+------------+------------+------------+------------+\n`,
      `             | ${repState[5]![0]}  ${repState[5]![1]}  ${repState[5]![2]} |\n`,
      `             | ${repState[5]![3]}  ${repState[5]![4]}  ${repState[5]![5]} |\n`,
      `             | ${repState[5]![6]}  ${repState[5]![7]}  ${repState[5]![8]} |\n`,
      `             +------------+`
    );
  }
}
export { RubikGame };
