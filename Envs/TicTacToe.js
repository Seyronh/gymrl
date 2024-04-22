class TicTacToe {
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
    static OneHot(state){
        let X = state.map(x=>x==1 ? 1: 0);
        let O = state.map(x=>x==2 ? 1: 0);
        let E = state.map(x=>x==0 ? 1: 0);
        return [X,O,E];
    }
    constructor(player){
        this.observation_shape = [3,3,3];
        this.action_size = 9;
        this.state = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.turn = 0;
        this.player = player ? 2 : 1;
        this.reset();
    }
    static sampleAction(){
        return Math.floor(Math.random()*9);
    }
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
    get_obs(){
        return TicTacToe.OneHot(this.state);
    }
    get_info(){
        return [TicTacToe.Status(this.state)];
    }
    reset(){
        this.turn = 0;
        this.state = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        return [this.get_obs(),this.get_info()]
    }
    render(){
        let texto = "+-+-+-+\n";
        for(let y = 0;y<this.state.length;y++){
            let linea = "|";
            for(let x = 0;x<this.state[y].length;x++){
                if(this.state[y][x] == 0){
                    linea += " ";
                } else if(this.state[y][x] == 1) {
                    linea += "X";
                } else {
                    linea += "O";
                }
                linea += "|";
            }
            texto += linea+ "\n+-+-+-+\n";
        }
        console.log(texto)
    }
}
module.exports = TicTacToe;