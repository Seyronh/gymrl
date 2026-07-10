import { Env } from "../Env";
import type { Observation, Info, Done, Reward } from "../Env";
declare class Snake extends Env {
    private size;
    private doublesize;
    private position;
    private positionApple;
    private state;
    private longitud;
    private visitados;
    /**
     * Initializes a new instance of the Snake class.
     *
     * @param {number} [size=10] - The size of the map. Defaults to 10.
     */
    constructor(size?: number);
    /**
     * Generates a random action between 0 and 3 for the Snake game.
     *
     * @return {number} The randomly selected action.
     */
    sampleAction(): number;
    /**
     * Executes a step in the Snake game based on the given action.
     *
     * @param {number} accion - The action to be taken in the game.
     * @return {Array} An array containing the observation, reward, done flag, and info.
     */
    step(accion: number): [Observation, Reward, Done, Info];
    private outside;
    /**
     * Calculates the observations for the current state of the game.
     *
     * @return {Array} An array containing the observations for the game state.
     *                 The array has the following elements:
     *                 - dangerBelow: A number between 0 and 1 indicating the danger from below.
     *                 - dangerAbove: A number between 0 and 1 indicating the danger from above.
     *                 - dangerRight: A number between 0 and 1 indicating the danger from the right.
     *                 - dangerLeft: A number between 0 and 1 indicating the danger from the left.
     *                 - foodNorth: A number indicating the presence of food in the north (1) or not (0).
     *                 - foodSouth: A number indicating the presence of food in the south (1) or not (0).
     *                 - foodeast: A number indicating the presence of food in the east (1) or not (0).
     *                 - foodwest: A number indicating the presence of food in the west (1) or not (0).
     */
    get_obs(): number[];
    /**
     * Generates a random position for the apple in the game board.
     *
     * @param {Array} [newpos] - Optional. The initial position of the apple.
     * @return {void} This function does not return a value.
     */
    private generateApple;
    /**
     * A function that calculates the available free cells around the current position.
     *
     * @param {Array} position - The current position to check for free cells.
     * @return {Array} An array containing the count of free cells in each direction.
     */
    private free;
    /**
     * Calculates the number of free cells around a given position.
     *
     * @param {Array} position - The position to check for free cells.
     * @return {number} The number of free cells around the given position.
     */
    private freeCell;
    /**
     * Resets the state of the Snake game.
     *
     * @return {Array} An array containing the observation and information after the reset.
     */
    reset(): [Observation, Info];
    /**
     * Renders the game board for the Snake game.
     *
     * This function generates a string representation of the game board
     * for the Snake game. It iterates over the state array, which represents
     * the game board, and builds a string with the appropriate characters
     * to represent the snake, empty spaces, obstacles, and the apple.
     * The resulting string is printed to the console.
     *
     * @return {void} This function does not return a value.
     */
    render(): void;
}
export default Snake;
