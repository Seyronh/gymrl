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
        let stepinfo = game.step(i);
        expect(stepinfo[2]).toBe(false);
        expect(game).toHaveProperty('state',[[ i==0 ? 1 : 0, i==1 ? 1 : 0, i==2 ? 1 : 0 ], [ i==3 ? 1 : 0, i==4 ? 1 : 0, i==5 ? 1 : 0 ], [ i==6 ? 1 : 0,i==7 ? 1 : 0,i==8 ? 1 : 0]])
    }
})
test("StepTaken",() => {
    for(let i = 0;i<9;i++){
        game = new TicTacToe(false);
        let stepinfo = game.step(i);
        expect(stepinfo[2]).toBe(false);
        game.step(i);
        expect(game).toHaveProperty('state',[[ i==0 ? 1 : 0, i==1 ? 1 : 0, i==2 ? 1 : 0 ], [ i==3 ? 1 : 0, i==4 ? 1 : 0, i==5 ? 1 : 0 ], [ i==6 ? 1 : 0,i==7 ? 1 : 0,i==8 ? 1 : 0]])
    }
})
test("Reset",() => {
    let i = TicTacToe.sampleAction()
    let stepinfo = game.step(i);
    expect(stepinfo[2]).toBe(false);
    game.reset();
    expect(game).toHaveProperty('state',[[0, 0, 0], [0, 0, 0], [0, 0, 0]])
})
test("CheckWinRow",() => {
    let stepinfo = game.step(0);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(3);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(1);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(4);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(2);
    expect(game.get_info()).toEqual([1]);
    expect(stepinfo[2]).toBe(true);
})

test("CheckWinColumn",() => {
    let stepinfo = game.step(0);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(1);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(3);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(2);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(6);
    expect(game.get_info()).toEqual([1]);
    expect(stepinfo[2]).toBe(true);
})

test("CheckWinDiagonal",() => {
    let stepinfo = game.step(0);
    expect(stepinfo[2]).toBe(false);
    stepinfo =game.step(1);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(4);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(2);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(8);
    expect(game.get_info()).toEqual([1]);
    expect(stepinfo[2]).toBe(true);
})

test("CheckDraw",() => {
    let stepinfo = game.step(0);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(1);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(2);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(3);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(5);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(6);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(7);
    expect(stepinfo[2]).toBe(false);
    stepinfo = game.step(8);
    expect(stepinfo[2]).toBe(false);
    stepinfo =game.step(4);
    expect(stepinfo[2]).toBe(true);
    expect(game.get_info()).toEqual(['Draw']);
})