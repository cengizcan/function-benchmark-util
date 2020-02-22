const generateRandomSeq = require('./lib').generateRandomSeq;
const selectionSort = require('./lib').selectionSort;
const mergeSort = require('./lib').mergeSort;
const benchmarkTimes = require('../dist/index.bundle.js').benchmarkTimes;
const convertTimeToMilliseconds = require('../dist/index.bundle.js').convertTimeToMilliseconds;

const arr10_000 = generateRandomSeq(10000);
console.warn('Lets benchmark...');
console.time('Benchmark selection sort and merge sort with 10.000 long array by 100 iteration');
const res1 = benchmarkTimes(selectionSort, 100, [arr10_000]);
const res2 = benchmarkTimes(mergeSort, 100, [arr10_000]);
console.table([convertTimeToMilliseconds(res1), convertTimeToMilliseconds(res2)], ['functionName', 'runCount', 'min', 'max', 'average']);
console.timeEnd('Benchmark selection sort and merge sort with 10.000 long array by 100 iteration');
