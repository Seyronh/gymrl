import {Pong} from '../dist/index.js'
import {expect, test,beforeEach} from "bun:test";

let game

beforeEach(() => {
    game = new Pong();
})

test("Constructor",() => {
    expect(game).toHaveProperty('player1',[0,5]);
    expect(game).toHaveProperty('player2',[10,5]);
    expect(game).toHaveProperty('ball',[5,5]);
    expect(game).toHaveProperty('player',0);
    expect(game).toHaveProperty('difficulty',0.2);
})

test("ProcessBall",() => {
    game.balldir = [-1,-1]
    let ball = game.ball;
    game.processball();
    expect(game).toHaveProperty('ball',[ball[0]-1,ball[1]-1]);
    game.balldir = [-1,1];
    ball = game.ball;
    game.processball();
    expect(game).toHaveProperty('ball',[ball[0]-1,ball[1]+1]);
    game.balldir = [1,-1]
    ball = game.ball;
    game.processball();
    expect(game).toHaveProperty('ball',[ball[0]+1,ball[1]-1]);
    game.balldir = [1,1]
    ball = game.ball;
    game.processball();
    expect(game).toHaveProperty('ball',[ball[0]+1,ball[1]+1]);
})