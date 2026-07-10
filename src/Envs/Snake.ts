import { Env } from "../Env";
import type { Observation, Info, Done, Reward } from "../Env";
import { SnakeGame } from "../Games/Snake";

class Snake extends Env {
  private game: SnakeGame;

  /**
   * Initializes a new instance of the Snake class.
   *
   * @param {number} [size=10] - The size of the map. Defaults to 10.
   */
  constructor(size = 10) {
    super([8], 4);
    this.game = new SnakeGame(size);
    this.reset();
  }
  /**
   * Executes a step in the Snake game based on the given action.
   *
   * @param {number} accion - The action to be taken in the game.
   * @return {Array} An array containing the observation, reward, done flag, and info.
   */
  step(accion: number): [Observation, Reward, Done, Info] {
    return this.game.step(accion);
  }

  /**
   * Returns the observation of the current state of the game.
   *
   * @return {Array} The observation of the current state of the game.
   */
  get_obs(): Observation {
    return this.game.state;
  }
  /**
   * Resets the state of the Snake game.
   *
   * @return {Array} An array containing the observation and information after the reset.
   */
  reset(): [Observation, Info] {
    return this.game.reset();
  }
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
  render() {
    this.game.render();
  }
}
export default Snake;
