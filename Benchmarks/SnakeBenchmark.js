import {Snake} from '../dist';
class SnakeBenchmark {
    static run(Times){
        const Benchmark = new SnakeBenchmark();
        let dataArray = [];
        for(let i = 0;i<Times;i++){
           let data = {
                renderTime:Benchmark.render(),
                resetTime:Benchmark.reset(),
                get_obsTime:Benchmark.get_obs(),
                stepTime:Benchmark.step()
           }
           dataArray.push(data);
        }
        let keys = Object.keys(dataArray[0]);
        console.log(`${this.name} results times: ${Times}`)
        let object = {};
        for(let i = 0;i<keys.length;i++){
            const key = keys[i];
            let maped = dataArray.map(e => e[key]);
            let min = Math.min(...maped);
            let avg = maped.reduce((a,b) => a+b)/maped.length;
            let max = Math.max(...maped);
            object[key] = {min:min,avg:avg,max:max}
        }
        console.table(object)
    }
    constructor(){
        this.game = new Snake();
    }

    render(){
        const start = Bun.nanoseconds();
        this.game.render();
        const end = Bun.nanoseconds();
        return end-start;
    }
    reset(){
        const start = Bun.nanoseconds();
        this.game.reset();
        const end = Bun.nanoseconds();
        return end-start;
    }
    get_obs(){
        const start = Bun.nanoseconds();
        this.game.get_obs();
        const end = Bun.nanoseconds();
        return end-start;
    }
    step(){
        const start = Bun.nanoseconds();
        this.game.step(Snake.sampleAction());
        const end = Bun.nanoseconds();
        return end-start;
    }
}
export {SnakeBenchmark}