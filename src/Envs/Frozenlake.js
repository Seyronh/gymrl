class Frozenlake {
    /**
     * Converts a 2D array of characters into a 1D array of integers.
     *
     * @param {string[][]} state - The 2D array of characters to be converted.
     * @return {number[]} The converted 1D array of integers.
     */
    static TextToInt(state){
        let middle = state.map(e => e.split(""));
        let final = middle.flat(Infinity).map(e => e=='S' ? 0 : e=='F' ? 1 : e=='H' ? 2 : 3)
        return final;
    }
    /**
     * Initializes a new instance of the Frozenlake enviroment.
     *
     * @param {Object} desc - custom map
     * @param {string} map_name - name of the map 4x4 or 8x8 (when not using a custom map)
     * @param {boolean} is_slippery - whether the ground is slippery or not
     * @return {void}
     */
    constructor(desc,map_name,is_slippery){
        this.observation_shape = [1];
        this.action_size = 4;
        this.is_slippery = is_slippery;
        this.desc = desc;
        this.map_name = map_name;
        this.height;
        this.width;
        this.state = [];
        this.playerx;
        this.playery;
        this.goalx;
        this.goaly;
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
     * Executes a step in the Frozenlake environment based on the given action.
     *
     * @param {number} action - The action to be taken in the environment.
     * @return {Array} An array containing the observation, reward, done flag, and info.
     */
    step(action){
        if(this.is_slippery){
            let actions = [];
            if(action==0 && this.playerx > 0){
                actions = [0,1,3];
            }
            if(action==1 && this.playery<this.height){
                actions = [0,1,2];
            }
            if(action==2 && this.playerx<this.width ){
                actions = [1,2,3];
            }
            if(action==3 && this.playery>0){
                actions = [0,2,3];
            }
            let realaction = actions[Math.floor(actions.length*Math.random())];
            this.move(realaction);
        } else {
            this.move(action)
        }
        let obs = this.get_obs()
        let reward = this.state[obs]==3 ? 1 : 0
        let done = this.state[obs]==3 || this.state[obs]==2
        let info = this.get_info()
        return [obs,reward,done,info]
    }
    /**
     * Moves the player in the environment based on the given action.
     *
     * @param {number} action - The action to be taken for the player movement.
     */
    move(action){
        if(action==0 && this.playerx > 0) this.playerx -= 1;
        if(action==1 && this.playery<this.height) this.playery += 1;
        if(action==2 && this.playerx<this.width ) this.playerx += 1;
        if(action==3 && this.playery>0) this.playery -= 1;
    }
    /**
     * Returns the observation of the current state of the game.
     *
     * @return {Array<number>} An array containing the observation of the current state of the game.
     */
    get_obs(){
        return [this.playery*(this.height+1) + this.playerx];
    }
    /**
     * Calculates the distance between the player and the goal.
     *
     * @return {Array<number>} An array containing the distance between the player and the goal.
     */
    get_info(){
        return [Math.hypot(this.playerx-this.goalx,this.playery-this.goaly)];
    }
    /**
     * Resets the state of the game.
     *
     * @return {Array<Array<number>>} An array containing the observation and information of the current state.
     */
    reset(){
        if(this.desc && this.desc.length > 0){
            this.state = Frozenlake.TextToInt(this.desc.flat(Infinity));
            for(let y = 0;y<this.desc.length;y++){
                for(let x = 0;x<this.desc[y].length;x++){
                    if(this.desc[y][x] == 'S'){
                        this.playerx = x;
                        this.playery = y;
                    }
                    if(this.desc[y][x] == 'G'){
                        this.goalx = x;
                        this.goaly = y;
                    }
                }
            }
            this.height = this.desc.length-1;
            this.width = this.desc[0].length-1;
        } else {
            if(this.map_name == '4x4'){
                this.state = Frozenlake.TextToInt([
                    "SFFF",
                    "FHFH",
                    "FFFH",
                    "HFFG"
                    ]);
                this.playerx = 0;
                this.playery = 0;
                this.goalx = 3;
                this.goaly = 3;
                this.height = 3;
                this.width = 3;
            } else {
                this.state = Frozenlake.TextToInt([
                    "SFFFFFFF",
                    "FFFFFFFF",
                    "FFFHFFFF",
                    "FFFFFHFF",
                    "FFFHFFFF",
                    "FHHFFFHF",
                    "FHFFHFHF",
                    "FFFHFFFG",
                ])
                this.playerx = 0;
                this.playery = 0;
                this.goalx = 7;
                this.goaly = 7;
                this.height = 7;
                this.width = 7;
            }
        }
        return [this.get_obs(),this.get_info()]
    }
    /**
     * Renders the current state of the environment to the console.
     *
     * @return {void} This function does not return a value.
     */
    render(){
        let line = "";
        for(let i = 0;i<this.state.length;i++){
            if(i%(this.height+1)==0){
                console.log(line);
                line = "";
            }
            if(this.get_obs() == i){
                line += "P"
            } else {
                let representation = ['S','F','H','G']
                line += representation[this.state[i]]
            }
        }
        console.log(line)
        console.log("-------------")
    }
}
export default Frozenlake;