import type { Observation, Info, Done, Reward } from "../../Env";

class SnakeGame {
  private size: number;
  private doublesize: number;
  private position: [number, number] = [0, 0];
  private positionApple: [number, number] | null = null;
  public state: Array<Array<number>> = [];
  private longitud: number = 1;
  private visitados: Array<[number, number]> = [];

  /**
   * Initializes a new instance of the Snake class.
   *
   * @param {number} [size=10] - The size of the map. Defaults to 10.
   */
  constructor(size = 10) {
    this.size = size;
    this.doublesize = this.size * this.size;
    this.reset();
  }
  /**
   * Executes a step in the Snake game based on the given action.
   *
   * @param {number} accion - The action to be taken in the game.
   * @return {Array} An array containing the observation, reward, done flag, and info.
   */
  step(accion: number): [Observation, Reward, Done, Info] {
    let result = 0;
    const newpos = [...this.position] as [number, number];
    if (accion == 0) {
      //arriba
      newpos[1]--;
    } else if (accion == 1) {
      //abajo
      newpos[1]++;
    } else if (accion == 2) {
      //derecha
      newpos[0]++;
    } else {
      //izquierda
      newpos[0]--;
    }
    if (this.outside(newpos) || this.state[newpos[1]]![newpos[0]]! > 0)
      result = -1;
    if (result != -1 && this.state[newpos[1]]![newpos[0]] == -1) {
      this.state[newpos[1]]![newpos[0]] = 0;
      this.longitud++;
      this.generateApple(newpos);
      result = 1;
    }
    if (result != -1) {
      this.state = this.state.map((f) => {
        return f.map((e) => {
          if (e == -1) return -1;
          if (e == 0) return 0;
          if (result == 1) {
            return e;
          }
          return e - 1;
        });
      });
      this.state[this.position[1]]![this.position[0]] = this.longitud;
      this.position = newpos;
    }
    return [this.get_obs(), result, result == -1, this.get_info()];
  }
  private outside(position: [number, number]): boolean {
    if (
      position[0] < 0 ||
      position[1] < 0 ||
      position[0] > this.size - 1 ||
      position[1] > this.size - 1
    )
      return true;
    return false;
  }

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
  get_obs() {
    const dangers = this.free();
    const dangerabove = dangers[2] == 0 ? 1 : 1 - dangers[2] / this.doublesize;
    const dangerbelow = dangers[3] == 0 ? 1 : 1 - dangers[3] / this.doublesize;
    const dangerright = dangers[1] == 0 ? 1 : 1 - dangers[1] / this.doublesize;
    const dangerleft = dangers[0] == 0 ? 1 : 1 - dangers[0] / this.doublesize;

    const foodnorth =
      this.positionApple && this.positionApple[1] < this.position[1] ? 1 : 0;
    const foodsouth =
      this.positionApple && this.positionApple[1] > this.position[1] ? 1 : 0;
    const foodeast =
      this.positionApple && this.positionApple[0] > this.position[0] ? 1 : 0;
    const foodwest =
      this.positionApple && this.positionApple[0] < this.position[0] ? 1 : 0;
    return [
      dangerbelow,
      dangerabove,
      dangerright,
      dangerleft,
      foodnorth,
      foodsouth,
      foodeast,
      foodwest,
    ];
  }
  /**
   * Generates a random position for the apple in the game board.
   *
   * @param {Array} [newpos] - Optional. The initial position of the apple.
   * @return {void} This function does not return a value.
   */
  private generateApple(newpos: [number, number] | undefined) {
    let x = Math.floor(Math.random() * this.size);
    let y = Math.floor(Math.random() * this.size);
    if (newpos == undefined) newpos = this.position;
    while (
      this.state[y]![x] !== 0 ||
      (x == newpos[0] && y == newpos[1]) ||
      (x == this.position[0] && y == this.position[1])
    ) {
      x = Math.floor(Math.random() * this.size);
      y = Math.floor(Math.random() * this.size);
    }
    this.state[y]![x] = -1;
    this.positionApple = [x, y];
  }
  /**
   * A function that calculates the available free cells around the current position.
   *
   * @param {Array} position - The current position to check for free cells.
   * @return {Array} An array containing the count of free cells in each direction.
   */
  private free(): [number, number, number, number] {
    const free = [0, 0, 0, 0] as [number, number, number, number];
    this.visitados = [this.position];
    free[0] = this.freeCell([this.position[0] - 1, this.position[1]]); //izquierda
    this.visitados = [this.position];
    free[1] = this.freeCell([this.position[0] + 1, this.position[1]]); //derecha
    this.visitados = [this.position];
    free[2] = this.freeCell([this.position[0], this.position[1] - 1]); //arriba
    this.visitados = [this.position];
    free[3] = this.freeCell([this.position[0], this.position[1] + 1]); //abajo
    return free;
  }
  /**
   * Calculates the number of free cells around a given position.
   *
   * @param {Array} position - The position to check for free cells.
   * @return {number} The number of free cells around the given position.
   */
  private freeCell(position: [number, number]): number {
    let free = 0;
    if (this.outside(position)) return free;
    if (
      this.state[position[1]]![position[0]]! <= 0 &&
      !this.visitados.some((p) => p[0] == position[0] && p[1] == position[1])
    ) {
      free += 1;
      this.visitados.push(position);
      free += this.freeCell([position[0] - 1, position[1]]); //izquierda
      free += this.freeCell([position[0] + 1, position[1]]); //derecha
      free += this.freeCell([position[0], position[1] - 1]); //arriba
      free += this.freeCell([position[0], position[1] + 1]); //abajo
    }
    return free;
  }
  /**
   * Resets the state of the Snake game.
   *
   * @return {Array} An array containing the observation and information after the reset.
   */
  reset(): [Observation, Info] {
    this.longitud = 1;
    this.state = Array.from({ length: this.size }, () =>
      Array(this.size).fill(0)
    );
    const startX = Math.floor(Math.random() * this.size);
    const startY = Math.floor(Math.random() * this.size);
    this.position = [startX, startY];
    this.visitados = [];
    this.positionApple = null;
    this.generateApple(undefined);
    return [this.get_obs(), this.get_info()];
  }
  /**
   * Returns the additional information for the current state.
   *
   * @return {Array} An empty array, matching the base Env contract.
   */
  get_info(): Info {
    return [];
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
    let result = "▛" + "▔".repeat(this.size) + "▜\n";
    for (let y = 0; y < this.state.length; y++) {
      let linea = "▍";
      for (let x = 0; x < this.state[y]!.length; x++) {
        if (x == this.position[0] && y == this.position[1]) {
          linea += "\x1b[32mO\x1b[0m";
        } else if (this.state[y]![x] == 0) {
          linea += " ";
        } else if (this.state[y]![x] == -1) {
          linea += "\x1b[31m□\x1b[0m";
        } else {
          linea += "\x1b[32m+\x1b[0m";
        }
      }
      linea += "▐";
      result += linea + "\n";
    }
    result += "▙" + "▂".repeat(this.size) + "▟\n";
    process.stdout.write(result);
  }
}
export { SnakeGame };
