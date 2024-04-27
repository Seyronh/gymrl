function rotateMatrixClockwise(matrix){
    let copy = [...matrix];
    copy[0] = matrix[6];
    copy[1] = matrix[3];
    copy[2] = matrix[0];

    copy[3] = matrix[7];
    copy[5] = matrix[1];

    copy[6] = matrix[8];
    copy[7] = matrix[5];
    copy[8] = matrix[2];
    return copy;
}
function rotateMatrixCounterClockwise(matrix){
    let copy = [...matrix];
    copy[0] = matrix[2];
    copy[1] = matrix[5];
    copy[2] = matrix[8];

    copy[3] = matrix[1];
    copy[5] = matrix[7];

    copy[6] = matrix[0];
    copy[7] = matrix[3];
    copy[8] = matrix[6];
    return copy;
}

class Rubik {
    /**
     * Initializes the Rubik Cube with the specified random moves applied.
     */
    constructor(moves){
        this.moves = moves;
        this.observation_shape = [6,9];
        this.action_size = 12;
        this.reset();
    }
    /**
     * Generates a random action between 0 and 11 for the Rubik Cube game.
     *
     * @return {number} The randomly selected action.
     */
    static sampleAction(){
        return Math.floor(Math.random()*12);
    }

    execute(action){
        let copy = this.state.map(arr => arr.slice());
        if(action == 0){ //U
            //UP
            copy[0] = rotateMatrixClockwise(copy[0]);
            //Other faces
            for(let face = 1;face<5;face++){
                for(let pos = 0;pos<3;pos++){
                    copy[face][pos] = this.state[face+1==5 ? 1 : face+1][pos]
                }
            }
        }
        else if(action == 1){ //U'
            //UP
            copy[0] = rotateMatrixCounterClockwise(copy[0]);
            //Other faces
            for(let face = 1;face<5;face++){
                for(let pos = 0;pos<3;pos++){
                    copy[face][pos] = this.state[face==1 ? 4 : face-1][pos]
                }
            }
        }
        else if(action == 2){ //D
            //DOWN
            copy[5] = rotateMatrixCounterClockwise(copy[5]);
            //Other faces
            for(let face = 1;face<5;face++){
                for(let pos = 6;pos<9;pos++){
                    copy[face][pos] = this.state[face==1 ? 4 : face-1][pos]
                }
            }
        }
        else if(action == 3){ //D'
            //DOWN
            copy[5] = rotateMatrixClockwise(copy[5]);
            //Other faces
            for(let face = 1;face<5;face++){
                for(let pos = 6;pos<9;pos++){
                    copy[face][pos] = this.state[face+1==5 ? 1 : face+1][pos]
                }
            }
        }
        else if(action == 4){ //R
            //RIGHT
            copy[3] = rotateMatrixClockwise(copy[3]);
            //Other faces
            copy[0][2] = this.state[2][2];
            copy[0][5] = this.state[2][5];
            copy[0][8] = this.state[2][8];

            copy[2][2] = this.state[5][2];
            copy[2][5] = this.state[5][5];
            copy[2][8] = this.state[5][8];

            copy[4][0] = this.state[0][2];
            copy[4][3] = this.state[0][5];
            copy[4][6] = this.state[0][8];

            copy[5][2] = this.state[4][0];
            copy[5][5] = this.state[4][3];
            copy[5][8] = this.state[4][6];
        }
        else if(action == 5){ //R'
            //RIGHT
            copy[3] = rotateMatrixCounterClockwise(copy[3]);
            //Other faces
            copy[0][2] = this.state[4][0];
            copy[0][5] = this.state[4][3];
            copy[0][8] = this.state[4][6];

            copy[2][2] = this.state[0][2];
            copy[2][5] = this.state[0][5];
            copy[2][8] = this.state[0][8];

            copy[4][0] = this.state[5][2];
            copy[4][3] = this.state[5][5];
            copy[4][6] = this.state[5][8];

            copy[5][2] = this.state[2][0];
            copy[5][5] = this.state[2][3];
            copy[5][8] = this.state[2][6];
        }
        else if(action == 6){ //L
            //LEFT
            copy[1] = rotateMatrixClockwise(copy[1]);
            //Other faces
            copy[0][0] = this.state[4][2];
            copy[0][3] = this.state[4][5];
            copy[0][6] = this.state[4][8];

            copy[2][0] = this.state[0][0];
            copy[2][3] = this.state[0][3];
            copy[2][6] = this.state[0][6];

            copy[4][2] = this.state[5][0];
            copy[4][5] = this.state[5][3];
            copy[4][8] = this.state[5][6];

            copy[5][0] = this.state[2][0];
            copy[5][3] = this.state[2][3];
            copy[5][6] = this.state[2][6];
        }
        else if(action == 7){ //L'
            //Left
            copy[1] = rotateMatrixCounterClockwise(copy[1]);
            //Other faces
            copy[0][0] = this.state[2][2];
            copy[0][3] = this.state[2][5];
            copy[0][6] = this.state[2][8];

            copy[2][0] = this.state[5][2];
            copy[2][3] = this.state[5][5];
            copy[2][6] = this.state[5][8];

            copy[4][2] = this.state[0][2];
            copy[4][5] = this.state[0][5];
            copy[4][8] = this.state[0][8];

            copy[5][0] = this.state[4][0];
            copy[5][3] = this.state[4][3];
            copy[5][6] = this.state[4][6];
        }
        else if(action == 8){ //F
            //Front
            copy[2] = rotateMatrixClockwise(copy[2]);
            //Other faces
            copy[0][6] = this.state[1][2];
            copy[0][7] = this.state[1][5];
            copy[0][8] = this.state[1][8];

            copy[3][0] = this.state[0][6];
            copy[3][3] = this.state[0][7];
            copy[3][6] = this.state[0][8];

            copy[5][0] = this.state[3][0];
            copy[5][1] = this.state[3][3];
            copy[5][2] = this.state[3][6];

            copy[1][2] = this.state[5][0];
            copy[1][5] = this.state[5][1];
            copy[1][8] = this.state[5][2];
        }
        else if(action == 9){ //F'
            //Front
            copy[2] = rotateMatrixCounterClockwise(copy[2]);
            //Other faces
            copy[0][6] = this.state[3][0];
            copy[0][7] = this.state[3][3];
            copy[0][8] = this.state[3][6];

            copy[3][0] = this.state[5][0];
            copy[3][3] = this.state[5][1];
            copy[3][6] = this.state[5][2];

            copy[5][0] = this.state[1][2];
            copy[5][1] = this.state[1][5];
            copy[5][2] = this.state[1][8];

            copy[1][2] = this.state[0][6];
            copy[1][5] = this.state[0][7];
            copy[1][8] = this.state[0][8];
        }
        else if(action == 10){ //B
            //Back
            copy[4] = rotateMatrixClockwise(copy[4]);
            //Other faces
            copy[0][0] = this.state[3][2];
            copy[0][1] = this.state[3][5];
            copy[0][2] = this.state[3][8];

            copy[3][2] = this.state[5][6];
            copy[3][5] = this.state[5][7];
            copy[3][8] = this.state[5][8];

            copy[5][6] = this.state[1][0];
            copy[5][7] = this.state[1][3];
            copy[5][8] = this.state[1][6];

            copy[1][0] = this.state[0][0];
            copy[1][3] = this.state[0][1];
            copy[1][6] = this.state[0][2];
        }
        else if(action == 11){ //B'
            //Back
            copy[4] = rotateMatrixCounterClockwise(copy[4]);
            //Other faces
            copy[0][0] = this.state[1][0];
            copy[0][1] = this.state[1][3];
            copy[0][2] = this.state[1][6];

            copy[3][2] = this.state[0][0];
            copy[3][5] = this.state[0][1];
            copy[3][8] = this.state[0][2];

            copy[5][6] = this.state[3][2];
            copy[5][7] = this.state[3][5];
            copy[5][8] = this.state[3][8];

            copy[1][0] = this.state[5][6];
            copy[1][3] = this.state[5][7];
            copy[1][6] = this.state[5][8];
        }
        this.state = copy.map(arr => arr.slice());
    }

