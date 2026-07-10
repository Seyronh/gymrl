import { Env } from "../Env";
import type { Observation, Info, Done, Reward } from "../Env";
import { RubikGame } from "../Games/Rubik";
class Rubik extends Env {
  private game: RubikGame;
  /**
   * Initializes the Rubik Cube with the specified random moves applied.
   */
  constructor(moves: number) {
    super([6, 9], 12);
    this.game = new RubikGame(moves);
    this.reset();
  }
  /**
   * Executes a step in the Rubik Cube game based on the given action.
   *
   * @param {number} action - The action to be taken in the game.
   * @return {Array} An array containing the observation, reward, done flag, and info.
   */
  step(action: number): [Observation, Reward, Done, Info] {
    this.game.execute(action);
    let reward = 0;
    const correctfaces = this.game.state
      .map((rowArr, index) => {
        return rowArr.every((val) => val === rowArr[index]);
      })
      .filter((e) => e == true).length;
    let done = correctfaces == 6;

    if (!done && this.game.getRemainingSteps() == 0) {
      done = true;
      reward = -1;
    } else if (done) {
      reward = 1;
    }
    const info = this.get_info();
    return [this.get_obs(), reward, done, info];
  }
  /**
   * Returns the observation of the current state of the game.
   *
   * @return {Array<Array<number>>} An array containing 6 arrays of 9 numbers representing the current state of the game.
   */
  get_obs(): Observation {
    return this.game.state;
  }
  /**
   * Returns an array containing the remaining steps until stop.
   *
   * @return {Array<string|number>} An array with a single element.
   */
  override get_info(): Info {
    return [this.game.getRemainingSteps()];
  }
  /**
   * Resets the game state to its initial configuration.
   *
   * @return {Array} An array containing the observation and information after the reset.
   */
  reset(): [Observation, Info] {
    this.game.reset();
    return [this.get_obs(), this.get_info()];
  }
  /**
   * Renders the current state of the Rubik cube to the console.
   *
   * @return {void} This function does not return a value.
   */
  render() {
    this.game.render();
  }
}
export default Rubik;
