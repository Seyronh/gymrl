import { Env } from "../Env";
import type { Observation, Info, Done, Reward } from "../Env";
type TictacToeStatus = 1 | 2 | "In progress" | "Draw";
declare class TicTacToe extends Env {
    private player;
    private turn;
    private state;
    /**
     * Determines the status of the Tic-Tac-Toe board.
     *
     * @param {Array<Array<0 | 1 | 2>>} board - The Tic-Tac-Toe board.
     * @return {TictacToeStatus} The winner of the game, or 'In progress' if the game is still ongoing, or 'Draw' if the game is a draw.
     */
    static Status(board: Array<Array<0 | 1 | 2>>): TictacToeStatus;
    /**
     * Converts the state array into a one-hot encoded format.
     *
     * @param {Array<number>} state - The input state array.
     * @return {Array<Array<number>>} An array containing three one-hot encoded arrays for X, O, and empty spaces.
     */
    static OneHot(state: Array<Array<number>>): Array<Array<number>>;
    /**
     * Initializes the TicTacToe game with the specified player.
     *
     * @param {boolean} player - Represents the player, where false is player X and true is player O (This just affects the rewards).
     */
    constructor(player: boolean);
    /**
     * Generates a random action between 0 and 8 for the Tic-Tac-Toe game.
     *
     * @return {number} The randomly selected action.
     */
    sampleAction(): number;
    /**
     * Executes a step in the Tic-Tac-Toe game based on the given action.
     *
     * @param {number} action - The action to be taken in the game.
     * @return {Array} An array containing the observation, reward, done flag, and info.
     */
    step(action: number): [Observation, Reward, Done, Info];
    /**
     * Returns the observation of the current state of the game.
     *
     * @return {Array<Array<number>>} An array containing three one-hot encoded arrays for X, O, and empty spaces.
     */
    get_obs(): Array<Array<number>>;
    /**
     * Returns an array containing the status of the current state of the game.
     *
     * @return {Array<string|number>} An array with a single element, which is the status of the game.
     *                                The status can be 'In progress', 'Draw', or the winner player number (1 or 2).
     */
    get_info(): TictacToeStatus[];
    /**
     * Resets the game state to its initial configuration.
     *
     * @return {Array} An array containing the observation and information after the reset.
     */
    reset(): [Observation, Info];
    /**
     * Renders the current state of the Tic-Tac-Toe board to the console.
     *
     * @return {void} This function does not return a value.
     */
    render(): void;
}
export default TicTacToe;
