import { Env } from "../Env";
import type { Observation, Info, Done, Reward } from "../Env";
declare class Fourinarow extends Env {
    private match;
    /**
     * Initializes a new instance of the Fourinarow enviroment.
     *
     * @return {void}
     */
    constructor();
    /**
     * Generates a random action between 0 and 6.
     *
     * @return {number} The randomly selected action.
     */
    sampleAction(): number;
    /**
     * Executes a step based on the given action.
     *
     * @param {number} action - The action to be taken.
     * @return {Array} An array containing the updated observation, reward, completion status, and information.
     */
    step(action: number): [Observation, Reward, Done, Info];
    /**
     * Returns an array of arrays representing the current state of the game board.
     *
     * @return {Array<Array<number>>} An array of arrays, where each inner array contains the values of a row on the game board.
     */
    get_obs(): Array<Array<number>>;
    /**
     * Returns an array containing the status and current turn of the match.
     *
     * @return {Array<string, number>} An array with two elements: the status of the match (string) and the current turn (number).
     */
    get_info(): [string, number];
    /**
     * Resets the game state to its initial configuration.
     *
     * @return {Array} An array containing the observation and information after the reset.
     */
    reset(): [Observation, Info];
    /**
     * Renders the current state of the game board to the console.
     *
     * @return {void} This function does not return a value.
     */
    render(): void;
}
export default Fourinarow;
