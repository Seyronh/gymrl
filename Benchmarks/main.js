import {SnakeBenchmark} from './env/SnakeBenchmark.js'
import { FourinarowBenchmark } from './env/FourinarowBenchmark.js';
import { TwoThousandfortyeightBenchmark } from './env/2048Benchmark.js';
import { FrozenlakeBenchmark } from './env/FrozenlakeBenchmark.js';
import { PongBenchmark } from './env/PongBenchmark.js';
import { TicTacToeBenchmark } from './env/TicTacToeBenchmark.js';
import { RubikBenchmark } from './env/RubikBenchmark.js';




function renderData(name,data){
    let keys = Object.keys(data[0]);
    console.log(`${name} results times: ${Times}`)
    let object = {};
    for(let i = 0;i<keys.length;i++){
        const key = keys[i];
        let maped = data.map(e => e[key]);
        let min = Math.min(...maped);
        let avg = maped.reduce((a,b) => a+b)/maped.length;
        let max = Math.max(...maped);
        object[key] = {min:min,avg:avg,max:max}
    }
     console.table(object)
}




let Times = 1000;
const benchmarks = {
    "snake":SnakeBenchmark,
    "fourinarow":FourinarowBenchmark,
    "2048":TwoThousandfortyeightBenchmark,
    "frozenlake":FrozenlakeBenchmark,
    "pong":PongBenchmark,
    "tictactoe":TicTacToeBenchmark,
    "rubik":RubikBenchmark
}

const args = process.argv.slice(2);
let envindex = args.findIndex(e => e.startsWith("env:"))
let timesindex = args.findIndex(e => e.startsWith("times:"))
let benchmark;

if(envindex !== -1){
    let enviroment = args[envindex].split(":")[1]
    if(!enviroment) throw new Error("Enviroment not found.")

    benchmark = benchmarks[enviroment]
    if(!benchmark) throw new Error("Enviroment not found.")
}
if(timesindex !== -1){
    let timesarg = args[timesindex].split(":")[1]
    if(!timesarg) throw new Error("Times not found");

    if(isNaN(timesarg)) throw new Error("Times must be an integer");
    Times = parseInt(timesarg);
}

if(!benchmark){
    let datas = {};
    Object.values(benchmarks).forEach(b => {
        const data = b.run(Times);
        datas[b.name] = data;
    })
    let benchmarksNames = Object.keys(datas);
    for(let ibench = 0;ibench<benchmarksNames.length;ibench++){
        let envbench = benchmarksNames[ibench];
        renderData(envbench,datas[envbench])
    }
} else {
    const data = benchmark.run(Times);
    renderData(benchmark.name,data)
}