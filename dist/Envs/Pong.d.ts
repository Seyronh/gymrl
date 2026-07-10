import type { Observation, Info, Done, Reward } from "../Env";
import { Env } from "../Env";
declare class Pong extends Env {
    private player;
    private difficulty;
    private player1;
    private player2;
    private ball;
    private balldir;
    /**
     * Initializes the pong match with the specified player as the agent.
     */
    constructor(player: boolean, difficulty?: number);
    /**
     * Generates a random action between 0 and 1 for the pong match.
     *
     * @return {number} The randomly selected action.
     */
    sampleAction(): number;
    /**
     * Executes a step in the pong match based on the given action.
     *
     * @param {number} action - The action to be taken in the game.
     * @return {Array} An array containing the observation, reward, done flag, and info.
     */
    step(action: number): [Observation, Reward, Done, Info];
    /**
     * Process the ball's movement in the Pong game.
     *
     * @return {undefined} This function does not return a value.
     */
    processball(): void;
    /**
     * Returns the observation of the current state of the game.
     *
     * @return {Array<Array<number>>} An array containin 6 values representing the state.
     */
    get_obs(): number[];
    /**
     * Resets the game state to its initial configuration.
     *
     * @return {Array} An array containing the observation and information after the reset.
     */
    reset(): [Observation, Info];
    /**
     * Renders the current match state to the console.
     *
     * @return {void} This function does not return a value.
     */
    render(): void;
}
export default Pong;
