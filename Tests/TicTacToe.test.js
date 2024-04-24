//TODO
import {TicTacToe} from '../dist/index.js'
import {expect, test} from "bun:test";

test("Constructor",() => {
    const game = new TicTacToe(false);
    expect(game.state).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    expect(game.turn).toBe(0);
    expect(game.player).toBe(0);
})