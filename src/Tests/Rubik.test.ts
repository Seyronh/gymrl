import type { RubikGame } from "../Games/index.ts";
import { Rubik } from "../index.ts";
import { expect, test, beforeEach } from "bun:test";

type RubikTest = Omit<Rubik, "state"> & {
  game: RubikGame;
};
let cube: RubikTest;
beforeEach(() => {
  cube = new Rubik(10) as unknown as RubikTest;
  cube.game.state = [
    [
      0,
      0,
      0,
      0,
      0,
      0, //UP
      0,
      0,
      0,
    ],
    [
      1,
      1,
      1,
      1,
      1,
      1, //LEFT
      1,
      1,
      1,
    ],
    [
      2,
      2,
      2,
      2,
      2,
      2, //FRONT
      2,
      2,
      2,
    ],
    [
      3,
      3,
      3,
      3,
      3,
      3, //RIGHT
      3,
      3,
      3,
    ],
    [
      4,
      4,
      4,
      4,
      4,
      4, //BACK
      4,
      4,
      4,
    ],
    [
      5,
      5,
      5,
      5,
      5,
      5, //DOWN
      5,
      5,
      5,
    ],
  ];
});

test("Constructor", () => {
  expect(cube.game).toHaveProperty("stepsTaken", 0);
  expect(cube.game).toHaveProperty("moves", 10);
});

