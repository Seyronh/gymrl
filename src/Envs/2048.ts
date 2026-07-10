// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import game from "2048game";
import { Env } from "../Env";
import type { Observation, Info, Done, Reward } from "../Env";
class TwoThousandfortyeight extends Env {
  private lastscore: number;
  private match: game.partida;
  /**
   * Initializes a new instance of the TwoThousandfortyeight enviroment.
   *
   * @return {void}
   */
  constructor() {
    super([16], 4);
    this.lastscore = 0;
    this.match = new game.partida(false);
    this.reset();
  }
  /**
   * Executes a step in the game based on the given action.
   *
   * @param {number} action - The action to be taken in the game.
   * @return {Array} An array containing the updated observation, reward, completion status, and information.
   */
  step(action: number): [Observation, Reward, Done, Info] {
    const actions = ["arriba", "abajo", "izquierda", "derecha"];
    const mov = this.match.mover(actions[action]);
    const obs = this.get_obs();
    const reward = this.match.puntuacion - this.lastscore;
    const done =
      mov == `Has perdido porfavor reinicia la partida.` ||
      mov == `Has ganado porfavor reinicia la partida.`;
    const info = this.get_info();
    this.lastscore = this.match.puntuacion;
    return [obs, reward, done, info];
  }
  /**
   * Returns the observation of the current state of the game.
   *
   * @return {Array} The observation of the current state of the game.
   */
  get_obs(): Observation {
    return this.match.estado(true);
  }
  /**
   * Resets the game state to its initial configuration.
   *
   * @return {Array} An array containing the observation and information after the reset.
   */
  reset(): [Observation, Info] {
    this.match.reiniciar();
    return [this.get_obs(), this.get_info()];
  }
  /**
   * Renders the current state of the game.
   *
   * @return {void} This function does not return a value.
   */
  render() {
    console.log(this.match.estado(false));
  }
}
export default TwoThousandfortyeight;
