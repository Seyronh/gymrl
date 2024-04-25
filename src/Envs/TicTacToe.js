class TicTacToe {
    /**
     * Determines the status of the Tic-Tac-Toe board.
     *
     * @param {Array<Array<number>>} board - The Tic-Tac-Toe board.
     * @return {number|string} The winner of the game, or 'In progress' if the game is still ongoing, or 'Draw' if the game is a draw.
     */
    static Status(board){
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                if (board[i][0] !== 0) {
                    return board[i][0];
                }
            }
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                if (board[0][i] !== 0) {
                    return board[0][i];
                }
            }
        }

        if ((board[0][0] === board[1][1] && board[1][1] === board[2][2]) || (board[0][2] === board[1][1] && board[1][1] === board[2][0])) {
            if (board[1][1] !== 0) {
                return board[1][1];
            }
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                    return 'In progress';
                }
            }
        }

        return 'Draw';
    }
    /**
     * Converts the state array into a one-hot encoded format.
     *
     * @param {Array<number>} state - The input state array.
     * @return {Array<Array<number>>} An array containing three one-hot encoded arrays for X, O, and empty spaces.
     */
    static OneHot(state){
        let X = state.map(x=>x==1 ? 1: 0);
        let O = state.map(x=>x==2 ? 1: 0);
        let E = state.map(x=>x==0 ? 1: 0);
        return [X,O,E];
    }
    /**
     * Initializes the TicTacToe game with the specified player.
     *
     * @param {boolean} player - Represents the player, where false is player X and true is player O (This just affects the rewards).
     */
    constructor(player){
        this.observation_shape = [3,9];
        this.action_size = 9;
        this.player = player ? 2 : 1;
        this.reset();
    }
    /**
     * Generates a random action between 0 and 8 for the Tic-Tac-Toe game.
     *
     * @return {number} The randomly selected action.
     */
    static sampleAction(){
        return Math.floor(Math.random()*9);
    }
    /**
     * Executes a step in the Tic-Tac-Toe game based on the given action.
     *
     * @param {number} action - The action to be taken in the game.
     * @return {Array} An array containing the observation, reward, done flag, and info.
     */
    step(action){
        let actiony = Math.floor(action/3);
        let actionx = action%3;
        let info;
        if(this.state[actiony][actionx] == 0){
            this.state[actiony][actionx] = this.turn+1;
            info = this.get_info();
            info[1] = 0;
            this.turn = (this.turn+1)%2
        } else {
            info = this.get_info();
            info[1] = 1;
        }
        let obs = this.get_obs();
        let reward;
        if(info[0] == this.player){
            reward = 1;
        } else if(info[0] == 'Draw' || info[0] == "In progress"){
            reward = 0;
        } else {
            reward = -1;
        }
        let done = info[0] == 'Draw' || info[0] == 1 || info[0] == 2;
        return [obs,reward,done,info]
    }
    /**
     * Returns the observation of the current state of the game.
     *
     * @return {Array<Array<number>>} An array containing three one-hot encoded arrays for X, O, and empty spaces.
     */
    get_obs(){
        return TicTacToe.OneHot(this.state);
    }
    /**
     * Returns an array containing the status of the current state of the game.
     *
     * @return {Array<string|number>} An array with a single element, which is the status of the game.
     *                                The status can be 'In progress', 'Draw', or the winner player number (1 or 2).
     */
    get_info(){
        return [TicTacToe.Status(this.state)];
    }
    /**
     * Resets the game state to its initial configuration.
     *
     * @return {Array} An array containing the observation and information after the reset.
     */
    reset(){
        this.turn = 0;
        this.state = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        return [this.get_obs(),this.get_info()]
    }
/**
 * Renders the current state of the Tic-Tac-Toe board to the console.
 *
 * @return {void} This function does not return a value.
 */
    render(){
        let text = "+-+-+-+\n";
        for(let y = 0;y<this.state.length;y++){
            let line = "|";
            for(let x = 0;x<this.state[y].length;x++){
                if(this.state[y][x] == 0){
                    line += " ";
                } else if(this.state[y][x] == 1) {
                    line += "X";
                } else {
                    line += "O";
                }
                line += "|";
            }
            text += line+ "\n+-+-+-+\n";
        }
        console.log(text)
    }
}
export default TicTacToe;