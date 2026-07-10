import { Env } from "../Env";
import type { Observation, Info, Done, Reward } from "../Env";
declare enum RubikColors {
    WHITE = 0,
    ORANGE = 1,
    GREEN = 2,
    RED = 3,
    BLUE = 4,
    YELLOW = 5
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
        RubikColors
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
        RubikColors
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
        RubikColors
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
        RubikColors
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
        RubikColors
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
        RubikColors
    ]
];
declare class Rubik extends Env {
    private state;
    private moves;
    private stepsTaken;
    /**
     * Initializes the Rubik Cube with the specified random moves applied.
     */
    constructor(moves: number);
    /**
     * Generates a random action between 0 and 11 for the Rubik Cube game.
     *
     * @return {number} The randomly selected action.
     */
    sampleAction(): number;
    private execute;
    /**
     * Executes a step in the Rubik Cube game based on the given action.
     *
     * @param {number} action - The action to be taken in the game.
     * @return {Array} An array containing the observation, reward, done flag, and info.
     */
    step(action: number): [Observation, Reward, Done, Info];
    /**
     * Returns the observation of the current state of the game.
     *
     * @return {Array<Array<number>>} An array containing 6 arrays of 9 numbers representing the current state of the game.
     */
    get_obs(): RubikState;
    /**
     * Returns an array containing the remaining steps until stop.
     *
     * @return {Array<string|number>} An array with a single element.
     */
    get_info(): number[];
    /**
     * Resets the game state to its initial configuration.
     *
     * @return {Array} An array containing the observation and information after the reset.
     */
    reset(): [Observation, Info];
    /**
     * Renders the current state of the Rubik cube to the console.
     *
     * @return {void} This function does not return a value.
     */
    render(): void;
}
export default Rubik;
