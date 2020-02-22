;
/**
 * Benchmark a function only once with its parameters and sets this context to `null`.
 * @param fn - Function to benchmark
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export function benchmark(fn, params) {
    return benchmarkTimesWithThis(fn, 1, null, params);
}
/**
 * Benchmark a function only once with its parameters and sets this context according to passed parameter.
 * @param fn - Function to benchmark
 * @param thisContext - this context for the function
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export function benchmarkWithThis(fn, thisContext, params) {
    return benchmarkTimesWithThis(fn, 1, thisContext, params);
}
/**
 * Benchmark a function multiple times with its parameters and sets this context to `null`.
 * @param fn - Function to benchmark
 * @param times - Times to execute function
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export function benchmarkTimes(fn, times, params) {
    return benchmarkTimesWithThis(fn, times, undefined, params);
}
/**
 * Benchmark a function multiple times with its parameters and sets this context according to passed parameter.
 * @param fn - Function to benchmark
 * @param times - Times to execute function
 * @param thisContext - this context for the function
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export function benchmarkTimesWithThis(fn, times, thisContext, params) {
    let fnReturns;
    let total = 0;
    let max = 0;
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i <= times; i++) {
        const start = tsInMicroseconds();
        const ret = fn.apply(thisContext, params);
        const duration = tsInMicroseconds() - start;
        total += duration;
        if (duration < min)
            min = duration;
        if (duration > max)
            max = duration;
        if (i === times)
            fnReturns = ret;
    }
    const result = {
        functionName: fn.name,
        fnReturns,
        runCount: times,
        min,
        max,
        average: total / times,
    };
    return result;
}
/**
 * Returns timestamp in microseconds regardless of environment. Do not use as a replacement for `Date.now()`!
 * @returns timestamp in microseconds
 */
export function tsInMicroseconds() {
    var _a, _b, _c, _d, _e;
    let now;
    if ((_b = (_a = global) === null || _a === void 0 ? void 0 : _a.process) === null || _b === void 0 ? void 0 : _b.hrtime) {
        const hrt = process.hrtime();
        now = (1E9 * hrt[0] + hrt[1]) / 1E3;
    }
    else if ((_d = (_c = window) === null || _c === void 0 ? void 0 : _c.performance) === null || _d === void 0 ? void 0 : _d.now) {
        now = 1E3 * performance.now();
    }
    else {
        // tslint:disable-next-line: no-console
        (_e = console) === null || _e === void 0 ? void 0 : _e.error('Benchmark time precision is in millisecons due to the unrecognized environment!');
        now = Date.now() * 1E3;
    }
    return now;
}
/**
 * Converts microseconds to milliseconds
 * @param num - Number in microseconds
 * @param precision - Precision digits for return value
 * @returns Milliseconds
 */
function microToMilli(num, precision) {
    return Math.round(num / 1E3 * Math.pow(10, precision)) / Math.pow(10, precision);
}
/**
 * Converts microsecond time values to milliseconds in a given `BenchmarkResult` object. Does not mutates the input.
 * @param benchmarkResult - Benchmark result object
 * @param precision - Precision digits. Default value is 2
 * @returns {BenchmarkResult}
 */
export function convertTimeToMilliseconds(benchmarkResult, precision = 2) {
    return Object.assign({}, benchmarkResult, {
        min: microToMilli(benchmarkResult.min, precision),
        max: microToMilli(benchmarkResult.max, precision),
        average: microToMilli(benchmarkResult.average, precision)
    });
}
