import { Pong } from "../src/index.ts";
import { expect, test, beforeEach } from "bun:test";

type PongTest = Omit<Pong, "balldir" | "ball"> & {
  balldir: number[];
  ball: number[];
};
let game: PongTest;

beforeEach(() => {
  game = new Pong(false) as unknown as PongTest;
});

test("Constructor", () => {
  expect(game).toHaveProperty("player1", [0, 5]);
  expect(game).toHaveProperty("player2", [10, 5]);
  expect(game).toHaveProperty("ball", [5, 5]);
  expect(game).toHaveProperty("player", 0);
  expect(game).toHaveProperty("difficulty", 0.2);
});

test("ProcessBall", () => {
  game.balldir = [-1, -1];
  let ball = game.ball;
  game.processball();
  expect(game).toHaveProperty("ball", [ball[0] - 1, ball[1] - 1]);
  game.balldir = [-1, 1];
  ball = game.ball;
  game.processball();
  expect(game).toHaveProperty("ball", [ball[0] - 1, ball[1] + 1]);
  game.balldir = [1, -1];
  ball = game.ball;
  game.processball();
  expect(game).toHaveProperty("ball", [ball[0] + 1, ball[1] - 1]);
  game.balldir = [1, 1];
  ball = game.ball;
  game.processball();
  expect(game).toHaveProperty("ball", [ball[0] + 1, ball[1] + 1]);
});