    /**
     * Executes a step in the Rubik Cube game based on the given action.
     *
     * @param {number} action - The action to be taken in the game.
     * @return {Array} An array containing the observation, reward, done flag, and info.
     */
    step(action){
        this.stepsTaken++;
        this.execute(action);
        let reward = 0;
        let correctfaces = this.state.map((rowArr, index) => {
            return rowArr.every((val) => val == rowArr[index]);
          }).filter(e => e==true).length;
        let done = correctfaces==6;
    
        if (!done && this.stepsTaken == this.moves) {
            done= true;
            reward = -1;
        } else if (done) {
            reward = 1;
        }
        let info = this.get_info();
        return [this.get_obs(),reward,done,info]
    }
    /**
     * Returns the observation of the current state of the game.
     *
     * @return {Array<Array<number>>} An array containing 6 arrays of 9 numbers representing the current state of the game.
     */
    get_obs(){
        return this.state;
    }
    /**
     * Returns an array containing the remaining steps until stop.
     *
     * @return {Array<string|number>} An array with a single element.
     */
    get_info(){
        return [this.moves-this.stepsTaken];
    }
    /**
     * Resets the game state to its initial configuration.
     *
     * @return {Array} An array containing the observation and information after the reset.
     */
    reset(){
        this.stepsTaken = 0;
        this.state = [
            [0,0,0,
             0,0,0,//UP
             0,0,0
            ],
            [
             1,1,1,
             1,1,1,//LEFT
             1,1,1
            ],
            [
             2,2,2,
             2,2,2,//FRONT
             2,2,2
            ],
            [
             3,3,3,
             3,3,3,//RIGHT
             3,3,3
            ],
            [
             4,4,4,
             4,4,4,//BACK
             4,4,4
            ],
            [
             5,5,5,
             5,5,5,//DOWN
             5,5,5
            ]
        ];
        for(let i = 0;i<this.moves;i++){
            this.step(Rubik.sampleAction());
            this.stepsTaken--;
        }
        return [this.get_obs(),this.get_info()]
    }
/**
 * Renders the current state of the Rubik cube to the console.
 *
 * @return {void} This function does not return a value.
 */
    render(){
        let repState = this.state.map(Y => {
            return Y.map(x => {
                if(x == 0){
                    return "⬜"
                } else
                if(x == 1){
                    return "🟧"
                } else
                if(x == 2){
                    return "🟩"
                } else
                if(x == 3){
                    return "🟥"
                } else
                if(x == 4){
                    return "🟦"
                } else return "🟨";
            })
        });
        console.log(`              +------------+\n`,
                    `             | ${repState[0][0]}  ${repState[0][1]}  ${repState[0][2]} |\n`,
                    `             | ${repState[0][3]}  ${repState[0][4]}  ${repState[0][5]} |\n`,
                    `             | ${repState[0][6]}  ${repState[0][7]}  ${repState[0][8]} |\n`,
                    `+------------+------------+------------+------------+\n`,
                    `| ${repState[1][0]}  ${repState[1][1]}  ${repState[1][2]} | ${repState[2][0]}  ${repState[2][1]}  ${repState[2][2]} | ${repState[3][0]}  ${repState[3][1]}  ${repState[3][2]} | ${repState[4][0]}  ${repState[4][1]}  ${repState[4][2]} |\n`,
                    `| ${repState[1][3]}  ${repState[1][4]}  ${repState[1][5]} | ${repState[2][3]}  ${repState[2][4]}  ${repState[2][5]} | ${repState[3][3]}  ${repState[3][4]}  ${repState[3][5]} | ${repState[4][3]}  ${repState[4][4]}  ${repState[4][5]} |\n`,
                    `| ${repState[1][6]}  ${repState[1][7]}  ${repState[1][8]} | ${repState[2][6]}  ${repState[2][7]}  ${repState[2][8]} | ${repState[3][6]}  ${repState[3][7]}  ${repState[3][8]} | ${repState[4][6]}  ${repState[4][7]}  ${repState[4][8]} |\n`,
                    `+------------+------------+------------+------------+\n`,
                    `             | ${repState[5][0]}  ${repState[5][1]}  ${repState[5][2]} |\n`,
                    `             | ${repState[5][3]}  ${repState[5][4]}  ${repState[5][5]} |\n`,
                    `             | ${repState[5][6]}  ${repState[5][7]}  ${repState[5][8]} |\n`,
                    `             +------------+`
            )
    }
}
export default Rubik;