class Frozenlake {
    static TextToInt(state){
        let medio = state.map(e => e.split(""));
        let final = medio.flat(Infinity).map(e => e=='S' ? 0 : e=='F' ? 1 : e=='H' ? 2 : 3)
        return final;
    }
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
    sampleAction(){
        return Math.floor(Math.random()*this.action_size);
    }
    step(action){
        if(this.is_slippery){
            let acciones = [];
            if(action==0 && this.playerx > 0){
                acciones = [0,1,3];
            }
            if(action==1 && this.playery<this.height){
                acciones = [0,1,2];
            }
            if(action==2 && this.playerx<this.width ){
                acciones = [1,2,3];
            }
            if(action==3 && this.playery>0){
                acciones = [0,2,3];
            }
            let accion = acciones[Math.floor(acciones.length*Math.random())];
            this.move(accion);
        } else {
            this.move(action)
        }
        let obs = this.get_obs()
        let reward = this.state[obs]==3 ? 1 : 0
        let done = this.state[obs]==3 || this.state[obs]==2
        let info = this.get_info()
        return [obs,reward,done,info]
    }
    move(action){
        if(action==0 && this.playerx > 0) this.playerx -= 1;
        if(action==1 && this.playery<this.height) this.playery += 1;
        if(action==2 && this.playerx<this.width ) this.playerx += 1;
        if(action==3 && this.playery>0) this.playery -= 1;
    }
    get_obs(){
        return [this.playery*(this.height+1) + this.playerx];
    }
    get_info(){
        return [Math.hypot(this.playerx-this.goalx,this.playery-this.goaly)];
    }
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
    render(){
        let linea = "";
        for(let i = 0;i<this.state.length;i++){
            if(i%(this.height+1)==0){
                console.log(linea);
                linea = "";
            }
            if(this.get_obs() == i){
                linea += "P"
            } else {
                let representation = ['S','F','H','G']
                linea += representation[this.state[i]]
            }
        }
        console.log(linea)
        console.log("-------------")
    }
}
module.exports = Frozenlake;