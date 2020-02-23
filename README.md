# JavaScript Function Benchmark Utility
![GitHub](https://img.shields.io/github/license/cengizcan/function-benchmark-util?style=flat-square) ![npm type definitions](https://img.shields.io/npm/types/function-benchmark-util?style=flat-square)

A library to benchmark JavaScript functions with microsecond precision.
> [Docs](https://cengizcan.github.io/function-benchmark-util/) | [Github](https://github.com/cengizcan/function-benchmark-util) | [NPM](https://www.npmjs.com/package/function-benchmark-util)

**Install**
```bash
npm i function-benchmark-util -D
```

## Usage
```javascript
import { benchmark, benchmarkTimes } from 'function-benchmark-util';

function someFunction(param1, param2) {
    // Does something
};

const result1 = benchmark(someFunction, ['param1', 'param2']);

// Running multiple iterations
const result2 = benchmarkTimes(someFunction, 10, ['param1', 'param2']);
// See the results
console.table([result1, result2]);
```
###  `BenchmarkResult` object
All benchmark functions, including `benchmark`, `benchmarkTimes`, `benchmarkWithThis`,`benchmarkTimesWithThis` return a `BenchmarkResult` object.

| Field | Description |
|------:|:------------|
| functionName |`string` Name of the executed function |
| runCount | `number` Execution count passed to `benchmarkTimes` and `benchmarkTimesWithThis` functions. |
| min | `number` Minimum duration scored in  microseconds |
| max | `number` Maximum duration scored in  microseconds |
| average | `number` The average duration of all executions in  microseconds |
| fnReturns | `any` Latest returned function result during execution(s) |

### `this` context
Intentionally `benchmark` and `benchmarkTimes` functions set `this` context of the executed function to `null` to avoid ambiguity.

If you need to set `this`, use `benchmarkWithThis` and for multiple executions, use `benchmarkTimesWithThis`.

For more, see the [documentaion](https://cengizcan.github.io/function-benchmark-util/) and [examples](https://github.com/cengizcan/function-benchmark-util/blob/master/examples/index.js).

# License

MIT © Cengiz Can

![David](https://img.shields.io/david/cengizcan/function-benchmark-util?style=flat-square) ![David](https://img.shields.io/david/dev/cengizcan/function-benchmark-util?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/function-benchmark-util?style=flat-square)