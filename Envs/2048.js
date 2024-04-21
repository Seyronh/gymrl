const game = require('2048game')
class TwoThousandfortyeight {
    constructor(){
        this.observation_shape = [16];
        this.action_size = 4;
        this.lastscore = 0;
        this.partida = new game.partida(false)
        this.reset();
    }
    static sampleAction(){
        return Math.floor(Math.random()*this.action_size);
    }
    step(action){
        let actions = ["arriba","abajo","izquierda","derecha"]
        let mov = this.partida.mover(actions[action]);
        let obs = this.get_obs()
        let reward = this.partida.puntuacion-this.lastscore;
        let max = Math.max(...obs)
        if(obs.indexOf(max) == 0 || obs.indexOf(max) == 3 || obs.indexOf(max) == 12 || obs.indexOf(max) == 15){
            reward += 100;
        }
        let done = mov == `Has perdido porfavor reinicia la partida.` || mov == `Has ganado porfavor reinicia la partida.`
        let info = this.get_info()
        this.lastscore = this.partida.puntuacion;
        return [obs,reward,done,info]
    }
    get_obs(){
        return this.partida.estado(true);
    }
    get_info(){
        return [];
    }
    reset(){
        this.partida.reiniciar();
        return [this.get_obs(),this.get_info()]
    }
    render(){
        console.log(this.partida.estado(false))
    }
}
module.exports = TwoThousandfortyeight;