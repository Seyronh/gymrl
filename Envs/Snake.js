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
        let resultado = 0;
        let nuevapos = [this.posicion[0],this.posicion[1]];
        if(accion == 0){ //arriba
            nuevapos[1]--;
        } else
        if(accion == 1){ //abajo
            nuevapos[1]++;
        } else
        if(accion == 2){ //derecha
            nuevapos[0]++;
        }else { //izquierda
            nuevapos[0]--;
        }
        if(this.fuera(nuevapos) || this.state[nuevapos[1]][nuevapos[0]] > 0) resultado = -1;
        if(resultado != -1 &&this.state[nuevapos[1]][nuevapos[0]] == -1){
            this.state[nuevapos[1]][nuevapos[0]] = 0;
            this.longitud++;
            this.generarManzana(nuevapos);
            resultado = 1;
        }
        if(resultado != -1){
            this.state = this.state.map((f) => {
                return f.map((e) => {
                    if(e == -1) return -1;
                    if(e == 0) return 0;
                    if(resultado == 1){
                        return e
                    }
                    return e-1;
                })
            })
            this.state[this.posicion[1]][this.posicion[0]] = this.longitud;
            this.posicion = nuevapos;
        }
        return [this.get_obs(),resultado,resultado == -1,this.get_info()];
    }
    fuera(posicion){
        if(posicion[0] < 0 || posicion[1] < 0 || posicion[0] > this.size-1 || posicion[1] > this.size-1) return true;
        return false
    }
    
    get_obs(){
        let peligros = this.libres();
        let peligroarriba = peligros[2] == 0 ? 1 : 1-(peligros[2]/this.doublesize);
        let peligroabajo = peligros[3] == 0 ? 1 : 1-(peligros[3]/this.doublesize);
        let peligroderecha = peligros[1] == 0 ? 1 : 1-(peligros[1]/this.doublesize);
        let peligroizquierda =  peligros[0] == 0 ? 1 : 1-(peligros[0]/this.doublesize);

        let comidaarriba = this.posicionManzana[1] < this.posicion[1] ? 1 : 0;
        let comidaabajo = this.posicionManzana[1] > this.posicion[1] ? 1 : 0;
        let comidaderecha = this.posicionManzana[0] > this.posicion[0] ? 1 : 0;
        let comidaizquierda = this.posicionManzana[0] < this.posicion[0] ? 1 : 0;
        return [peligroabajo,peligroarriba,peligroderecha,peligroizquierda,comidaarriba,comidaabajo,comidaderecha,comidaizquierda];

    }
    get_info(){
        return [];
    }
    generarManzana(nuevapos){
        let x = Math.floor(Math.random()*this.size);
        let y = Math.floor(Math.random()*this.size);
        if(nuevapos == undefined) nuevapos = this.posicion
        while(this.state[y][x] !== 0 || (x == nuevapos[0] && y == nuevapos[1]) || (x == this.posicion[0] && y == this.posicion[1])){
            x = Math.floor(Math.random()*this.size);
            y = Math.floor(Math.random()*this.size);
        }
        this.state[y][x] = -1
        this.posicionManzana = [x,y];
    }
    libres(){
        let libres = [0,0,0,0];
        this.visitados = [this.posicion];
        libres[0] = this.libresCasilla([this.posicion[0]-1,this.posicion[1]]);//izquierda
        this.visitados = [this.posicion];
        libres[1] = this.libresCasilla([this.posicion[0]+1,this.posicion[1]]);//derecha
        this.visitados = [this.posicion];
        libres[2] = this.libresCasilla([this.posicion[0],this.posicion[1]-1]);//arriba
        this.visitados = [this.posicion];
        libres[3] = this.libresCasilla([this.posicion[0],this.posicion[1]+1]);//abajo
        return libres;
    }
    libresCasilla(posicion){
        let libres = 0;
        if(this.fuera(posicion)) return libres;
        if(this.state[posicion[1]][posicion[0]] <= 0 && !this.visitados.some(p => p[0] == posicion[0] && p[1] == posicion[1])){
            libres += 1;
            this.visitados.push(posicion);
            libres += this.libresCasilla([posicion[0]-1,posicion[1]]);//izquierda
            libres += this.libresCasilla([posicion[0]+1,posicion[1]]);//derecha
            libres += this.libresCasilla([posicion[0],posicion[1]-1]);//arriba
            libres += this.libresCasilla([posicion[0],posicion[1]+1]);//abajo
        }
        return libres;
    }
    reset(){
        this.longitud = 1;
        this.state = []
        for(let i = 0;i<this.size;i++){
            this.state.push(new Array(this.size).fill(0));
        }
        let startX = Math.floor(Math.random()*this.size);
        let startY = Math.floor(Math.random()*this.size);
        this.posicion = [startX,startY];
        this.visitados = [];
        this.posicionManzana = null;
        this.generarManzana();
    }
    render(){
        let resultado = "▛"+"▔".repeat(this.size)+"▜\n";
        for(let y = 0;y<this.state.length;y++){
            let linea = "▍"
            for(let x = 0;x<this.state[y].length;x++){
                if(x == this.posicion[0] && y == this.posicion[1]){
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
            resultado += linea + "\n";
        }
        resultado += "▙"+"▂".repeat(this.size)+"▟\n"; 
        console.log(resultado)
    }
}
module.exports = Snake;