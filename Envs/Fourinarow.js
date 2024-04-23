const {Game} = require('four-in-a-row')
class Fourinarow {
    constructor(){
        this.observation_shape = [6,7];
        this.action_size = 7;
        this.match = new Game();
        this.reset();
    }
    static sampleAction(){
        return Math.floor(Math.random()*7);
    }
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
    get_obs(){
        return this.match.currentBoard.map(e => Object.values(e));
    }
    get_info(){
        return [this.match.status,this.match.currentTurn];
    }
    reset(){
        this.match.reset();
        return [this.get_obs(),this.get_info()]
    }
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
module.exports = Fourinarow;