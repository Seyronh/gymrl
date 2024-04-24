class Snake {
    constructor(size = 10){
        this.size = size;
        this.doublesize = this.size * this.size;
        this.observation_shape = [8];
        this.action_size = 4;
        this.reset()
    }
    static sampleAction(){
        return Math.floor(Math.random()*4);
    }
    step(accion){
        let result = 0;
        let newpos = [this.position[0],this.position[1]];
        if(accion == 0){ //arriba
            newpos[1]--;
        } else
        if(accion == 1){ //abajo
            newpos[1]++;
        } else
        if(accion == 2){ //derecha
            newpos[0]++;
        }else { //izquierda
            newpos[0]--;
        }
        if(this.outside(newpos) || this.state[newpos[1]][newpos[0]] > 0) result = -1;
        if(result != -1 &&this.state[newpos[1]][newpos[0]] == -1){
            this.state[newpos[1]][newpos[0]] = 0;
            this.longitud++;
            this.generateApple(newpos);
            result = 1;
        }
        if(result != -1){
            this.state = this.state.map((f) => {
                return f.map((e) => {
                    if(e == -1) return -1;
                    if(e == 0) return 0;
                    if(result == 1){
                        return e
                    }
                    return e-1;
                })
            })
            this.state[this.position[1]][this.position[0]] = this.longitud;
            this.position = newpos;
        }
        return [this.get_obs(),result,result == -1,this.get_info()];
    }
    outside(position){
        if(position[0] < 0 || position[1] < 0 || position[0] > this.size-1 || position[1] > this.size-1) return true;
        return false
    }
    
    get_obs(){
        let peligros = this.free();
        let peligroarriba = peligros[2] == 0 ? 1 : 1-(peligros[2]/this.doublesize);
        let peligroabajo = peligros[3] == 0 ? 1 : 1-(peligros[3]/this.doublesize);
        let peligroderecha = peligros[1] == 0 ? 1 : 1-(peligros[1]/this.doublesize);
        let peligroizquierda =  peligros[0] == 0 ? 1 : 1-(peligros[0]/this.doublesize);

        let comidaarriba = this.positionApple[1] < this.position[1] ? 1 : 0;
        let comidaabajo = this.positionApple[1] > this.position[1] ? 1 : 0;
        let comidaderecha = this.positionApple[0] > this.position[0] ? 1 : 0;
        let comidaizquierda = this.positionApple[0] < this.position[0] ? 1 : 0;
        return [peligroabajo,peligroarriba,peligroderecha,peligroizquierda,comidaarriba,comidaabajo,comidaderecha,comidaizquierda];

    }
    get_info(){
        return [];
    }
    generateApple(newpos){
        let x = Math.floor(Math.random()*this.size);
        let y = Math.floor(Math.random()*this.size);
        if(newpos == undefined) newpos = this.position
        while(this.state[y][x] !== 0 || (x == newpos[0] && y == newpos[1]) || (x == this.position[0] && y == this.position[1])){
            x = Math.floor(Math.random()*this.size);
            y = Math.floor(Math.random()*this.size);
        }
        this.state[y][x] = -1
        this.positionApple = [x,y];
    }
    free(){
        let free = [0,0,0,0];
        this.visitados = [this.position];
        free[0] = this.freeCell([this.position[0]-1,this.position[1]]);//izquierda
        this.visitados = [this.position];
        free[1] = this.freeCell([this.position[0]+1,this.position[1]]);//derecha
        this.visitados = [this.position];
        free[2] = this.freeCell([this.position[0],this.position[1]-1]);//arriba
        this.visitados = [this.position];
        free[3] = this.freeCell([this.position[0],this.position[1]+1]);//abajo
        return free;
    }
    freeCell(position){
        let free = 0;
        if(this.outside(position)) return free;
        if(this.state[position[1]][position[0]] <= 0 && !this.visitados.some(p => p[0] == position[0] && p[1] == position[1])){
            free += 1;
            this.visitados.push(position);
            free += this.freeCell([position[0]-1,position[1]]);//izquierda
            free += this.freeCell([position[0]+1,position[1]]);//derecha
            free += this.freeCell([position[0],position[1]-1]);//arriba
            free += this.freeCell([position[0],position[1]+1]);//abajo
        }
        return free;
    }
    reset(){
        this.longitud = 1;
        this.state = []
        for(let i = 0;i<this.size;i++){
            this.state.push(new Array(this.size).fill(0));
        }
        let startX = Math.floor(Math.random()*this.size);
        let startY = Math.floor(Math.random()*this.size);
        this.position = [startX,startY];
        this.visitados = [];
        this.positionApple = null;
        this.generateApple();
    }
    render(){
        let result = "▛"+"▔".repeat(this.size)+"▜\n";
        for(let y = 0;y<this.state.length;y++){
            let linea = "▍"
            for(let x = 0;x<this.state[y].length;x++){
                if(x == this.position[0] && y == this.position[1]){
                    linea += "\x1b[32mO\x1b[0m";
                } else
                if(this.state[y][x] == 0){
                    linea += " ";
                } else
                if(this.state[y][x] == -1){
                    linea += "\x1b[31m□\x1b[0m";
                } else {
                    linea += "\x1b[32m+\x1b[0m";
                }
            }
            linea += "▐";
            result += linea + "\n";
        }
        result += "▙"+"▂".repeat(this.size)+"▟\n"; 
        console.log(result)
    }
}
export default Snake;