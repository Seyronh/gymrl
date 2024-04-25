const {Game} = require('four-in-a-row')
class Fourinarow {
    /**
     * Initializes a new instance of the Fourinarow enviroment.
     *
     * @return {void} 
     */
    constructor(){
        this.observation_shape = [6,7];
        this.action_size = 7;
        this.match = new Game();
        this.reset();
    }
    /**
     * Generates a random action between 0 and 6.
     *
     * @return {number} The randomly selected action.
     */
    static sampleAction(){
        return Math.floor(Math.random()*7);
    }
    /**
     * Executes a step based on the given action.
     *
     * @param {number} action - The action to be taken.
     * @return {Array} An array containing the updated observation, reward, completion status, and information.
     */
    step(action){
        const moveResult = this.match.playMove(action);
        let obs = this.get_obs()
        let reward = 0;
        if(moveResult.status == "invalid"){
            reward -= 1;
        } else if(moveResult.status == "win"){
            reward += 1;
        }
        let done = moveResult.status == "draw" || moveResult.status == "win";
        let info = this.get_info()
        return [obs,reward,done,info]
    }
    /**
     * Returns an array of arrays representing the current state of the game board.
     *
     * @return {Array<Array<number>>} An array of arrays, where each inner array contains the values of a row on the game board.
     */
    get_obs(){
        return this.match.currentBoard.map(e => Object.values(e));
    }
    /**
     * Returns an array containing the status and current turn of the match.
     *
     * @return {Array<string, number>} An array with two elements: the status of the match (string) and the current turn (number).
     */
    get_info(){
        return [this.match.status,this.match.currentTurn];
    }
    /**
     * Resets the game state to its initial configuration.
     *
     * @return {Array} An array containing the observation and information after the reset.
     */
    reset(){
        this.match.reset();
        return [this.get_obs(),this.get_info()]
    }
    /**
     * Renders the current state of the game board to the console.
     *
     * @return {void} This function does not return a value.
     */
    render(){
        let result = "";
        let status = this.get_obs();
        for(let y = 0;y<status.length;y++){
            let line = "";
            for(let x = 0;x<status[y].length;x++){
                if(status[y][x] == 0){
                    line += "⚪";
                } else if(status[y][x] == 1){
                    line += "🟡";
                } else {
                    line += "🔴";
                }
            }
            result += line+"\n";
        }
        result += "-----------------";
        console.log(result)
    }
}
export default Fourinarow;