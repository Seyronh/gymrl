import { Env } from "../Env";
import type { Observation, Info, Done, Reward } from "../Env";
declare class Frozenlake extends Env {
    private is_slippery;
    private desc;
    private map_name;
    private height;
    private width;
    private state;
    private playerx;
    private playery;
    private goalx;
    private goaly;
    /**
     * Converts a 2D array of characters into a 1D array of integers.
     *
     * @param {string[][]} state - The 2D array of characters to be converted.
     * @return {number[]} The converted 1D array of integers.
     */
    static TextToInt(state: string[]): number[];
    /**
     * Initializes a new instance of the Frozenlake enviroment.
     *
     * @param {Object} desc - custom map
     * @param {string} map_name - name of the map 4x4 or 8x8 (when not using a custom map)
     * @param {boolean} is_slippery - whether the ground is slippery or not
     * @return {void}
     */
    constructor(desc: string[], map_name: string, is_slippery: boolean);
    /**
     * Generates a random action between 0 and 3.
     *
     * @return {number} The randomly selected action.
     */
    sampleAction(): number;
    /**
     * Executes a step in the Frozenlake environment based on the given action.
     *
     * @param {number} action - The action to be taken in the environment.
     * @return {Array} An array containing the observation, reward, done flag, and info.
     */
    step(action: number): [Observation, Reward, Done, Info];
    /**
     * Moves the player in the environment based on the given action.
     *
     * @param {number} action - The action to be taken for the player movement.
     */
    private move;
    /**
     * Returns the observation of the current state of the game.
     *
     * @return {Array<number>} An array containing the observation of the current state of the game.
     */
    get_obs(): Observation;
    /**
     * Calculates the distance between the player and the goal.
     *
     * @return {Array<number>} An array containing the distance between the player and the goal.
     */
    get_info(): number[];
    /**
     * Resets the state of the game.
     *
     * @return {Array<Array<number>>} An array containing the observation and information of the current state.
     */
    reset(): [Observation, Info];
    /**
     * Renders the current state of the environment to the console.
     *
     * @return {void} This function does not return a value.
     */
    render(): void;
}
export default Frozenlake;
