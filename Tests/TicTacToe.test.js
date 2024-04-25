import {TicTacToe} from '../dist/index.js'
import {expect, test,beforeEach} from "bun:test";

let game;
beforeEach(() => {
    game = new TicTacToe(false);
  });

test("Constructor",() => {
    expect(game).toHaveProperty('state',[[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    expect(game).toHaveProperty('turn',0);
    expect(game).toHaveProperty('player',1);
    game = new TicTacToe(true);
    expect(game).toHaveProperty('player',2);
})

test("SampleAction",() => {
    for(let i = 0;i<20;i++){
        let action = TicTacToe.sampleAction();
        expect(action).toBeLessThan(9)
        expect(action).toBeGreaterThanOrEqual(0)
    }
})
test("StepBlank",() => {
    for(let i = 0;i<9;i++){
        game = new TicTacToe(false);
        game.step(i);
        expect(game).toHaveProperty('state',[[ i==0 ? 1 : 0, i==1 ? 1 : 0, i==2 ? 1 : 0 ], [ i==3 ? 1 : 0, i==4 ? 1 : 0, i==5 ? 1 : 0 ], [ i==6 ? 1 : 0,i==7 ? 1 : 0,i==8 ? 1 : 0]])
    }
})
test("StepTaken",() => {
    for(let i = 0;i<9;i++){
        game = new TicTacToe(false);
        game.step(i);
        game.step(i);
        expect(game).toHaveProperty('state',[[ i==0 ? 1 : 0, i==1 ? 1 : 0, i==2 ? 1 : 0 ], [ i==3 ? 1 : 0, i==4 ? 1 : 0, i==5 ? 1 : 0 ], [ i==6 ? 1 : 0,i==7 ? 1 : 0,i==8 ? 1 : 0]])
    }
})
test("Reset",() => {
    let i = TicTacToe.sampleAction()
    game.step(i);
    game.reset();
    expect(game).toHaveProperty('state',[[0, 0, 0], [0, 0, 0], [0, 0, 0]])
})
test("CheckWinRow",() => {
    game.step(0);
    game.step(3);
    game.step(1);
    game.step(4);
    game.step(2);
    expect(game.get_info()).toEqual([1]);
})

test("CheckWinColumn",() => {
    game.step(0);
    game.step(1);
    game.step(3);
    game.step(2);
    game.step(6);
    expect(game.get_info()).toEqual([1]);
})

test("CheckWinDiagonal",() => {
    game.step(0);
    game.step(1);
    game.step(4);
    game.step(2);
    game.step(8);
    expect(game.get_info()).toEqual([1]);
})

test("CheckDraw",() => {
    game.step(0);
    game.step(1);
    game.step(2);
    game.step(3);
    game.step(5);
    game.step(6);
    game.step(7);
    game.step(8);
    game.step(4);
    expect(game.get_info()).toEqual(['Draw']);
})