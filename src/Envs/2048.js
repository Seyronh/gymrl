const game = require('2048game')
class TwoThousandfortyeight {
    /**
     * Initializes a new instance of the TwoThousandfortyeight enviroment.
     *
     * @return {void} 
     */
    constructor(){
        this.observation_shape = [16];
        this.action_size = 4;
        this.lastscore = 0;
        this.match = new game.partida(false)
        this.reset();
    }
    /**
     * Generates a random action between 0 and 3.
     *
     * @return {number} The randomly selected action.
     */
    static sampleAction(){
        return Math.floor(Math.random()*4);
    }
    /**
     * Executes a step in the game based on the given action.
     *
     * @param {number} action - The action to be taken in the game.
     * @return {Array} An array containing the updated observation, reward, completion status, and information.
     */
    step(action){
        let actions = ["arriba","abajo","izquierda","derecha"]
        let mov = this.match.mover(actions[action]);
        let obs = this.get_obs()
        let reward = this.match.puntuacion-this.lastscore;
        let max = Math.max(...obs)
        if(obs.indexOf(max) == 0 || obs.indexOf(max) == 3 || obs.indexOf(max) == 12 || obs.indexOf(max) == 15){
            reward += 100;
        }
        let done = mov == `Has perdido porfavor reinicia la partida.` || mov == `Has ganado porfavor reinicia la partida.`
        let info = this.get_info()
        this.lastscore = this.match.puntuacion;
        return [obs,reward,done,info]
    }
    /**
     * Returns the observation of the current state of the game.
     *
     * @return {Array} The observation of the current state of the game.
     */
    get_obs(){
        return this.match.estado(true);
    }
    /**
     * Returns an empty array.
     *
     * @return {Array} An empty array.
     */
    get_info(){
        return [];
    }
    /**
     * Resets the game state to its initial configuration.
     *
     * @return {Array} An array containing the observation and information after the reset.
     */
    reset(){
        this.match.reiniciar();
        return [this.get_obs(),this.get_info()]
    }
    /**
     * Renders the current state of the game.
     *
     * @return {void} This function does not return a value.
     */
    render(){
        console.log(this.match.estado(false))
    }
}
export default TwoThousandfortyeight;