import { Env } from "../Env";
import type { Observation, Info, Done, Reward } from "../Env";
declare class TwoThousandfortyeight extends Env {
    private lastscore;
    private match;
    /**
     * Initializes a new instance of the TwoThousandfortyeight enviroment.
     *
     * @return {void}
     */
    constructor();
    /**
     * Generates a random action between 0 and 3.
     *
     * @return {number} The randomly selected action.
     */
    sampleAction(): number;
    /**
     * Executes a step in the game based on the given action.
     *
     * @param {number} action - The action to be taken in the game.
     * @return {Array} An array containing the updated observation, reward, completion status, and information.
     */
    step(action: number): [Observation, Reward, Done, Info];
    /**
     * Returns the observation of the current state of the game.
     *
     * @return {Array} The observation of the current state of the game.
     */
    get_obs(): Observation;
    /**
     * Resets the game state to its initial configuration.
     *
     * @return {Array} An array containing the observation and information after the reset.
     */
    reset(): [Observation, Info];
    /**
     * Renders the current state of the game.
     *
     * @return {void} This function does not return a value.
     */
    render(): void;
}
export default TwoThousandfortyeight;
