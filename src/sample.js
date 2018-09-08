// RxJS v6+
const Rx = require('rxjs');
const Rxops = require('rxjs/operators')
//emit (1,2,3,4,5)
const source = Rx.from([1, 2, 3, 4, 5]);
//add 10 to each value
const example = source.pipe(Rxops.map(val => val + 10 , console.log('called')));
//output: 11,12,13,14,15
const subscribe_one = example.subscribe(val => console.log(val));
const subscribe_two = example.subscribe(val => console.log(val));