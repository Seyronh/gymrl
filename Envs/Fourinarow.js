const {Game} = require('four-in-a-row')
class Fourinarow {
    constructor(){
        this.observation_shape = [7,7,7,7,7,7];
        this.action_size = 7;
        this.partida = new Game();
        this.reset();
    }
    static sampleAction(){
        return Math.floor(Math.random()*7);
    }
    step(action){
        const moveResult = this.partida.playMove(action);
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
        return this.partida.currentBoard.map(e => Object.values(e));
    }
    get_info(){
        return [this.partida.status,this.partida.currentTurn];
    }
    reset(){
        this.partida.reset();
        return [this.get_obs(),this.get_info()]
    }
    render(){
        let resultado = "";
        let estado = this.get_obs();
        for(let y = 0;y<estado.length;y++){
            let linea = "";
            for(let x = 0;x<estado[y].length;x++){
                if(estado[y][x] == 0){
                    linea += "⚪";
                } else if(estado[y][x] == 1){
                    linea += "🟡";
                } else {
                    linea += "🔴";
                }
            }
            resultado += linea+"\n";
        }
        resultado += "-----------------";
        console.log(resultado)
    }
}
module.exports = Fourinarow;