class Pong {
    /**
     * Initializes the pong match with the specified player as the agent.
     */
    constructor(player,difficulty=0.2){
        this.observation_shape = [6];
        this.action_size = 3;
        this.player = player ? 1 : 0;
        this.difficulty = difficulty;
        this.reset();
    }
    /**
     * Generates a random action between 0 and 1 for the pong match.
     *
     * @return {number} The randomly selected action.
     */
    static sampleAction(){
        return Math.floor(Math.random()*3);
    }
    /**
     * Executes a step in the pong match based on the given action.
     *
     * @param {number} action - The action to be taken in the game.
     * @return {Array} An array containing the observation, reward, done flag, and info.
     */
    step(action){
        if(action == 0){
            if(this.player == 0){
                this.player1[1]--
                if(this.player1[1] < 1) this.player1[1] = 1
            }
            else {
                this.player2[1]--
                if(this.player2[1] < 1) this.player2[1] = 1
            }
        } else if(action == 2){
            if(this.player == 0){
                this.player1[1]++;
                if(this.player1[1] > 9) this.player1[1] = 9
            }
            else { 
                this.player2[1]++;
                if(this.player2[1] > 9) this.player2[1] = 9
            }
        }
        if(this.player == 1){
            let right = Math.random() > 1-this.difficulty;
            if(right){
                if(this.ball[1] > this.player1[1]){
                    this.player1[1]++;
                    if(this.player1[1] > 9) this.player1[1] = 9
                } else
                if(this.ball[1] < this.player1[1]){
                    this.player1[1]--;
                    if(this.player1[1] < 1) this.player1[1] = 1
                }
            } else {
                let rng = Math.floor(Math.random() * 3);
                if(rng == 0){
                    this.player1[1]--;
                    if(this.player1[1] < 1) this.player1[1] = 1
                } else if(rng == 2){
                    this.player1[1]++;
                    if(this.player1[1] > 9) this.player1[1] = 9
                }
            }
        } else {
            let right = Math.random() > 1-this.difficulty;
            if(right){
                if(this.ball[1] > this.player2[1]){
                    this.player2[1]++;
                    if(this.player2[1] > 9) this.player2[1] = 9
                } else
                if(this.ball[1] < this.player2[1]){
                    this.player2[1]--;
                    if(this.player2[1] < 1) this.player2[1] = 1
                }
            } else {
                let rng = Math.floor(Math.random() * 3);
                if(rng == 0){
                    this.player2[1]--;
                    if(this.player2[1] < 1) this.player2[1] = 1
                } else if(rng == 2){
                    this.player1[1]++;
                    if(this.player2[1] > 9) this.player2[1] = 9
                }
            }
        }
        this.processball();
        let reward = 0;
        let done = false;
        if(this.ball[0] == 0){
            if(this.player == 0) reward -= 1;
            else reward += 1;
            done = true;
        }
        if(this.ball[0] == 10){
            if(this.player == 0) reward += 1;
            else reward -= 1;
            done = true;
        }
        return [this.get_obs(),reward,done,this.get_info()]
    }
    /**
     * Process the ball's movement in the Pong game.
     *
     * @return {undefined} This function does not return a value.
    */
    processball(){
        if(this.ball[1] == 0 || this.ball[1] == 10){
            this.balldir[1] *= -1;
        }
        if((this.ball[0]-1 == this.player1[0] && (this.ball[1] == this.player1[1] || this.ball[1] == this.player1[1]-1 || this.ball[1] == this.player1[1]+1)) || (this.ball[0]+1 == this.player2[0] && (this.ball[1] == this.player2[1] || this.ball[1] == this.player2[1]-1 || this.ball[1] == this.player2[1]+1))){
            this.balldir[0] *= -1;
        }
        this.ball = [this.ball[0]+this.balldir[0],this.ball[1]+this.balldir[1]];
    }
    /**
     * Returns the observation of the current state of the game.
     *
     * @return {Array<Array<number>>} An array containin 6 values representing the state.
     */
    get_obs(){
        return [this.player1[1],this.player2[1],this.ball[0],this.ball[1],this.balldir[0],this.balldir[1]];
    }
    /**
     * Returns an array containing the extra information about the match.
     *
     * @return {Array<string|number>} An array empty array
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
        this.player1 = [0,5];
        this.player2 = [10,5];
        this.ball = [5,5];
        let dir = Math.floor(Math.random()*4)
        if(dir == 0){
            this.balldir = [-1,-1];
        } else if(dir == 1){
            this.balldir = [-1,1];
        } else if(dir == 2){
            this.balldir = [1,-1];
        } else if(dir == 3){
            this.balldir = [1,1];
        }
        return [this.get_obs(),this.get_info()]
    }
/**
 * Renders the current state of the Tic-Tac-Toe board to the console.
 *
 * @return {void} This function does not return a value.
 */
    render(){
        let text = "";
        for(let y = 0;y<11;y++){
            let linea = "";
            for(let x = 0;x<11;x++){
                if(x == this.ball[0] && y == this.ball[1]){
                    linea += "⚪";
                } else
                if(x == this.player1[0] && (y == this.player1[1] || y == this.player1[1]+1 || y == this.player1[1]-1) || x == this.player2[0] && (y == this.player2[1] || y == this.player2[1]+1 || y == this.player2[1]-1)){
                    linea += "⬜";
                } else {
                    linea += "⬛";
                }
            }
            text += linea+"\n";
        }
        console.log(text);
    }
}
export default Pong;
