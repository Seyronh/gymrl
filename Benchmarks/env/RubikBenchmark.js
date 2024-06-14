import {Rubik} from '../../dist';
class RubikBenchmark {
    static run(Times){
        const Benchmark = new RubikBenchmark();
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
        return dataArray;
    }
    constructor(){
        this.game = new Rubik();
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
        this.game.step(Rubik.sampleAction());
        const end = Bun.nanoseconds();
        return end-start;
    }
}
export {RubikBenchmark}