test("SampleAction", () => {
  for (let i = 0; i < 20; i++) {
    const action = cube.sampleAction();
    expect(action).toBeLessThan(12);
    expect(action).toBeGreaterThanOrEqual(0);
  }
});
test("StepU", () => {
  cube.step(0);
  expect(cube.game).toHaveProperty("state", [
    [
      0,
      0,
      0,
      0,
      0,
      0, //UP
      0,
      0,
      0,
    ],
    [
      2,
      2,
      2,
      1,
      1,
      1, //LEFT
      1,
      1,
      1,
    ],
    [
      3,
      3,
      3,
      2,
      2,
      2, //FRONT
      2,
      2,
      2,
    ],
    [
      4,
      4,
      4,
      3,
      3,
      3, //RIGHT
      3,
      3,
      3,
    ],
    [
      1,
      1,
      1,
      4,
      4,
      4, //BACK
      4,
      4,
      4,
    ],
    [
      5,
      5,
      5,
      5,
      5,
      5, //DOWN
      5,
      5,
      5,
    ],
  ]);
});
test("StepU'", () => {
  cube.step(1);
  expect(cube.game).toHaveProperty("state", [
    [
      0,
      0,
      0,
      0,
      0,
      0, //UP
      0,
      0,
      0,
    ],
    [
      4,
      4,
      4,
      1,
      1,
      1, //LEFT
      1,
      1,
      1,
    ],
    [
      1,
      1,
      1,
      2,
      2,
      2, //FRONT
      2,
      2,
      2,
    ],
    [
      2,
      2,
      2,
      3,
      3,
      3, //RIGHT
      3,
      3,
      3,
    ],
    [
      3,
      3,
      3,
      4,
      4,
      4, //BACK
      4,
      4,
      4,
    ],
    [
      5,
      5,
      5,
      5,
      5,
      5, //DOWN
      5,
      5,
      5,
    ],
  ]);
});
test("StepD", () => {
  cube.step(2);
  expect(cube.game).toHaveProperty("state", [
    [
      0,
      0,
      0,
      0,
      0,
      0, //UP
      0,
      0,
      0,
    ],
    [
      1,
      1,
      1,
      1,
      1,
      1, //LEFT
      4,
      4,
      4,
    ],
    [
      2,
      2,
      2,
      2,
      2,
      2, //FRONT
      1,
      1,
      1,
    ],
    [
      3,
      3,
      3,
      3,
      3,
      3, //RIGHT
      2,
      2,
      2,
    ],
    [
      4,
      4,
      4,
      4,
      4,
      4, //BACK
      3,
      3,
      3,
    ],
    [
      5,
      5,
      5,
      5,
      5,
      5, //DOWN
      5,
      5,
      5,
    ],
  ]);
});
test("StepD'", () => {
  cube.step(3);
  expect(cube.game).toHaveProperty("state", [
    [
      0,
      0,
      0,
      0,
      0,
      0, //UP
      0,
      0,
      0,
    ],
    [
      1,
      1,
      1,
      1,
      1,
      1, //LEFT
      2,
      2,
      2,
    ],
    [
      2,
      2,
      2,
      2,
      2,
      2, //FRONT
      3,
      3,
      3,
    ],
    [
      3,
      3,
      3,
      3,
      3,
      3, //RIGHT
      4,
      4,
      4,
    ],
    [
      4,
      4,
      4,
      4,
      4,
      4, //BACK
      1,
      1,
      1,
    ],
    [
      5,
      5,
      5,
      5,
      5,
      5, //DOWN
      5,
      5,
      5,
    ],
  ]);
});
test("StepR", () => {
  cube.step(4);
  expect(cube.game).toHaveProperty("state", [
    [
      0,
      0,
      2,
      0,
      0,
      2, //UP
      0,
      0,
      2,
    ],
    [
      1,
      1,
      1,
      1,
      1,
      1, //LEFT
      1,
      1,
      1,
    ],
    [
      2,
      2,
      5,
      2,
      2,
      5, //FRONT
      2,
      2,
      5,
    ],
    [
      3,
      3,
      3,
      3,
      3,
      3, //RIGHT
      3,
      3,
      3,
    ],
    [
      0,
      4,
      4,
      0,
      4,
      4, //BACK
      0,
      4,
      4,
    ],
    [
      5,
      5,
      4,
      5,
      5,
      4, //DOWN
      5,
      5,
      4,
    ],
  ]);
});
test("StepR'", () => {
  cube.step(5);
  expect(cube.game).toHaveProperty("state", [
    [
      0,
      0,
      4,
      0,
      0,
      4, //UP
      0,
      0,
      4,
    ],
    [
      1,
      1,
      1,
      1,
      1,
      1, //LEFT
      1,
      1,
      1,
    ],
    [
      2,
      2,
      0,
      2,
      2,
      0, //FRONT
      2,
      2,
      0,
    ],
    [
      3,
      3,
      3,
      3,
      3,
      3, //RIGHT
      3,
      3,
      3,
    ],
    [
      5,
      4,
      4,
      5,
      4,
      4, //BACK
      5,
      4,
      4,
    ],
    [
      5,
      5,
      2,
      5,
      5,
      2, //DOWN
      5,
      5,
      2,
    ],
  ]);
});
test("StepL", () => {
  cube.step(6);
  expect(cube.game).toHaveProperty("state", [
    [
      4,
      0,
      0,
      4,
      0,
      0, //UP
      4,
      0,
      0,
    ],
    [
      1,
      1,
      1,
      1,
      1,
      1, //LEFT
      1,
      1,
      1,
    ],
    [
      0,
      2,
      2,
      0,
      2,
      2, //FRONT
      0,
      2,
      2,
    ],
    [
      3,
      3,
      3,
      3,
      3,
      3, //RIGHT
      3,
      3,
      3,
    ],
    [
      4,
      4,
      5,
      4,
      4,
      5, //BACK
      4,
      4,
      5,
    ],
    [
      2,
      5,
      5,
      2,
      5,
      5, //DOWN
      2,
      5,
      5,
    ],
  ]);
});
test("StepL'", () => {
  cube.step(7);
  expect(cube.game).toHaveProperty("state", [
    [
      2,
      0,
      0,
      2,
      0,
      0, //UP
      2,
      0,
      0,
    ],
    [
      1,
      1,
      1,
      1,
      1,
      1, //LEFT
      1,
      1,
      1,
    ],
    [
      5,
      2,
      2,
      5,
      2,
      2, //FRONT
      5,
      2,
      2,
    ],
    [
      3,
      3,
      3,
      3,
      3,
      3, //RIGHT
      3,
      3,
      3,
    ],
    [
      4,
      4,
      0,
      4,
      4,
      0, //BACK
      4,
      4,
      0,
    ],
    [
      4,
      5,
      5,
      4,
      5,
      5, //DOWN
      4,
      5,
      5,
    ],
  ]);
});
test("StepF", () => {
  cube.step(8);
  expect(cube.game).toHaveProperty("state", [
    [
      0,
      0,
      0,
      0,
      0,
      0, //UP
      1,
      1,
      1,
    ],
    [
      1,
      1,
      5,
      1,
      1,
      5, //LEFT
      1,
      1,
      5,
    ],
    [
      2,
      2,
      2,
      2,
      2,
      2, //FRONT
      2,
      2,
      2,
    ],
    [
      0,
      3,
      3,
      0,
      3,
      3, //RIGHT
      0,
      3,
      3,
    ],
    [
      4,
      4,
      4,
      4,
      4,
      4, //BACK
      4,
      4,
      4,
    ],
    [
      3,
      3,
      3,
      5,
      5,
      5, //DOWN
      5,
      5,
      5,
    ],
  ]);
});
test("StepF'", () => {
  cube.step(9);
  expect(cube.game).toHaveProperty("state", [
    [
      0,
      0,
      0,
      0,
      0,
      0, //UP
      3,
      3,
      3,
    ],
    [
      1,
      1,
      0,
      1,
      1,
      0, //LEFT
      1,
      1,
      0,
    ],
    [
      2,
      2,
      2,
      2,
      2,
      2, //FRONT
      2,
      2,
      2,
    ],
    [
      5,
      3,
      3,
      5,
      3,
      3, //RIGHT
      5,
      3,
      3,
    ],
    [
      4,
      4,
      4,
      4,
      4,
      4, //BACK
      4,
      4,
      4,
    ],
    [
      1,
      1,
      1,
      5,
      5,
      5, //DOWN
      5,
      5,
      5,
    ],
  ]);
});
test("StepB", () => {
  cube.step(10);
  expect(cube.game).toHaveProperty("state", [
    [
      3,
      3,
      3,
      0,
      0,
      0, //UP
      0,
      0,
      0,
    ],
    [
      0,
      1,
      1,
      0,
      1,
      1, //LEFT
      0,
      1,
      1,
    ],
    [
      2,
      2,
      2,
      2,
      2,
      2, //FRONT
      2,
      2,
      2,
    ],
    [
      3,
      3,
      5,
      3,
      3,
      5, //RIGHT
      3,
      3,
      5,
    ],
    [
      4,
      4,
      4,
      4,
      4,
      4, //BACK
      4,
      4,
      4,
    ],
    [
      5,
      5,
      5,
      5,
      5,
      5, //DOWN
      1,
      1,
      1,
    ],
  ]);
});
test("StepB'", () => {
  cube.step(11);
  expect(cube.game).toHaveProperty("state", [
    [
      1,
      1,
      1,
      0,
      0,
      0, //UP
      0,
      0,
      0,
    ],
    [
      5,
      1,
      1,
      5,
      1,
      1, //LEFT
      5,
      1,
      1,
    ],
    [
      2,
      2,
      2,
      2,
      2,
      2, //FRONT
      2,
      2,
      2,
    ],
    [
      3,
      3,
      0,
      3,
      3,
      0, //RIGHT
      3,
      3,
      0,
    ],
    [
      4,
      4,
      4,
      4,
      4,
      4, //BACK
      4,
      4,
      4,
    ],
    [
      5,
      5,
      5,
      5,
      5,
      5, //DOWN
      3,
      3,
      3,
    ],
  ]);
});
