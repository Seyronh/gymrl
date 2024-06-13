import {SnakeBenchmark} from './SnakeBenchmark.js'

let Times;
if(process.argv[2] == undefined || process.argv[2] == null){
    Times = 1000; //Default times
} else {
    Times = parseInt(process.argv[2])
}

SnakeBenchmark.run(Times);