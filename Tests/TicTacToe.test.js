//TODO
import {TicTacToe} from '../dist/index.js'
import {expect, test} from "bun:test";

test("Constructor",() => {
    let game = new TicTacToe(false);
    expect(game.state).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    expect(game.turn).toBe(0);
    expect(game.player).toBe(1);
    game = new TicTacToe(true);
    expect(game.player).toBe(2);
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
        let game = new TicTacToe(false);
        game.step(i);
        expect(game.state).toEqual([[ i==0 ? 1 : 0, i==1 ? 1 : 0, i==2 ? 1 : 0 ], [ i==3 ? 1 : 0, i==4 ? 1 : 0, i==5 ? 1 : 0 ], [ i==6 ? 1 : 0,i==7 ? 1 : 0,i==8 ? 1 : 0]])
    }
})
test("StepTaken",() => {
    for(let i = 0;i<9;i++){
        let game = new TicTacToe(false);
        game.step(i);
        game.step(i);
        expect(game.state).toEqual([[ i==0 ? 1 : 0, i==1 ? 1 : 0, i==2 ? 1 : 0 ], [ i==3 ? 1 : 0, i==4 ? 1 : 0, i==5 ? 1 : 0 ], [ i==6 ? 1 : 0,i==7 ? 1 : 0,i==8 ? 1 : 0]])
    }
})
test("Reset",() => {
    let game = new TicTacToe(false);
    let i = TicTacToe.sampleAction()
    game.step(i);
    game.reset()
    expect(game.state).not.toEqual([[ i==0 ? 1 : 0, i==1 ? 1 : 0, i==2 ? 1 : 0 ], [ i==3 ? 1 : 0, i==4 ? 1 : 0, i==5 ? 1 : 0 ], [ i==6 ? 1 : 0,i==7 ? 1 : 0,i==8 ? 1 : 0]])
})