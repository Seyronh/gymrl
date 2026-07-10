// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Observation = Array<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Info = Array<any>;
type Done = boolean;
type Reward = number;

abstract class Env {
  readonly observation_shape: Array<number>;
  readonly action_size: number;
  constructor(observation_shape: Array<number> = [], action_size: number = 0) {
    this.observation_shape = observation_shape;
    this.action_size = action_size;
  }
  /**
   * Generates a random valid action for the environment.
   *
   * @return {number} The randomly selected action.
   */
  sampleAction(): number {
    return Math.floor(Math.random() * this.action_size);
  }
  /**
   * Executes a step in the game based on the given action.
   *
   * @param {number} action - The action to be taken in the game.
   * @return {Array} An array containing the updated observation, reward, completion status, and information.
   */
  abstract step(action: number): [Observation, Reward, Done, Info];
  /**
   * Returns the observation of the current state of the game.
   *
   * @return {Array} The observation of the current state of the game.
   */
  abstract get_obs(): Observation;
  /**
   * Returns additional information about the current state of the game.
   *
   * @return {Array} An array containing the additional information.
   */
  get_info(): Info {
    return [];
  }
  /**
   * Resets the game state to its initial configuration.
   *
   * @return {Array} An array containing the observation and information after the reset.
   */
  abstract reset(): [Observation, Info];
  /**
   * Renders the current state of the game.
   *
   * @return {void} This function does not return a value.
   */
  abstract render(): void;
}

export { Env };
export type { Observation, Info, Done, Reward };
