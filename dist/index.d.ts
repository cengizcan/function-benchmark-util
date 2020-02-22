interface BenchmarkResult {
    /**
  * Executed functions name
  */
    functionName: string;
    /**
  * Execution count
  */
    runCount: number;
    /**
  * Minimum duration scored in  microseconds
  */
    min: number;
    /**
  * Maximum duration scored in  microseconds
  */
    max: number;
    /**
  * The average duration of all executions in  microseconds
  */
    average: number;
    /**
        * Return value of the latest execution
  */
    fnReturns?: any;
}
/**
 * Benchmark a function only once with its parameters and sets this context to `null`.
 * @param fn - Function to benchmark
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export declare function benchmark(fn: any, params?: any[]): BenchmarkResult;
/**
 * Benchmark a function only once with its parameters and sets this context according to passed parameter.
 * @param fn - Function to benchmark
 * @param thisContext - this context for the function
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export declare function benchmarkWithThis(fn: any, thisContext: object, params?: any[]): BenchmarkResult;
/**
 * Benchmark a function multiple times with its parameters and sets this context to `null`.
 * @param fn - Function to benchmark
 * @param times - Times to execute function
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export declare function benchmarkTimes(fn: any, times: number, params: any[]): BenchmarkResult;
/**
 * Benchmark a function multiple times with its parameters and sets this context according to passed parameter.
 * @param fn - Function to benchmark
 * @param times - Times to execute function
 * @param thisContext - this context for the function
 * @param params - Parameters of function as an `array`
 * @returns {BenchmarkResult}
 */
export declare function benchmarkTimesWithThis(fn: any, times: number, thisContext: object, params?: any[]): BenchmarkResult;
/**
 * Returns timestamp in microseconds regardless of environment. Do not use as a replacement for `Date.now()`!
 * @returns timestamp in microseconds
 */
export declare function tsInMicroseconds(): number;
/**
 * Converts microsecond time values to milliseconds in a given `BenchmarkResult` object. Does not mutates the input.
 * @param benchmarkResult - Benchmark result object
 * @param precision - Precision digits. Default value is 2
 * @returns {BenchmarkResult}
 */
export declare function convertTimeToMilliseconds(benchmarkResult: BenchmarkResult, precision?: number): BenchmarkResult;
export {};
